"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
// Definición de la función uploadController usando una función normal
const uploadController = function (req, res) {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        return res.status(200).json({
            message: 'Upload',
            url: `http://localhost:3000/uploads/${file.filename}`,
            name: file.filename,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Failed to upload',
            error: err.message,
        });
    }
};
exports.uploadController = uploadController;
