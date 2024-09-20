import { check, body, } from 'express-validator';
import { ValidationMiddleware } from "../../../../middleware/validator.middleware.js";

export const newLogoutValidator = [
    
    ValidationMiddleware
]