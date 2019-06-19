const mongoose = require('mongoose');

// detalhes da conexão
const port = 27017;
const uri = 'mongodb://localhost/usuarios';
const json = { useMongoClient: true };
mongoose.connect(uri, json);

// configurações
mongoose.Promise = global.Promise;

module.exports = mongoose;