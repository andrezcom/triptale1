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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScoreService = exports.deletePlaceService = exports.nearestPlacesService = exports.getAPlaceByIdService = exports.getAllPlacesService = exports.memoryPlaceService = exports.museumPlaceService = exports.editPlaceService = exports.createPlaceService = void 0;
const placesModel_1 = __importDefault(require("../dataBase/models/placesModel"));
const memoryPlaces = __importStar(require("../dataBase/data/memoryPlace.json"));
const museumPlaces = __importStar(require("../dataBase/data/museos.json"));
function createPlaceService(place) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nuevoPlace = new placesModel_1.default(place);
            const placeSave = yield nuevoPlace.save();
            console.log('Lugar creado exitosamente:', placeSave);
        }
        catch (error) {
            console.error('Error al crear el lugar:', error);
        }
    });
}
exports.createPlaceService = createPlaceService;
function editPlaceService(place) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editPlace = new placesModel_1.default(place);
            yield placesModel_1.default.findByIdAndUpdate(place._id, editPlace);
            console.log('Lugar editado exitosamente:', editPlace);
            return editPlace;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.editPlaceService = editPlaceService;
function museumPlaceService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('entro al museumPlaceService ');
            const museumPlacesData = Object.values(museumPlaces);
            museumPlacesData.forEach((place) => {
                if (place.name) {
                    console.log(place);
                    const latitud = parseFloat(place.latitude.replace(',', '.'));
                    const longitud = parseFloat(place.longitude.replace(',', '.'));
                    const memoryplace = {
                        name: place.name,
                        type: 'Museum',
                        description: place.observations !== undefined ? place.observations : 'por definir',
                        cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_Andaluc%C3%ADa.svg/2000px-Flag_of_Andaluc%C3%ADa.svg.png',
                        provincia: place.province,
                        location: {
                            type: 'Point',
                            coordinates: [latitud, longitud],
                        },
                        score: place.score || 0,
                    };
                    console.log();
                    createPlaceService(memoryplace);
                }
            });
        }
        catch (error) {
            console.error('Error al crear el lugar:', error);
        }
    });
}
exports.museumPlaceService = museumPlaceService;
function memoryPlaceService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const memoryPlacesData = Object.values(memoryPlaces);
            memoryPlacesData.forEach((place) => {
                if (place.title) {
                    const memoryplace = {
                        name: place.title,
                        type: 'Memory Place',
                        description: 'por definir',
                        cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_Andaluc%C3%ADa.svg/2000px-Flag_of_Andaluc%C3%ADa.svg.png',
                        provincia: place.province[0].province,
                        location: {
                            type: 'Point',
                            coordinates: [+place.latitude, +place.longitude],
                        },
                        score: place.score || 0,
                    };
                    createPlaceService(memoryplace);
                }
            });
        }
        catch (error) {
            console.error('Error al crear el lugar:', error);
        }
    });
}
exports.memoryPlaceService = memoryPlaceService;
function getAllPlacesService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placeList = yield placesModel_1.default.find();
            return placeList;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.getAllPlacesService = getAllPlacesService;
function getAPlaceByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const place = yield placesModel_1.default.findById(id);
            return place;
        }
        catch (error) {
            throw new Error('Error ');
        }
    });
}
exports.getAPlaceByIdService = getAPlaceByIdService;
function nearestPlacesService(place) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { coordinates } = place.location;
            const minDistance = 1000; // Distancia mínima en metros
            const maxDistance = 5000000;
            console.log('estoy en el servicio');
            const lugaresCercanos = yield placesModel_1.default.find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: coordinates,
                        },
                        $minDistance: minDistance,
                        $maxDistance: maxDistance,
                    },
                },
            });
            console.log('Lugares ordenados por cercanía:', lugaresCercanos);
            return lugaresCercanos;
        }
        catch (error) {
            throw new Error('Error al buscar los lugares ordenados por distancia');
        }
    });
}
exports.nearestPlacesService = nearestPlacesService;
function deletePlaceService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const place = yield placesModel_1.default.findByIdAndDelete(id);
            return place;
        }
        catch (error) {
            throw new Error('Error al eliminar el lugar');
        }
    });
}
exports.deletePlaceService = deletePlaceService;
function updateScoreService(id, score) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const place = yield placesModel_1.default.findOneAndUpdate({ _id: id }, // Filtro para encontrar el documento por id
            { $set: { score: score } }, // Actualización: establece el nuevo valor del campo score
            { new: true });
            if (!place) {
                throw new Error('Lugar no encontrado');
            }
            return place;
        }
        catch (error) {
            throw new Error('Error al actualizar el lugar: ' + error.message);
        }
    });
}
exports.updateScoreService = updateScoreService;
