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
        filename(_req, file, cb) {
            const extension = (0, path_1.extname)(file.originalname);
            const name = file.originalname.split(extension)[0];
            cb(null, `${name}--${Date.now()}${extension}`);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
exports.default = multerUpload;
