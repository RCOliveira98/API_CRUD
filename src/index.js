const express = require('express');
const body_parser = require('body-parser');
const consign = require('consign');

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

consign().include('./controllers').into(app);


app.listen(3000, console.log('Servidor ON'));