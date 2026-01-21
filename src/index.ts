//Importamos express y algunos tipos específicos
import express, { Application, Request, Response, NextFunction } from 'express';

//Importamos cors
import cors from 'cors';

//Importamos las rutas
import booksRouter from './routes/books-routes';

//Importamos el middleware de manejo de errores
import { errorMiddleware } from './middlewares/error-middleware';

//Creamos una instancia de app
const app: Application = express();

//Middleware de terceros
app.use(cors());

//Middleware integrado express.json
app.use(express.json());

//Middleware global
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware global: se recibió una solicitud');
    next();
});

//Configuración de rutas principales de la app
app.use('/api/books', booksRouter);

//Middleware para manejar rutas que no existen
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint no encontrado,' });
});

//Middleware para manejo de errores
app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//nmp start