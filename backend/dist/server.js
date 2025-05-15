"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: {
        fileSize: 50 * 1024 * 1024, //Conta para dizer que o tamanho máximo é 50mb
    },
}));
app.use(routes_1.router);
//Middleware para expor as imagens do backend, para que possam ser acessadas pelo frontend
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp'))); //Dessa forma, o frontend vai precisar apenas fazer um get na /files/NOME_DA_IMAGEM
//Middleware responsável em fazer a tratativa de erros
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});
app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta 3333');
});
