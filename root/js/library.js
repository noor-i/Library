let myLibrary = [];

function Book(title, author, year, read) {
    //constructor
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = false;
}

const addBtn = document.querySelector('#add-btn');
const form = document.querySelector('.form-box');
const submitBtn = document.querySelector('#submit-btn');
const closeBtn = document.querySelector('.form-box .material-symbols-outlined');

document.addEventListener("DOMContentLoaded", function() {
    form.style.display = 'none'; // Ensure form is hidden when the page loads
    // Load books from local storage
    const storedLibrary = localStorage.getItem("myLibrary");
    myLibrary = storedLibrary ? JSON.parse(storedLibrary) : []; 
    displayBooks();
});

function showFormBox (){
    if(form){
        form.style.display = 'flex';
    }
    else{
        console.log("form box not found.")
    }
}
addBtn.addEventListener("click", showFormBox);

function closeForm(event) {
    event.preventDefault(); // Prevent form submission when closing
    form.style.display = 'none'; // Hide the form
    form.reset();
}
closeBtn.addEventListener("click", closeForm);

function saveToLocalStorage(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary)); // Save myLibrary array to local storage
}

function addBookToLibrary(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    if(title && author && year){
        const book = new Book(title, author, year);
        myLibrary.push(book); //updated the library book array
        saveToLocalStorage(); // hence save new updated array to local storage
        displayBooks();
        form.style.display = 'none'; // Hide the form
        form.reset();
    }
    else{
        alert("Please enter all fields.");
    }
}
submitBtn.addEventListener("click", addBookToLibrary);

function removeBook(index) {
    myLibrary.splice(index, 1); // splice removes elements from array
    saveToLocalStorage(); // save updated array to local storage
    displayBooks(); // re-render books display
}

function readStatus(index){
    if(myLibrary[index].read == false){
        myLibrary[index].read = true;
    }
    else{
        myLibrary[index].read = false;
    }
    saveToLocalStorage();
    displayBooks();
}

function displayBooks() {
    const library = document.querySelector('#library-box');
    library.innerHTML = ''; // Clear previous display

    for(let i=0; i<myLibrary.length; i++){
        // Book div with three elements
        const book = document.createElement('div');
        book.classList.add('book');

        const bookTitle = document.createElement('h2');
        bookTitle.textContent = `${myLibrary[i].title}`;

        const bookAuthor = document.createElement('h3');
        bookAuthor.textContent = `By: ${myLibrary[i].author}`;

        const bookYear = document.createElement('h3');
        bookYear.textContent = `Year: ${myLibrary[i].year}`;

        //Div to contain the remove and read book buttons
        const bookBtns = document.createElement('div');
        bookBtns.classList.add('book-buttons');

        const removeBtn = document.createElement('i');
        removeBtn.classList.add('fas', 'fa-trash', 'remove-button'); // FontAwesome icon classes + custom class
        removeBtn.addEventListener("click", () => { removeBook(i) });

        const readBtn = document.createElement('button');
        readBtn.classList.add('read-button');
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = myLibrary[i].read ?'#b5dfa7' : 'lightgrey';
        readBtn.addEventListener("click", () => {readStatus(i)});
        
        bookBtns.append(removeBtn, readBtn);
        book.append(bookTitle, bookAuthor, bookYear, bookBtns);
        library.appendChild(book);
    }
}