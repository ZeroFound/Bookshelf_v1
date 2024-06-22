// Helper function to generate unique ID
function generateId() {
    return +new Date();
}

// Function to save books to localStorage
function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to load books from localStorage
function loadBooks() {
    const data = localStorage.getItem('books');
    return data ? JSON.parse(data) : [];
}

// Function to filter books based on search term
function filterBooks(books, searchTerm) {
    return books.filter((book) => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Function to update the bookshelf
function updateBookshelf(searchTerm = '') {
    const notCompleteList = document.getElementById("not-complete-list");
    const completeList = document.getElementById("complete-list");

    notCompleteList.innerHTML = '';
    completeList.innerHTML = '';

    // Filter books based on the search term
    const filteredBooks = filterBooks(books, searchTerm);

    filteredBooks.forEach((book) => {
        const bookItem = document.createElement("li");
        bookItem.textContent = `${book.title} - ${book.author} (${book.year})`;

        const moveButton = document.createElement("button");
        moveButton.textContent = book.isComplete ? "Move to Not Complete" : "Move to Complete";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        // Move book between racks
        moveButton.addEventListener("click", () => {
            book.isComplete = !book.isComplete;
            saveBooks(books);
            updateBookshelf(searchTerm);
        });

        // Delete book from rack
        deleteButton.addEventListener("click", () => {
            books = books.filter((b) => b.id !== book.id);
            saveBooks(books);
            updateBookshelf(searchTerm);
        });

        bookItem.appendChild(moveButton);
        bookItem.appendChild(deleteButton);

        if (book.isComplete) {
            completeList.appendChild(bookItem);
        } else {
            notCompleteList.appendChild(bookItem);
        }
    });
}

// Event listener for form submission
document.getElementById("book-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const year = parseInt(document.getElementById("book-year").value);
    const isComplete = document.getElementById("book-complete").checked;

    const newBook = {
        id: generateId(),
        title,
        author,
        year,
        isComplete,
    };

    books.push(newBook);
    saveBooks(books);
    updateBookshelf(); // Update the bookshelf

    event.target.reset(); // Reset form after adding a book
});

// Event listener for book search
document.getElementById("book-search").addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    updateBookshelf(searchTerm); // Update the bookshelf based on the search term
});

// Load books from localStorage and initialize the bookshelf
let books = loadBooks();
updateBookshelf(); // Initialize bookshelf when the app starts
