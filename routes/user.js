
const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, emailExist, userExistById } = require('../helpers/db-validators');
const { validateFields } = require('../middleware/validate-fields');

const { getUsers, sendUser, editUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'The name is required!').not().isEmpty(),
    check('password', 'The password must contain more than 6 characters.').isLength({ min: 6 }),
    check('email', 'The email is not valid!').isEmail(),
    check('email').custom( emailExist ),
    /* check('role', 'Not a valid role').isIn('ADMIN_ROLE', 'USER_ROLE'), */
    check('role').custom( esRolValido ),
    validateFields
],sendUser);

router.put('/:id', [
    check('id', 'No es un ID válido de mongo').isMongoId(),
    check('id').custom( userExistById ),
    check('role').custom( esRolValido ),
    validateFields
], editUser);

router.delete('/', deleteUser);

module.exports = router;

