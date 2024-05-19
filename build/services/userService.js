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
exports.deleteUserService = exports.findUserById = exports.editUserService = exports.getAllUserService = exports.createUserService = void 0;
const userModel_1 = __importDefault(require("../dataBase/models/userModel"));
const crypto = __importStar(require("crypto"));
function createUserService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        // Hash de la contraseña
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');
        user.password = hashedPassword;
        // Crear el nuevo usuario
        const newUser = new userModel_1.default(user);
        try {
            // Guardar el nuevo usuario en la base de datos
            yield newUser.save();
            console.log('Usuario creado exitosamente');
            return newUser;
        }
        catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    });
}
exports.createUserService = createUserService;
function getAllUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const UserList = yield userModel_1.default.find();
            return UserList;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.getAllUserService = getAllUserService;
function editUserService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editUser = new userModel_1.default(user);
            yield userModel_1.default.findByIdAndUpdate(user._id, user);
            return editUser;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.editUserService = editUserService;
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(id);
            if (user) {
                return user;
            }
            return null;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.findUserById = findUserById;
function deleteUserService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndDelete(id);
            return user;
        }
        catch (error) {
            throw new Error('Error fetching places');
        }
    });
}
exports.deleteUserService = deleteUserService;
