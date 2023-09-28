const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) =>{
        console.log("tempDir:", tempDir);
        console.log("file:", file);
        console.log("originalname:", file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multerConfig
})

module.exports = upload;