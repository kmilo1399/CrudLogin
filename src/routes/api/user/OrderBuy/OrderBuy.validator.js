import { check, body, } from 'express-validator';
import { ValidationMiddleware } from "../../../../middleware/validator.middleware.js";

export const newOrderValidator = [
    // Validar que order_status sea 'OK' o 'CANCEL'
    check('order_status')
        .isIn(['OK', 'CANCEL'])
        .withMessage('El campo order_status debe ser "OK" o "CANCEL"'),

    // Validar que orderSmartphone sea un array
    check('orderSmartphone')
        .isArray()
        .withMessage('El campo orderSmartphone debe ser un array'),

    // Validar cada objeto dentro de orderSmartphone
    body('orderSmartphone.*.quantity')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero mayor que 0'),

    // Validar que smartphone_id sea un número entero válido
    body('orderSmartphone.*.smartphone_id')
        .isNumeric()
        .withMessage('El smartphone_id debe contener solo números')
        .toInt() // Convierte el valor a entero si es necesario
        .custom((value) => {
            if (value <= 0) {
                throw new Error('El smartphone_id debe ser un número entero positivo');
            }
            return true;
        }),

    // Middleware para manejar los errores
    ValidationMiddleware
]