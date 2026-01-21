//Importamos los tipos para definir las funciones de los controladores
import { Request, Response } from "express";

//Importamos el modelo de datos que contiene la lógica
import { BooksModel } from "../models/books";


//Controlador para obtener todos los libros
export const getAllBooks = (req: Request, res: Response): void => {
    //Llamamos al método
    const books = BooksModel.getAllBooks();
    //Enviamos los libros como rta en formato JSON
    res.status(200).json(books);
};


//Controlador para obtener libros por autor
export const getBooksByAuthor = (req: Request, res: Response): void => {
    //Extraigo el parámetro author del endpoint
    const { author } = req.params;

    if (!author || Array.isArray(author)) {
        return
    };

    //Llamo al modelo
    const books = BooksModel.getBooksByAuthor(author);

    //Si no lo encuentra va a devolver error
    if (books.length === 0) {
        res.status(404).json({ error: 'No hay libros del autor.' });
    };

    //Si encuentra, envía la rta
    res.status(200).json(books)

};


//Controlador para obtener un libro por su ID
export const getBookById = (req: Request, res: Response): void => {
    //Extraemos el id de la ruta
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return
    };

    //Llamamos al método del modelo               
    const book = BooksModel.getBookById(id); 

    if (!book) {
        res.status(404).json({ error: 'Libro no encontrado.' });
    } else {
        res.status(200).json(book);
    }
};


//Controlador para crear un nuevo libro
export const createBook = (req: Request, res: Response): void => {
    //Llamo al modelo
    const newBook = BooksModel.addBook(req.body);
    //Devuelvo el libro recién creado
    res.status(201).json(newBook);
};


//Controlador para actualizar un libro
export const updateBook = (req: Request, res: Response): void => {
    const { id } = req.params; //extraemos el paramentro id del endpoint

    if (!id || Array.isArray(id)) {
        return
    };

    //Llamamos al método del modelo
    const updateBook = BooksModel.updateBook(id, req.body); 

    //Si no lo encuentra, devuelve error
    if (!updateBook) {
        res.status(404).json({ error: 'Libro no encontrado. '});
        return
    };

    //Devolvemos el libro actualizado
    res.status(200).json(updateBook);

};


//Controlador para eliminar un libro
export const deleteBook = (req: Request, res: Response): void => {
    const { id } = req.params; //extraemos el paramentro id del endpoint

    if (!id || Array.isArray(id)) {
        return
    };
    
    //Llamamos al método del modelo
    const isDeleted = BooksModel.deleteBook(id);

    //Verificación
    if (!isDeleted) {
        res.status(404).json({ error: 'Libro no encontrado.' });
        return
    }; 

    //Si es eliminado
    res.status(204).send();

};
