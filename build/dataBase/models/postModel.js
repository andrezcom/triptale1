"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Definir el esquema de posts
const postSchema = new mongoose_1.Schema({
    idUser: { type: String, required: true },
    place: { type: mongoose_1.Types.ObjectId, ref: 'Place' }, // Utiliza PlaceModel como tipo
    review: { type: String, required: true },
    cover: { type: String, required: true },
    rate: { type: Number, required: true },
    private: { type: Boolean, required: true }, // Asegúrate de que el tipo sea Number
});
// No es necesario indexar 'location' aquí, ya que 'location' es parte del subdocumento 'place'
// Crear el modelo de posts
const PostModel = mongoose_1.default.model('Post', postSchema);
exports.default = PostModel;
