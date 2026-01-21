//Importamos el módulo Router 
import { Router } from "express";

//Importamos las funciones del controlador que son las que gestionan las operaciones
import {
    getAllBooks,
//  getBooksByAuthor,
    createBook,
    updateBook,
    deleteBook,
    getBookById
} from '../controllers/booksController';

//Importamos el middleware que controla los datos de los libros
import { validateBook } from "../middlewares/validate-middleware";

//Creamos una instancia de Router
const router: Router = Router();

//RUTAS

//GET para obtener todos los libros
router.get('/', getAllBooks);

// GET para obtener un libro por ID
router.get('/id/:id', getBookById);

//GET para obtener un libro por autor
//router.get('/', getBooksByAuthor);

//POST para crear un libro nuevo
router.post('/', validateBook, createBook);

//PATCH para actualizar un libro existente
router.patch('/id/:id', validateBook, updateBook);

//DELETE para eliminar un libro
router.delete('/id/:id', deleteBook);


//Exportamos el enrutador
export default router;