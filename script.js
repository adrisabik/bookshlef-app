
const localCompleteBook = "LOCAL_COMPLETE_BOOK";
const localIncompleteBook = "LOCAL_INCOMPLETE_BOOK";

const completedBookshelf = document.getElementById("completeBookshelfList");
const uncompletedBookshelf = document.getElementById("incompleteBookshelfList");
const inputBook = document.getElementById("inputBook");

let book ={
    id: 0,
    title: "",
    author: "",
    year: 0,
    isComplete: false,
}

let books = [];

// output data
outputBook(localCompleteBook, completedBookshelf);
outputBook(localIncompleteBook, uncompletedBookshelf);

window.addEventListener("load", function(){
    if (typeof(Storage) !== "undefined") {
        // inisiliasi semua item web storage yang kita akan gunakan jika belum ada
        if (localStorage.getItem(localCompleteBook) === null){
            localStorage.setItem(localCompleteBook, JSON.stringify(books));
        }
        if (localStorage.getItem(localIncompleteBook) === null){
            localStorage.setItem(localIncompleteBook, JSON.stringify(books));
        }
    }else{
        alert("Browser yang Anda gunakan tidak mendukung Web Storage")
    }
    
});

inputBook.addEventListener("submit", function(){
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    book ={
        id: +new Date(),
        title: title,
        author: author,
        year: year,
        isComplete: isComplete,
    }

    if(book.isComplete===true){
        // ubah string localStorage ke object
        books = JSON.parse(localStorage.getItem(localCompleteBook)) || [];
        // push book
        books.push(book);
        // ubah dari object js ke string
        localStorage.setItem(localCompleteBook,JSON.stringify(books));
    } else{
        let books = [];
        // ubah string localStorage ke object
        books = JSON.parse(localStorage.getItem(localIncompleteBook)) || [];
        // push book
        books.push(book);
        // ubah dari object js ke string
        localStorage.setItem(localIncompleteBook,JSON.stringify(books));
    }
    // output data
    outputBook(localCompleteBook, completedBookshelf);
    outputBook(localIncompleteBook, uncompletedBookshelf);
})

const btnGreenComplete = document.querySelectorAll("#completeBookshelfList .green");
const btnRedComplete = document.querySelectorAll("#completeBookshelfList .red");
const btnGreenIncomplete = document.querySelectorAll("#incompleteBookshelfList .green");
const btnRedIncomplete = document.querySelectorAll("#incompleteBookshelfList .red");

moveBook(btnGreenComplete, localCompleteBook, localIncompleteBook);
moveBook(btnGreenIncomplete, localIncompleteBook, localCompleteBook);
delBook(btnRedComplete, localCompleteBook);
delBook(btnRedIncomplete, localIncompleteBook);

// function pindah buku
function moveBook(btn, local1, local2){
    for(let i=0; i<btn.length; i++){
        btn[i].addEventListener("click", function(){
            // ambil data lalu jadikan object
            let books1 = JSON.parse(localStorage.getItem(local1)) || [];
            let books2 = JSON.parse(localStorage.getItem(local2)) || [];
            // simpan sementara
            let temp = books1[i];
            // ubah nilai isComplete
            if(temp.isComplete === false){
                temp.isComplete = true;
            } else{
                temp.isComplete = false;
            }
            // hapus data 
            books1.splice(i,1);
            // pindah data
            books2.push(temp);

            localStorage.setItem(local1,JSON.stringify(books1));
            localStorage.setItem(local2,JSON.stringify(books2));

            // reload halaman
            window.location.reload(false);
        })
    }
}

// function hapus buku
function delBook(btn, local){
    for(let i=0; i<btn.length; i++){
        btn[i].addEventListener("click", function(){
            let test = confirm("Yakin hapus data ?");
            if(test === true){
                books = JSON.parse(localStorage.getItem(local)) || [];
                books.splice(i,1);
                localStorage.setItem(local,JSON.stringify(books));
                // reload halaman
                window.location.reload(false);
            }    
        })
    }
}

// function checkbox
function checkBox(){
    const checkBox = document.getElementById("inputBookIsComplete");
    const text = document.querySelector("#bookSubmit span");

    if(checkBox.checked == true){
        text.innerHTML = "Selesai Dibaca";
    } else{
        text.innerHTML = "Belum Selesai Dibaca";
    }
}

// function output
function outputBook(local, dom){
    books = JSON.parse(localStorage.getItem(local)) || [];
    for(let i=0; i<books.length; i++){
        let bookShelf = makeBookShelf(books[i]);
        dom.append(bookShelf);
    }
}

function makeBookShelf(book){
    const article = document.createElement("article");
    article.classList.add("book_item");

    const textTitle = document.createElement("h3");
    textTitle.innerText = book.title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = book.author;

    const textYear = document.createElement("p");
    textYear.innerText = book.year;

    // append ke article
    article.append(textTitle, textAuthor, textYear);

    const container = document.createElement("div");
    container.classList.add("action");

    // if pembeda complete dan incomplete
    if(book.isComplete === true){
        const btnHijau = document.createElement("button");
        btnHijau.classList.add("green");
        btnHijau.innerText = "Selesai Dibaca";

        const btnMerah = document.createElement("button");
        btnMerah.classList.add("red");
        btnMerah.innerText = "Hapus Buku";

        container.append(btnHijau, btnMerah);

        article.append(container);
    } else {
        const btnHijau = document.createElement("button");
        btnHijau.classList.add("green");
        btnHijau.innerText = "Belum Selesai Dibaca";

        const btnMerah = document.createElement("button");
        btnMerah.classList.add("red");
        btnMerah.innerText = "Hapus Buku";

        container.append(btnHijau, btnMerah);

        article.append(container);
    }
    return article;
}

// membuat fitur search
const searchBook = document.getElementById("searchBook");

searchBook.addEventListener("submit", function(){
    const search = document.getElementById("searchSubmit").value;

    // complete book
    booksCom = JSON.parse(localStorage.getItem(localCompleteBook)) || [];

    for(i=0; i<booksCom.length; i++){
        if(booksCom[i].title.toUpperCase() === search.toUpperCase()){
            // book = booksCom[i];
            localStorage.setItem(localCompleteBook,JSON.stringify(booksCom[i]));
        }
    }

    // incomplete book
    booksIncom = JSON.parse(localStorage.getItem(localIncompleteBook)) || [];

    for(i=0; i<booksIncom.length; i++){
        if(booksIncom[i].title.toUpperCase() === search.toUpperCase()){
            // book = booksIncom[i];
            localStorage.setItem(localIncompleteBook,JSON.stringify(booksIncom[i]));
        }
    }

    // output data
    outputBook(localCompleteBook, completedBookshelf);
    outputBook(localIncompleteBook, uncompletedBookshelf);

    // window.location.reload(false);

})


