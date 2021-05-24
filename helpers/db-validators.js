const Role = require('../models/role');
const User = require('../models/user');

const esRolValido = async(role = '') => {
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error(`El rol ${role} no existe en la base de datos.`);
    }
}

const emailExist = async(email = '') => {
    //Verificar si el email existe.
    const existEmail = await User.findOne({email});

    if (existEmail) {
       throw new Error(`The mail ${ email }, already exists!`);
    }
}

const userExistById = async( id ) => {
    //Verificar si el Id existe.
    const existId = await User.findById(id);
    
    if (!existId) {
       throw new Error(`The Id: ${ id }, does not exist in the database!`);
    }
}

module.exports = {
    esRolValido,
    emailExist,
    userExistById
}