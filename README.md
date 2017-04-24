# BookShelf_UBW
Java Academy - Project
--- --- --- --- --- ---

## Synopsis:
This project consists of creating a tinder-inspired website for books.
The website was built upon knowledge acquired throughout UP Academy's classes. From simple HTML/CSS to Bootstrap: from manually imported books to a google API.
At it's final stage, the website should be a representation of the skills acquired during this course.


## Code Example:
The website was codded to feel and look like an actual, real bookshelf.
Here is how it is assembled. The code shown and explained provides a good example of the building blocks of the website 

--- --- --- --- --- ---

We create a bookshelf that functions as a queue. Meaning that the first books to be added are the first ones to go on display.
The main website (Unlimited Book Works [UBW]) has three display cases (columns).

Function BookShelf() {
 this.shelf = new Queue();
  
***

Next we have a .load function inside our Bookshelf. It's this function (that is still being optimized) that will input the API obtained from googleapis/books.

this.load = function() {

var url = "https://www.googleapis.com/books/v1/volumes?q=Pratchett";
    
var currentShelf = this; // This will allow us to use the term "currentShelf" when referring to the object BookShelf

  $.get(url)
    .done(function(data) {
      currentShelf.parseBooks(data);
        
***

.parseBooks(data) is the function that takes the data (the API), runs through it's items and associates them with variables that will construct the books on display.

for(var i = 0; i < data.items.length; i++)

title = data.items[i].volumeInfo.title;
author = data.items[i].volumeInfo.authors[0];
image = data.items[i].volumeInfo.imageLinks.thumbnail;
sinopse = data.items[i].volumeInfo.description;
ISBN = data.items[i].volumeInfo.industryIdentifiers[1].identifier;

var livroTeste = new Book(title, author, image, sinopse, sneakpeak, links, ISBN, bookmark, shelve);

NOTICE:
- Since the website wasn't developed from the start with the API in mind, some of the .render() function properties don't match the API structure.

***

The Book object was created to take in the following parameters:
- Title;
- Author;
- Image (cover);
- Synopsis;
- Sneak Peak;
- Links (goodreads, bookdepository, bibliography, related books);
- ISBN;
- Bookmark (a like counter);
- Shelve (a dislike counter);

Inside the Book object, the .render(id) function takes in one of three ids (each corresponding to a display case on the main page; book1 = left column, book2 = center column, book3 = right column), and generates a book in the asigned display case.

var idTitle = "#"+id+" .Title";
$(idTitle).html(this.title);

var idAuthor = "#"+id+" .Author";
$(idAuthor).html(this.author);

$("#" + id + " .GoodReads").attr("href", this.links[0]);

It also incorporates a function('click') that enables the bookmark/shelve counters to be updated with every mouse click in the respective button.

$("#lcounter" + id).html(this.bookmark);

var data = {"book":this, "id":id};

var idButton = "#" + id + " .LButton";
$(idButton).off('click')
$(idButton).click(data, function(event) {
	event.data.book.likes();
	event.data.book.render(event.data.id);
});


## Motivation
This website was built to showcase what was learned during the first month at the UP Academy course.
By looking at the edited out lines of code one can see how the website evolved as knew knowledge was acquired. From manual user inputs to automated responses.
Ultimately the website will serve as a repository of the essential of webdesing and user interaction.


## API Reference
All the API's used in this project belong to Google and were obtained from the following url:
https://www.googleapis.com/books/v1/volumes?q= (User Input)


## Tests
All the tests are conducted via the searchbar on the main website.
This section is still a Work In Progress.


## Contributors
At the current time the project is public only on github:
https://github.com/Not-Vincent/BookShelf_UBW




