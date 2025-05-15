"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(' '); //Utiliza o split para separar, através de espaços, o que vem no authToken. O [, token], serve para dizer que deve ser ignorado o que vem primeiro, e considerar apenas o segundo, e criar uma variável com o nome token
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //Recuperar o id do token e colocar dentro de uma variável user_id dentro da requisição
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
