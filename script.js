// форма войти

function toggleVisibility(showElementId, hideElementId) {
    document.getElementById(showElementId).classList.remove("hidden");
    document.getElementById(hideElementId).classList.add("hidden");
}

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    toggleVisibility("mainContent", "registrationForm");
});

document.getElementById("logoutButton").addEventListener("click", function () {
    toggleVisibility("registrationForm", "mainContent");
});


// библиотека

const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.dataset.index = index;

        bookDiv.innerHTML = `
            <div class="book-info">
                <strong>${book.title}</strong> by ${book.author} - ${book.pages} pages - ${book.isRead ? 'Read' : 'Not Read'}
            </div>
            <div>
                <button class="btn btn-toggle" data-index="${index}">${book.isRead ? 'Mark as Unread' : 'Mark as Read'}</button>
                <button class="btn btn-delete" data-index="${index}">Delete</button>
            </div>
        `;

        bookList.appendChild(bookDiv);
    });
}

function updateBookDisplay(index) {
    const bookDiv = document.querySelector(`[data-index="${index}"]`);
    const book = myLibrary[index];
    bookDiv.querySelector('.btn-toggle').textContent = book.isRead ? 'Mark as Unread' : 'Mark as Read';
    bookDiv.querySelector('.book-info').textContent = `${book.title} by ${book.author} - ${book.pages} pages - ${book.isRead ? 'Read' : 'Not Read'}`;
}

function toggleReadStatus(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
    updateBookDisplay(index);
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

document.getElementById('bookList').addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('btn-toggle')) {
        toggleReadStatus(index);
    }
    if (e.target.classList.contains('btn-delete')) {
        removeBook(index);
    }
});

document.getElementById('bookForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);

    document.getElementById('bookForm').reset();
});

displayBooks();
