import express from "express";
import upload from "../cloud/multer.js";
import cloudinary from "../cloud/cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();




router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("Upload request received, file:", req.file?.filename || "No file");

    if (!req.file || !req.file.buffer) {
      console.log("No file buffer found");
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const mime = req.file.mimetype;
    console.log("File MIME type:", mime);

    let resourceType = "auto";
    let folder = "job_portal_uploads";

    if (mime === "application/pdf") {
      folder = "job_portal_uploads/resumes";
      resourceType = "raw";
      console.log("Detected PDF file, uploading to resumes folder");
    } else {
      folder = "job_portal_uploads/images";
      resourceType = "image";
      console.log("Detected image file, uploading to images folder");
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          console.log("Successfully uploaded to Cloudinary:", result.secure_url);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    console.error("Upload route error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
