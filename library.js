const myLibrary = [];

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
const closeBtn = document.querySelector('#close-button');

document.addEventListener("DOMContentLoaded", function() {
    form.style.display = 'none'; // Ensure form is hidden when the page loads
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
    form.reset();
    form.style.display = 'none'; // Hide the form
}
closeBtn.addEventListener("click", closeForm);

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

function readStatus(index){
    if(myLibrary[index].read == false){
        myLibrary[index].read = true;
    }
    else{
        myLibrary[index].read = false;
    }
    displayBooks();
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
        book.style.padding = '10px';
        book.style.borderRadius = '5px'
        book.style.width = '190px';
        book.style.height = '200px';
        book.style.overflowY = 'hidden';
        book.style.overflowX = 'auto';
        book.style.whiteSpace = 'nowrap';

        const bookTitle = document.createElement('p');
        bookTitle.textContent = `${myLibrary[i].title}`;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `By: ${myLibrary[i].author}`;

        const bookYear = document.createElement('p');
        bookYear.textContent = `Year: ${myLibrary[i].year}`;

        //Div to contain the remove and read book buttons
        const bookBtns = document.createElement('div');
        bookBtns.style.display = 'flex';
        bookBtns.style.paddingTop = '8px';
        bookBtns.style.gap = '100px';

        const removeBtn = document.createElement('button');
        removeBtn.style.width = '30px';
        removeBtn.style.height = '30px';
        removeBtn.textContent = 'X';
        removeBtn.style.fontSize = '15px';
        removeBtn.style.fontWeight = 'bold';
        removeBtn.style.backgroundColor = 'lightpink';
        removeBtn.style.borderRadius = '5px';
        removeBtn.style.color = 'white';

        removeBtn.addEventListener("click", () => {
            removeBook(i)
        });

        const readBtn = document.createElement('button');
        readBtn.style.width = '60px';
        readBtn.style.height = '30px';
        readBtn.textContent = 'Read';
        readBtn.style.fontSize = '15px';
        readBtn.style.fontWeight = 'bold';
        readBtn.style.backgroundColor = myLibrary[i].read ?'#228B22' : 'lightgrey';
        readBtn.style.borderRadius = '5px';
        readBtn.style.color = 'white';

        readBtn.addEventListener("click", () => {
            readStatus(i);
        });
        
        book.appendChild(bookTitle);
        book.appendChild(bookAuthor);
        book.appendChild(bookYear);
        book.appendChild(bookBtns);
        bookBtns.appendChild(removeBtn);
        bookBtns.appendChild(readBtn);

        library.appendChild(book);
    }
}