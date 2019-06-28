const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async(req, res) => {
    try {
        if (await User.findOne(req.body.email)) {
            return res.status(400).send('Erro: email já cadastrado.');
        } else {
            const user = await User.create(req.body);
            user.password = undefined;
            // await: espere essa parte se concretizar para continuar
            return res.send({ user });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Falha ao se registrar' });
    }
});

module.exports = (app) => app.use('/auth', router);