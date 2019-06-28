const express = require('express');
const bcrypto = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
//
const User = require('../models/user');
const md5 = require('../config/authConfig/md5.json');
// métodos (functions)
function generateToken(params = {}) {
    return jwt.sign(params, md5.secret, {
        expiresIn: 86400
    });
}
// rotas
router.post('/register', async function(req, res) {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send('Erro: email já cadastrado.');

        const user = await User.create(req.body);
        user.password = undefined;
        // await: espere essa parte se concretizar para continuar
        return res.send({ user });
    } catch (err) {
        console.log('Equipe do Café, se vira => ' + err);
        return res.status(400).send({ error: 'Falha ao se registrar' });
    }
});

router.post('/autenticar', async function(req, res) {

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user) {
        if (await bcrypto.compare(password, user.password)) {
            // user autenticado
            user.password = undefined; // para n retornar senha
            // token
            return res.status(200).send({
                user,
                token: generateToken({ id: user.id })
            });
        } else {
            return res.status(400).send('Senha inválida!');
        }
    } else {
        res.status(400).send('Usuário não cadastrado');
    }


});

module.exports = (app) => app.use('/auth', router);