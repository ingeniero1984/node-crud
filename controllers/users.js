const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = (req =  request, res = response) => {
    const { q, nombre = 'wendy', apikey, page = 1, limit } = req.query;

    res.json({
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const sendUser = async(req, res) => {

    const { name, email, password, role } = req.body
    const user = new User( {name, email, password, role} );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar en DB
    await user.save();
    
    res.json({
        user
    });
}

const editUser = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validacion contra base de datos.
    if ( password ) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const userDB = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put - api usuario actualizado.',
        userDB
    });
}

const deleteUser = (req, res) => {
    res.json({
        msg: "message delete api - controller"
    });
}

module.exports = {
    getUsers,
    sendUser,
    editUser,
    deleteUser
}