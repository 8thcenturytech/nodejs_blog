const cloudinary = require("cloudinary").v2;

// ✅ Upload image from file (multipart/form-data)
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "8thcentury/uploads",
      resource_type: "image",
    });

    res.status(200).json({
      success: 1,
      file: {
        url: result.secure_url,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Upload image by URL (for Editor.js "byUrl")
exports.uploadByUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const result = await cloudinary.uploader.upload(url, {
      folder: "8thcentury/url_uploads",
      resource_type: "image",
    });

    res.status(200).json({
      success: 1,
      file: {
        url: result.secure_url,
      },
    });
  } catch (err) {
    next(err);
  }
};
