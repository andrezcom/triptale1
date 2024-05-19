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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostController = exports.getPostByIdUserController = exports.getPostByIdController = exports.getAllUserController = exports.editPostController = exports.calculatePlaceScoreController = exports.createPostController = void 0;
const postService = __importStar(require("../services/postService"));
const placeController = __importStar(require("./placesController"));
function createPostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                throw console.error('request body is required');
                // return res.status(400).json({ message: "Request body is required" });
            }
            const post = req.body;
            if (req.body.place) {
                req.body.place = JSON.parse(req.body.place);
            }
            // Verificar si hay un archivo en la solicitud
            if (req.file) {
                // Crear la URL de la imagen
                const imgURL = `http://localhost:3000/uploads/${req.file.filename}`;
                post.cover = imgURL;
            }
            else {
                throw console.error('request body is required');
                // return res.status(400).json({ message: "Image file is required" });
            }
            const newScorePlace = yield calculatePlaceScoreController(post.place._id);
            if (newScorePlace) {
                yield placeController.updateScoreController(post.place._id, newScorePlace);
            }
            const newPost = yield postService.createPostService(post);
            console.log('Post creado exitosamente:', newPost);
            res.status(200).json(post);
        }
        catch (error) {
            console.error('Internal server error:', error);
            res.status(500).json({
                message: 'Internal server error',
                err: error.message,
            });
        }
    });
}
exports.createPostController = createPostController;
function calculatePlaceScoreController(placeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newScorePlace = yield postService.calculatePlaceScoreService(placeId);
            return newScorePlace;
        }
        catch (err) {
            throw console.error('error in calculatePlaceScoreService');
        }
    });
}
exports.calculatePlaceScoreController = calculatePlaceScoreController;
function editPostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                throw console.error('request body is required');
            }
            const post = req.body;
            const newPost = yield postService.editPostService(post);
            console.log('Post editado exitosamente:', newPost);
            res.status(200).json(newPost);
        }
        catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                err: error,
            });
        }
    });
}
exports.editPostController = editPostController;
function getAllUserController(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postList = yield postService.getAllPostService();
            res.status(200).json(postList);
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.getAllUserController = getAllUserController;
function getPostByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id) {
                throw console.error('request body is required');
            }
            const post = yield postService.getPostByIdService(req.params.id);
            res.status(200).json(post);
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.getPostByIdController = getPostByIdController;
function getPostByIdUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id) {
                throw console.error('request body is required');
            }
            const postList = yield postService.getPostByUserIdService(req.params.id);
            res.status(200).json(postList);
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.getPostByIdUserController = getPostByIdUserController;
function deletePostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                throw console.error('request body is required');
            }
            const id = req.params.id;
            const deletePost = yield postService.deletePostService(id);
            res.status(200).json(deletePost);
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.deletePostController = deletePostController;
