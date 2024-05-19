"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constConfig_1 = __importDefault(require("./constConfig"));
const uri = constConfig_1.default.BD_URL || 'mongodb://localhost:27017/triptale';
mongoose_1.default
    .connect(uri)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));
exports.db = mongoose_1.default.connection;
