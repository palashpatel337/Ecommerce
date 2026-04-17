import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req,res) =>{
    try {
        const {name} = req.body;
        if(!name){
            res.status(401).send('Name is required')
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            res.status(200).send('Category already exists')
        }

        const category = await new categoryModel({name,slug : slugify(name)}).save()
        res.status(201).send({
            success : true,
            message : 'New category created',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message: 'Error in category'
        })
    }
}

export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug: slugify(name)},{new : true})
        res.status(200).send({
            success : true,
            message : 'Successfully updated' ,
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : 'Error while updating category'
        })
        
    }
}

//Get All Category
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success : true,
            message : 'All categories listed' ,
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : 'Error while getting all categories',
        })
    }
}


//Get Single Category
export const singleCategoryController = async (req,res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success : true,
            message : 'Category listed successfully' ,
            category,
        })
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : 'Error while getting category'
        })
    }
}

//Delete Category
export const deleteCategoryController = async (req,res) =>{
    try {
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success : true,
            message : 'Category deleted successfully' ,
            category,
        })
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : 'Error while deleting category'
        })
    }
}