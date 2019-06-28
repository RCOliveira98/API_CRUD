const mongoose = require('../database');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// criptografia
// pre function do mongoose
UserSchema.pre('save', async function(next) {
    // irei gerar um hash para user através de 10 'rounds'
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});
// nome do model e seu esquema
const User = mongoose.model('User', UserSchema);

module.exports = User;