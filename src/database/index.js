const mongoose = require('mongoose');

// detalhes da conexão
const port = 27017;
const uri = 'mongodb://localhost/api_one';
mongoose.connect(uri, { useNewUrlParser: true });

// configurações
mongoose.Promise = global.Promise;

module.exports = mongoose;