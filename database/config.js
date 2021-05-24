const mongoose = require('mongoose');

const connectionDb = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos en linea!');
    } catch (error) {
        console.log(error);
        throw new error('Errror al conectarse a la base de datos.');
    }   

}

module.exports = {
    connectionDb
} 