let myLibrary;
// let emptyLibrary = false;

// if (!localStorage.myLibrary && !emptyLibrary) {
if (!localStorage.myLibrary) {
   //alert("making a bunch of book entries");
   myLibrary = [];
   const book1 = new Book("The Maker's Diet", "Rubin", 324, false, 1);
   const book2 = new Book("The Proximity Principle", "Coleman", 189, true, 2);
   const book3 = new Book("Already Compromised", "Ham", 288, true, 3);
   const book4 = new Book("Cat in the Hat", "Seuss", 33, true, 4);
   const book5 = new Book("Hand Hand Fingers Thumb", "Seuss", 44, false, 5);
   const book6 = new Book("Green Eggs and Ham", "Seuss", 55, true, 6);

   addBookToLibrary(book1);
   addBookToLibrary(book2);
   addBookToLibrary(book3);
   addBookToLibrary(book4);
   addBookToLibrary(book5);
   addBookToLibrary(book6);
}
else {
   // alert("not making any default entries");
   let myLibraryObjects = localStorage.getItem("myLibrary");
   myLibrary = JSON.parse(myLibraryObjects);
}

// emptyLibrary = false;
displayBookLibrary();


function Book(title, author, numberOfPages, haveRead, libraryIndexNumber) {
   this.title = title;
   this.author = author;
   this.numberOfPages = numberOfPages;
   this.haveRead = haveRead;
   this.libraryIndexNumber = libraryIndexNumber;
   this.info = function () {
      return this.title +
         " by " +
         this.author +
         ", " +
         numberOfPages +
         " pages, " +
         haveRead ? "have read" : "not read yet";
   }
}
const allBooks = document.querySelectorAll(".book");
for (let index = 0; index < allBooks.length; index++) {
   allBooks[index].querySelector("button").addEventListener("click", function () {
      // this.remove();
   })
}

function addNewBookToLibrary() {
   // console.log("anb1");
   const newBook = getBookDetails();
   // console.log("anb2")
   addBookToLibrary(newBook);
   displayBookLibrary();
   alert("added new book");
}

function getBookDetails() {
   const newBook = new Book();
   newBook.title = document.getElementById('title').value;
   newBook.author = document.getElementById('author').value;
   newBook.numberOfPages = document.getElementById('numberOfPages').value;
   newBook.haveRead = false;
   newBook.libraryIndexNumber = newBook.title + newBook.author + newBook.numberOfPages;
   return newBook;
}

function addBookToLibrary(book) {
   myLibrary.push(book);
   localStorage.removeItem("myLibrary");
   localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
function removeBookFromLibrary(bookIndex) {
   myLibrary.splice(bookIndex, 1);
   localStorage.removeItem("myLibrary");

   if (myLibrary.length > 0) {
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
   }
   displayBookLibrary();
}
function toggleRead(bookIndex) {
   myLibrary[bookIndex].haveRead = !myLibrary[bookIndex].haveRead;
   localStorage.removeItem("myLibrary");

   if (myLibrary.length > 0) {
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
   }
   displayBookLibrary();
}

function displayBookLibrary() {
   let libraryData = "";
   if (myLibrary.length > 0) {
      libraryData = "<table stlye='border-collapse: collapse'>";
      libraryData += "<thead>";
      libraryData += "<tr style='border: solid 1px yellow'>";
      libraryData += "<th>Title</th>";
      libraryData += "<th>Author</th>";
      libraryData += "<th>Number of Pages</th>";
      libraryData += "<th>Has Been Read</th>";

      libraryData += "</thead>";
      libraryData += "</tr>";

      if (localStorage.getItem("myLibrary")) {
         let myLibraryObjects = localStorage.getItem("myLibrary");
         myLibrary = JSON.parse(myLibraryObjects);
      }

      let count = 0;
      myLibrary.forEach(book => {
         libraryData += "<tr style='border: solid 1px pink' class='book'>";
         libraryData += "<td>";
         libraryData += book.title;
         libraryData += "</td>";
         libraryData += "<td>";
         libraryData += book.author;
         libraryData += "</td>";
         libraryData += "<td>";
         libraryData += book.numberOfPages;
         libraryData += "</td>";
         libraryData += "<td>";
         libraryData += "<button onclick='toggleRead(" + count + ");'>" + `${book.haveRead ? "Read" : "Not Read"}` + "</button>";
         libraryData += "</td>";
         libraryData += "<td>";
         libraryData += "<button onclick='removeBookFromLibrary(" + count + ");'>Remove Book</button>";
         libraryData += "</td>";

         libraryData += "</tr>";
         count++;
      });
      libraryData += "</table>";
   }
   let divLibrary = document.getElementById("divLibrary");
   divLibrary.innerHTML = libraryData;

}
function CleanLibrary() {
   // console.log("cleantime");
   localStorage.removeItem("myLibrary");
   displayBookLibrary();
}

function DeleteLibrary() {
   // console.log("purgetime");
   localStorage.removeItem("myLibrary");
   emptyLibrary = true;
   displayBookLibrary();
}

var modalBookDetail = document.getElementById("newBookDetailsModal");
var btnAddNewBook = document.getElementById("btnAddNewBook");
var spanCloseAddNewBook = document.getElementsByClassName("close")[0];

btnAddNewBook.onclick = function () {
   modalBookDetail.style.display = "block";
}

window.onclick = function (event) {
   console.log("clicked the window");
   console.log("the event.target is: " + event.target);

   if (event.target == modalBookDetail)
      modalBookDetail.style.display = "none";
}
spanCloseAddNewBook.onclick = function () {
   modalBookDetail.style.display = "none";
}

