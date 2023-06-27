const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep the books
let books = [];

app.use(cors());
app.use(express.static(__dirname));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    // We will be coding here
    const book = req.body;

    //Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send("<html> <div class='navbar'> <a href='new-book.html'>New Book</a> <a href='book-list.html'>Book List</a> </div> <p>Book is added to the database</p> </html>");
});



app.get('/books', (req, res) => {
    res.json(books);
    //res.send("<html> <div class='navbar'> <a href='new-book.html'>New Book</a> </div> </html>");
    // res.sendFile(__dirname + "/new-book.html");
    // res.sendFile(__dirname + "/book-list.html");
});



app.post('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // remove item from the books array
    for(let i = 0; i < books.length; i++) {
        let book = books[i];

        if(book.isbn === isbn) {
            books[i] = newBook;
        }
    }
    // const x = `
    //     <div class="navbar">
    //         <a href="new-book.html">New Book</a>
    //         <a href="book-list.html">Book List</a>
    //     </div>
    // `

    // sending 404 when not found something is good practice
    //res.send('Book is edited');
    res.send("<html> <div class='navbar'> <a href='/new-book.html'>New Book</a> <a href='/book-list.html'>Book List</a> </div> <p>Book is edited</p> </html>");
});

app.get('/book/:isbn', (req, res) => {

    const isbn = req.params.isbn
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if (book.isbn === isbn) {
            res.json(book);
        }
      }
    //res.json(books);
    //console.log(__dirname);
    // res.sendFile('Lab5/new-book.html' , {root : __dirname});
    // res.sendFile(__dirname + "/Lab5/book-list.html");
    //res.redirect('back');
});

// app.get('/books', (req, res) => {
//     res.json(books);
//     //res.send("<html> <div class='navbar'> <a href='new-book.html'>New Book</a> </div> </html>");
//     res.sendFile(__dirname + "/new-book.html");
//     res.sendFile(__dirname + "/book-list.html");
// });

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    for(let i = 0; i < books.length; i++) {
        let book = books[i];

        if(book.isbn === isbn) {
            books.splice(i, 1);
        }
    }

    res.send('Deleted book');
})



// app.post('/book/delete/:isbn', (req, res)  => {
//     const isbn = req.params.isbn;

//     //deleting book
//     for(let i = 0; i < books.length; i++) {
//         let book = books[i];

//         if(book.isbn === isbn) {
//             books.splice(i, 1);
//         }
//     }

//     res.send('Book is deleted');
// })

// app.get('/book/delete/:isbn', (req, res)  => {
//     res.json(books);
// })

app.listen(port, () => console.log(`Hello world app listening on port`));