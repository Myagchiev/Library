// войти
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const registrationForm = document.getElementById("registrationForm");
    registrationForm.classList.remove("visible");
    registrationForm.classList.add("hidden");

    const mainContent = document.getElementById("mainContent");
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
});

// Выйти
document.getElementById("logoutButton").addEventListener("click", function () {

    const mainContent = document.getElementById("mainContent");
    mainContent.classList.remove("visible");
    mainContent.classList.add("hidden");

    const registrationForm = document.getElementById("registrationForm");
    registrationForm.classList.remove("hidden");
    registrationForm.classList.add("visible");
});


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
        bookDiv.classList.add('book');

        bookDiv.innerHTML = `
            <div>
                <strong>${book.title}</strong> by ${book.author}<br>
                ${book.pages} pages - ${book.isRead ? 'Read' : 'Not Read'}
            </div>
            <div>
                <button class="btn btn-toggle" onclick="toggleReadStatus(${index})">${book.isRead ? 'Mark as Unread' : 'Mark as Read'}</button> 
                <button class="btn btn-delete" onclick="removeBook(${index})">Delete</button>
            </div>
        `;

        bookList.appendChild(bookDiv);
    });
}

function toggleReadStatus(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);

    bookForm.reset();
});

displayBooks();