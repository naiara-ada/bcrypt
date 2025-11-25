const crypto = require('node:crypto');
const bcrypt = require('bcrypt')

const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);

module.exports = {hashedSecret};

//hashSync sincrona, necesitamos que el programa "pare" para que no continue (tema contraseñas)

//has asincrona