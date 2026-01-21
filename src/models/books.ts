import fs from 'fs'; 
import path from 'path';

//Defino la ruta del archivo JSON que usamos de base de datos
const filePath = path.join(__dirname, '../database/books.json'); //--> ruta hacia la base de datos

//Interfaz que representa la estructura de un libre
interface Book {
    id: string,
    title: string,
    author: string,
    year: number
};



//Encapsulo todas las operaciones con libros en una Clase
export class BooksModel {

    //Obtener y leer TODOS los libros en el archivo (GET)
    static getAllBooks(): Book[] {
        //Obtener todos los datos desde nuestra BD
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data.books; //retorna la parte de books, no de info (array de libros)
    };

    //Obtener y leer todos los libros de un autor determinado (GET)
    static getBooksByAuthor(author: string): Book[] {
        //Obtener todos los datos desde nuestra BD
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data.books.filter((libro: Book) => libro.author === author);
    };

    //Obtener un libro por su ID
    static getBookById(id: string): Book | undefined {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data.books.find((book: Book) => book.id.toString() === id);
    };

    //Crear un libro (POST)
    static addBook(newBook: Book): Book {
        //Parseamos el archivo JSON
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        //Creo un nuevo id basado en la longitud del array
        const newId = (data.books.length + 1).toString();

        //Creo el nuevo
        //Operador spread {...} se usa para combinar objetos
        const book = { ...newBook, id: newId};
        //La agrego a la BD
        data.books.push(book);
        //Incremento el contador de libros (total)
        data.info.total += 1;

        //Guardo los datos en formato JSON
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return book;
    };

    //Actualizar un libro obtenido por id (PUT)
    //Partial<Book>: no va a entrar toda la información de la frase (autor, etc) sino una parte del objeto
    static updateBook(id: string, updatedData: Partial<Book>): Book | null {
        //Leemos el JSON y buscamos por ID
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.books.findIndex((book: Book) => book.id === id);

        //Si no encuentra el id
        if (index === -1) return null;
        //Si encuentra el id, actualiza el libro
        data.books[index] = {...data.books[index], ...updatedData}; 
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return data.books[index]; 
    };

    //Eliminar un libro (DELETE)
    static deleteBook(id: string): boolean {
        //Lee el JSON y busca por id
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.books.findIndex((book: Book) => book.id.toString() === id);

        //Si no encuentra el id, devuelve false
        if (index === -1) return false;

        //Si encuentra el id, elimina el libro y decrementa el contador (total)
        data.books.splice(index, 1);
        data.info.total -= 1;

        //Guardamos los cambios
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;

    };
    
};