const { genSalt, hash, compare } = require('bcryptjs');

function generateActivationKey() {
    return [...Array(4)].map(() => Math.random().toString(36).substring(2, 6).toUpperCase()).join('-');
}

async function hashPassword(senha) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(senha, salt);
    return hashedPassword;
}

async function verifyPassword(senha, hashedPassword) {
    return await compare(senha, hashedPassword);
}

module.exports = { generateActivationKey, hashPassword, verifyPassword };