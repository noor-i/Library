const myLibrary = [];

function Book(title, author, year) {
    //constructor
    this.title = title;
    this.author = author;
    this.year = year;
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const year = document.querySelector('#year');
function addBookToLibrary(title, author, year) {
    const book = new Book(title, author, year);
    myLibrary.push(book);
}

const addBtn = document.querySelector('#add-btn');
const form = document.querySelector('.form-box');
function showFormBox (){
    if(form){
        form.style.display = 'block';
    }
    else{
        console.log("form box not found.")
    }
}
addBtn.addEventListener("click", showFormBox);

const submitBtn = document.querySelector('#submit-btn');
function displayBooks() {

}

/*
const book1 = new Book('The Alchemist', 'Paulo Coelho', 2007);
const book2 = new Book('Harry Potter: The Goblet of Fire', 'JK Rowling', 2012);
myLibrary.push(book1);
myLibrary.push(book2);
*/