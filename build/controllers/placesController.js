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
exports.updateScoreController = exports.deletePlaceController = exports.nearestPlacesServiceController = exports.getAllPlacesController = exports.getPlaceByIdController = exports.loadMuseumPlacesController = exports.memoryPlaceController = exports.editPlaceController = exports.createPlaceController = void 0;
const placeService = __importStar(require("../services/placesService"));
function createPlaceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                throw console.error('request body is required');
            }
            const place = req.body;
            const newPlace = yield placeService.createPlaceService(place);
            res.status(200).json({ data: newPlace });
            console.log('Lugar creado exitosamente:', newPlace);
        }
        catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                err: error,
            });
        }
    });
}
exports.createPlaceController = createPlaceController;
function editPlaceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                throw console.error('request body is required');
            }
            const place = req.body;
            const editPlace = yield placeService.editPlaceService(place);
            res.status(200).json(editPlace);
            console.log('Lugar creado exitosamente:', editPlace);
        }
        catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                err: error,
            });
        }
    });
}
exports.editPlaceController = editPlaceController;
function memoryPlaceController(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placesMemory = yield placeService.memoryPlaceService();
            res.status(200).json({ data: placesMemory });
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.memoryPlaceController = memoryPlaceController;
function loadMuseumPlacesController(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('entro a museumPlaceController');
            const placesMuseum = yield placeService.museumPlaceService();
            res.status(200).json({ data: placesMuseum });
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.loadMuseumPlacesController = loadMuseumPlacesController;
function getPlaceByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id) {
                throw console.error('request body is required');
            }
            const place = yield placeService.getAPlaceByIdService(req.params.id);
            res.status(200).json(place);
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.getPlaceByIdController = getPlaceByIdController;
function getAllPlacesController(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const places = yield placeService.getAllPlacesService();
            res.status(200).json(places);
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal server error',
                err: err,
            });
        }
    });
}
exports.getAllPlacesController = getAllPlacesController;
function nearestPlacesServiceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                throw console.error('request body is required');
            }
            const place = req.body;
            console.log(place);
            const nearestPlaceList = yield placeService.nearestPlacesService(place);
            res.status(200).json(nearestPlaceList);
            console.log('Lugares cercanos:', nearestPlaceList);
        }
        catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                err: error,
            });
        }
    });
}
exports.nearestPlacesServiceController = nearestPlacesServiceController;
function deletePlaceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id) {
                throw 'params.id is required';
            }
            const place = yield placeService.deletePlaceService(req.params.id);
            res.status(200).json(place);
        }
        catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                err: error,
            });
        }
    });
}
exports.deletePlaceController = deletePlaceController;
function updateScoreController(idPlace, newScorePlace) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const place = yield placeService.updateScoreService(idPlace, newScorePlace);
            return 'Score Actualization' + place;
        }
        catch (error) {
            throw console.error('error updating Score');
        }
    });
}
exports.updateScoreController = updateScoreController;
