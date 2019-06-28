const mongoose = require('mongoose');

// detalhes da conexão
const port = 27017;
const uri = 'mongodb://localhost/api_one';
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log("Conexão com MongoDB realizada com SUCESSO.");
    }).catch(err => {
        console.log('Não foi possível realizar a conexão: ' + err);
        process.exit();
    });

// configurações
mongoose.Promise = global.Promise;

module.exports = mongoose;