const express = require('express');

const body_parser = require('body-parser');

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

app.listen(3000, console.log('Servidor ON'));