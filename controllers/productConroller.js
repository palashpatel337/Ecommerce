import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";

dotenv.config();

// Braintree Gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // change to Production later
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping, category, photo } = req.body;
    // const photo = req.file?.filename; // multer gives file here

    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description) return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!quantity) return res.status(400).send({ error: "Quantity is required" });
    if (!category) return res.status(400).send({ error: "Category is required" });

    if (!photo) return res.status(400).send({ error: "Photo is required" });
    if (photo.size > 1000000)
      return res.status(400).send({ error: "Photo size should be < 1MB" });

    const product = await productModel.create({
      name,
      description,
      price,
      quantity,
      shipping,
      category,
      slug: slugify(name),
      photo // or photo.filename depending on your storage
    });

    res.status(201).send({
      success: true,
      message: "New product added",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products listed",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Cannot get products",
    });
  }
};  


export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product listed",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Cannot get product",
    });
  }
};

export const productPhotoConroller = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Cannot get photo",
    });
  }
};

//Delete product
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};


export const updateProductController = async (req, res) => {
  try {
        console.log("Params =>", req.params);
    console.log("Body =>", req.body);
    console.log("Files =>", req.files);

    const { name, description, price, quantity, shipping, slug, category } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !shipping:
        return res.status(500).send({ error: "Shipping is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({
            error: "Photo is required and size should be less than 1mb",
          });
    }
    const products = await productModel.findByIdAndUpdate(req.params.pid,{ ...req.fields, slug: slugify(name) },{new:true});
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export const productFiltersController = async (req,res) =>{
  try {
    const {checked, radio} = req.body;

    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = {$gte: radio[0], $lte: radio[1]} 
    const products = await productModel.find(args)
        console.log(req.body);

    res.status(201).send({
      success: true,
      message: "Product Fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
}


export const productCountController = async(req,res) => {
  try {
    const total = await productModel.estimatedDocumentCount()
    res.status(201).send({
      success: true,
      message: "Product Fetched successfully",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}

//Product list based on page

export const productListController = async(req,res) => {
  try {
    const perPage = 16;
    const page = req.params.page ? req.params.page : 1
    const products = await productModel.find({}).skip((page-1) * perPage).limit(perPage).sort({createdAt: -1});
    res.status(201).send({
      success: true,
      message: "Product Fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    })
  }
}


export const searchProductController = async(req,res) => {
  try {
    const {keyword} = req.params;
    const results = await productModel.find({
      $or: [
        {name : { $regex: keyword, $options: "i"}},
        {description : { $regex: keyword, $options: "i"}},
      ],
    })
    res.json(results)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong"
    })
  }
}


//Related Product controller

export const relatedProductController = async (req, res) =>{
  try {
    const {cid, pid} = req.params;
    const products = await productModel.find({category: cid, _id: {$ne: pid}}).limit(3).populate("category")
    res.status(201).send({
      success: true,
      message: "Related Products Fetched successfully",
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong"
    })
  }
}


export const categoryProductController = async(req, res) => {
  try {
    const category = await categoryModel.findOne({slug: req.params.slug})
    const products = await productModel.find({category}).populate('category')
    res.status(201).send({
      success: true,
      message: "Related Products Fetched successfully",
      category,
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong"
    })
    
  }
}




