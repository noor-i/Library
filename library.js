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

function addBookToLibrary(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    if(title && author && year){
        const book = new Book(title, author, year);
        myLibrary.push(book);
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
    displayBooks(); // re-render books display
}

function displayBooks() {
    //Library box div that stores book divs
    const library = document.querySelector('#library-box');
    library.innerHTML = ''; // Clear previous display

    for(let i=0; i<myLibrary.length; i++){
        // Book div with three elements
        const book = document.createElement('div');
        book.style.display = 'flex';
        book.style.flexDirection = 'column';
        book.style.margin = '5px';
        book.style.border = '3px solid black';
        book.style.padding = '5px';
        book.style.borderRadius = '5px'
        book.style.width = '190px';
        book.style.height = '200px';
        book.style.overflowY = 'hidden';
        book.style.overflowX = 'auto';

        const bookTitle = document.createElement('p');
        bookTitle.textContent = `${myLibrary[i].title}`;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `By:${myLibrary[i].author}`;

        const bookYear = document.createElement('p');
        bookYear.textContent = `Year:${myLibrary[i].year}`;

        const removeBtn = document.createElement('button');
        removeBtn.style.width = '30px';
        removeBtn.style.height = '30px';
        removeBtn.textContent = 'X';
        removeBtn.style.fontSize = '15px';
        removeBtn.style.marginTop = '10px';
        removeBtn.style.fontWeight = 'bold';
        removeBtn.style.backgroundColor = 'lightpink';
        removeBtn.style.borderRadius = '5px';
        removeBtn.style.color = 'white';

        removeBtn.addEventListener("click", () => {
            removeBook(i)
        });
        
        book.appendChild(bookTitle);
        book.appendChild(bookAuthor);
        book.appendChild(bookYear);
        book.appendChild(removeBtn);

        library.appendChild(book);
    }
}

/*
const book1 = new Book('The Alchemist', 'Paulo Coelho', 2007);
const book2 = new Book('Harry Potter: The Goblet of Fire', 'JK Rowling', 2012);
myLibrary.push(book1);
myLibrary.push(book2);
*/