let myLibrary;

if (!localStorage.myLibrary) {
   myLibrary = [];
   const book1 = new Book("The Maker's Diet", "Rubin", 324, false);
   const book2 = new Book("The Proximity Principle", "Coleman", 189, true);
   const book3 = new Book("Already Compromised", "Ham", 288, true);

   addBookToLibrary(book1);
   addBookToLibrary(book2);
   addBookToLibrary(book3);
}
else {
   let myLibraryObjects = localStorage.getItem("myLibrary");
   myLibrary = JSON.parse(myLibraryObjects);
}

displayBookLibrary();


function Book(title, author, numberOfPages, haveRead) {
   this.title = title;
   this.author = author;
   this.numberOfPages = numberOfPages;
   this.haveRead = haveRead;
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

function addNewBookToLibrary() {
   const newBook = getBookDetails();
   addBookToLibrary(newBook);
   displayBookLibrary();
}

function getBookDetails() {
   const newBook = new Book();
   newBook.title = document.getElementById('title').value;
   newBook.author = document.getElementById('author').value;
   newBook.numberOfPages = document.getElementById('numberOfPages').value;
   newBook.haveRead = false;
   return newBook;
}

function addBookToLibrary(book) {
   myLibrary.push(book);
   localStorage.removeItem("myLibrary");
   localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
function removeBookFromLibrary(item) {

   myLibrary.splice(myLibrary.indexOf(item.index), 1);
   localStorage.removeItem("myLibrary");

   if (myLibrary.length > 0) {
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      displayBookLibrary();
   }

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

      myLibrary.forEach(book => {
         libraryData += "<tr style='border: solid 1px pink'>";
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
         libraryData += book.haveRead ? "Yes" : "No";
         libraryData += "</td>";
         libraryData += "<td>";
         libraryData += "<button onclick='removeBookFromLibrary(this);'>Remove Book</button>";
         libraryData += "</td>";
         libraryData += "</tr>";
      });
      libraryData += "</table>";
   }
   let divLibrary = document.getElementById("divLibrary");
   divLibrary.innerHTML = libraryData;

}

