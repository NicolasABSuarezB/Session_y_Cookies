const { check, body } = require('express-validator')
const usuarios = require('../data/user.json')
const bcryptjs = require('bcryptjs')

module.exports = [
    /* Email */
    check('email').trim()
        .notEmpty().withMessage('Debe ingresar tu email').bail()
        .isEmail().withMessage('Debe ingresar un email válido'),

    /* Contraseña */
    check('pass').trim()
        .notEmpty().withMessage('Debe ingresar tu contraseña').bail()
        .isLength({ min: 8 }).withMessage('Debe contener al menos 8 caracteres'),

    body('email')
        .custom((value, { req }) => {
            let usuario = usuarios.find(user => user.email === value && bcryptjs.compareSync(req.body.pass, user.pass))

            if (usuario) {
                return true
            } else {
                return false
            }
        })
        .withMessage('El email o la contraseña no coinciden')
]