"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db"); // Importa la conexión a la base de datos desde db.ts
const placesRoutes_1 = __importDefault(require("./routes/placesRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const constConfig_1 = __importDefault(require("./config/constConfig"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const PORT = constConfig_1.default.PORT || 3000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json());
app.use('/places', placesRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/post', postRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join('uploads')));
app.use((err, req, res, next) => {
    console.error('Error stack:', err instanceof Error ? err.stack : 'No stack available');
    console.error('Error message:', err instanceof Error ? err.message : 'No message available');
    res.status(500).json({
        message: 'Internal server error',
        error: err instanceof Error
            ? {
                message: err.message,
                stack: err.stack,
            }
            : {
                message: 'An unknown error occurred',
            },
    });
});
// Espera a que se establezca la conexión a la base de datos antes de escuchar en el puerto
db_1.db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
// Manejo de errores de la conexión a la base de datos
db_1.db.on('error', (error) => {
    console.error('Error al conectar a MongoDB:', error);
});
