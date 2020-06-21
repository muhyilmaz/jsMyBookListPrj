//Book Class: Represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class : Handle UI Tasks
class UI{
    static displayBooks(){
        const StoredBooks = [
            {
                title: "RiyazüsSalihin",
                author: "İmam Nevevi",
                isbn: "341421412"

            }
        ];
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book){
            const list = document.querySelector('#book-list');
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;
    }
}
// Store Class : Handles Storage

// Event : Display Books

// Event : Add Books

// Event : Delete Books
