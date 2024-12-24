const myLibrary = [];

function Book(title, author, year) {
    //constructor
    this.title = title;
    this.author = author;
    this.year = year;
}

const addBtn = document.querySelector('#add-btn');
const form = document.querySelector('.form-box');
const submitBtn = document.querySelector('#submit-btn');

function showFormBox (){
    if(form){
        form.style.display = 'block';
    }
    else{
        console.log("form box not found.")
    }
}
addBtn.addEventListener("click", showFormBox);

function addBookToLibrary() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const year = document.querySelector('#year');
    if(title && author && year){
        const book = new Book(title, author, year);
        myLibrary.push(book);
        displayBooks();
    }
    else{
        alert("Please enter all fields.");
    }
}
submitBtn.addEventListener("click", addBookToLibrary);

function displayBooks() {
    alert("i love u, keep going.");
}

/*
const book1 = new Book('The Alchemist', 'Paulo Coelho', 2007);
const book2 = new Book('Harry Potter: The Goblet of Fire', 'JK Rowling', 2012);
myLibrary.push(book1);
myLibrary.push(book2);
*/