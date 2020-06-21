//Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class : Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = Store.getBooks();
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;

        list.appendChild(row);
    }

    static showAlert(msg, clsName) {
        const div = document.createElement('div');
        div.className = `alert alert-${clsName}`;
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('#book-form').parentNode;
        const form = document.querySelector('#book-form');
        console.log(container.contains(form));
        container.insertBefore(div, form);

        // Vanish in 3 seconds

        setTimeout(() => document.querySelector('.alert').remove(),3000);

    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class : Handles Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') ===null){
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));


    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index)=> {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event : Add Books
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();
    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if (title === '' || author === '' || isbn === '') {
        const message = 'Fill blancs';
        //alert('fill blank');

        UI.showAlert(message, 'danger');
    }
    else {
        // Instantiate book

        const book = new Book(title, author, isbn);
        console.log(book);

        //Add book to UI
        UI.addBookToList(book);
        
        //Add book to Store
        Store.addBook(book);

        //Show success message
        UI.showAlert('Book Added', 'succes');

        //Clear fields
        UI.clearFields();

    }

})


// Event : Delete Books
document.querySelector('#book-list').addEventListener('click', (e) => {
    console.log(e.target)

    UI.deleteBook(e.target);
    UI.showAlert('Book Removed', 'success');

})