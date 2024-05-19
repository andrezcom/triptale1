"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const config = {
    BD_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    HOST_URL: process.env.HOST_URL,
    IMG_URL: process.env.IMG_URL,
    FILE_URL: path_1.default.join(__dirname, '../../uploads'),
    FILE_SERVER_URL: process.env.FILE_SERVER,
};
exports.default = config;
