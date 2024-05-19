"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const multerUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: 'uploads',
        filename: (_req, file, cb) => {
            // Generar un nombre de archivo único basado en el nombre original y la fecha actual
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = (0, path_1.extname)(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + extension);
        },
    }),
    // Filtro para aceptar solo ciertos tipos de archivos
    fileFilter: (_req, file, cb) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = (0, path_1.extname)(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        }
        else {
            cb(new Error('Tipo de archivo no permitido. Solo se permiten archivos JPG, JPEG y PNG.'));
        }
    },
});
exports.default = multerUpload;
