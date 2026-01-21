# 📚 Books API

API REST desarrollada con **Node.js**, **Express** y **TypeScript** para la gestión de libros.
Permite realizar operaciones CRUD y cuenta con autenticación mediante **JWT**.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* TypeScript
* JSON Web Token (JWT)
* fs (persistencia en archivo JSON)

---

## 📁 Estructura del proyecto

```
books-api/
│
├── src/
│   ├── config/
│   │   └── config.ts
│   ├── controllers/
│   │   └── booksController.ts
│   ├── middlewares/
│   │   ├── auth-middleware.ts
│   │   ├── error-middleware.ts
│   │   └── validate-middleware.ts
│   ├── models/
│   │   └── books.ts
│   ├── routes/
│   │   └── booksRoutes.ts
│   └── app.ts
│
├── database/
│   └── books.json
│
├── package.json
└── README.md
```

---

## ⚙️ Instalación

1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar el proyecto

```bash
npm run dev
```

La API se ejecutará en:

```
http://localhost:3000
```

---

## 📌 Endpoints

### 📖 Obtener todos los libros

```
GET /api/books
```

### 📘 Obtener un libro por ID

```
GET /api/books/id/:id
```

### ➕ Crear un libro (requiere token)

```
POST /api/books
```

Body:

```json
{
  "title": "Orgullo y prejuicio",
  "author": "Jane Austen",
  "year": 1813
}
```

### ✏️ Actualizar un libro (requiere token)

```
PATCH /api/books/id/:id
```

### ❌ Eliminar un libro (requiere token)

```
DELETE /api/books/id/:id
```

---

## 🧠 Validaciones

* Los datos del libro se validan mediante middleware

---

## 📌 Notas

* La información se almacena en un archivo JSON
* El proyecto sigue una arquitectura **MVC**

---

## ✨ Autor

Desarrollado por **Ariadna Salomone** 💫

