import express from "express";
import { router } from "./routes"; // Caminho correto para o arquivo router.ts

const app = express();

app.use(express.json()); // Middleware para processar JSON
app.use(router); // Adicionando as rotas corretamente

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3333");
});
