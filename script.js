let myLibrary = [];
const book1 = new Book("The Maker's Diet", "Rubin", 329, false);
const book2 = new Book("The Proximity Principle", "Coleman", 189, true);
const book3 = new Book("Already Compromised", "Ham", 288, true);


addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


console.dir(myLibrary);
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

function addBookToLibrary(book) {
   myLibrary.push(book);
}

function displayBookLibrary() {
   myLibrary.forEach(book => {
      console.dir(book);

   });
}
