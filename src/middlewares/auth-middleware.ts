//Importo los tipos específicos de express
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../config/config";


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];

    //El token llega en el formato: Bearer <Token>
    const token = authHeader && authHeader.split(' ')[1];  //Si existe el encabezado, va a extraer el token

    //Verifica si existe el token 
    if (!token) {
        res.status(401).json({ message: 'Token no proporcionado.' });
        return;
    };

};