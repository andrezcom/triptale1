"use strict";
// import * as type from "../types."
// import PostModel from "../dataBase/models/postModel"
// import * as userService from "./userService"
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByUserIdService = exports.deletePostService = exports.getPostByIdService = exports.getAllPostService = exports.editPostService = exports.calculatePlaceScoreService = exports.createPostService = void 0;
const postModel_1 = __importDefault(require("../dataBase/models/postModel"));
const userService = __importStar(require("./userService"));
function createPostService(post) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Crear el nuevo post
            const newPost = new postModel_1.default(post);
            yield newPost.save();
            // Encontrar el usuario asociado al post por su ID
            const user = yield userService.findUserById(newPost.idUser);
            console.log(user);
            if (!user) {
                throw new Error('No se encontró el usuario asociado al post.');
            }
            if (!user.post) {
                user.post = [];
            }
            user.post.push(newPost._id);
            yield user.save();
            console.log('Post creado exitosamente');
            return newPost;
        }
        catch (error) {
            console.error('Error al crear el post:', error);
            throw error;
        }
    });
}
exports.createPostService = createPostService;
function calculatePlaceScoreService(placeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reviews = yield postModel_1.default.find({ place: placeId });
            if (reviews.length === 0) {
                return 0; // Si no hay lugares, el promedio es 0
            }
            const rates = reviews.map((rate) => rate.rate);
            const totalRate = rates.reduce((sum, rate) => sum + rate, 0);
            const averageRate = totalRate / rates.length;
            console.log('este es el nuevo score del lugar: ' + averageRate);
            return averageRate;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.calculatePlaceScoreService = calculatePlaceScoreService;
function editPostService(post) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editPost = new postModel_1.default(post);
            yield postModel_1.default.findByIdAndUpdate(editPost._id, editPost);
            return editPost;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.editPostService = editPostService;
function getAllPostService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postList = yield postModel_1.default.find();
            return postList;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.getAllPostService = getAllPostService;
function getPostByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield postModel_1.default.findById(id);
            return post;
        }
        catch (error) {
            throw new Error('Error de busqueda por id');
        }
    });
}
exports.getPostByIdService = getPostByIdService;
function deletePostService(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedPost = yield postModel_1.default.findByIdAndDelete(postId);
            if (!deletedPost) {
                throw new Error('No se encontró el post.');
            }
            return deletedPost;
        }
        catch (error) {
            console.error('Error al eliminar el post:', error);
            throw error;
        }
    });
}
exports.deletePostService = deletePostService;
function getPostByUserIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postList = yield postModel_1.default.find({ idUser: userId });
            return postList;
        }
        catch (error) {
            throw new Error('Error de busqueda por id');
        }
    });
}
exports.getPostByUserIdService = getPostByUserIdService;
