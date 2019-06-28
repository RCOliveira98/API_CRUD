const jwt = require('jsonwebtoken');
const md5 = require('../config/authConfig/md5.json');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2) {
            const [schema, token] = parts;
            if (/^Bearer$/i.test(schema)) {
                // token compativel
                jwt.verify(token, md5.secret, (err, decoded) => {
                    if (!err) {
                        req.userId = decoded.id;
                        return next();
                    } else {
                        return res.status(401).send({ error: 'Token inválido.' })
                    }
                })
            } else {
                return res.status(401).send({ error: 'Token mal formatado' })
            }
        } else {
            return res.status(401).send({ error: 'Token fora do padrão da API' })
        }
    } else {
        return res.status(401).send({ error: 'Token NÃO foi fornecido.' })
    }
}