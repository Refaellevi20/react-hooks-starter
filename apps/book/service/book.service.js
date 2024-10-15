
import { utilService } from "../../../services/util.service.js" 
import { storageService } from "./async.storge.service.js"
import { storageServices } from "./storage.service.js"

const BOOK_DB = 'bookDB'

_createBooks()

export const bookService = {
    query, //* List
    get, //* Read
    remove, //* Delete
    save, //* Update/Create = f
    getDefaultFilter,
    getEmptyBook,
    removeReview,
    addReview,
    addGoogleBook,
    getBooks,
    getGoogleBooks,
    getDefaultFilter,
    getFilterFromSearchParams,
    // groupItemsByCategory
    // _setNextPrevBookId
    // _createBooks
}
function query(filterBy = {}) {
    return storageService.query(BOOK_DB)
        .then(books => {
            //* Filter title
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            //* Filter maxPrice 
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            return books
        })
}


function get(bookId) {
    return storageService.get(BOOK_DB, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_DB, bookId)
}

function save(book, isGoogleBook = false) {
    if (book.id && !isGoogleBook) {
        return storageService.put(BOOK_DB, book)
    } else {
        return storageService.post(BOOK_DB, book, isGoogleBook)
    }
}

function removeReview(book, revId) {
    const reviewIdx = book.reviews.findIndex(rev => rev.id === revId)
    if (reviewIdx === -1) return Promise.reject(`Review with ID ${reviewIdx} not found`)
    book.reviews.splice(reviewIdx, 1)
    return save(book)
}


function addReview(book, review) {

    review.id = utilService.makeId()
    if (!book.reviews) {
        book.reviews = [review]
    } else {
        book.reviews.unshift(review)
    }
    return save(book)
}

function getEmptyBook() {
    return {
        id: '',
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: utilService.makeLorem(30),
        pageCount: 0,
        categories: [],
        language: '',
        thumbnail: 'http://coding-academy.org/books-photos/2.jpg',
        listPrice: {
            amount: 0,
            currencyCode: '',
            isOnSale: false,
        }
    }
}


function getDefaultFilter() {
    return { title: '', maxPrice: '' }
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

// function groupItemsByCategory () {
//     return categories.map(category => {
//         const itemsInCategory = itemsData.filter(item => item.category === category)
//         return {
//             category,
//             items: itemsInCategory,
//             percentage: ((itemsInCategory.length / itemsData.length) * 100)
//         }
//     })
// }

function getGoogleBooks(searchTitle) {

    return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTitle}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch books')
            }
            return res.json()
        })
        .then(({ items }) => {
            console.log('items:', items)
            return items
        })
        .catch(err => {
            console.log('err:', err)
            throw err
        })


}

function addGoogleBook(googleBook) {
    // const books = getBooks() || []
    return query()
        .then(books => {
            if (books.some(book => book.id === googleBook.id)) {
                console.log("Book already exists in the database")
                return Promise.reject("Book already exists")
            }
            return books
        })
        .then(() => {
            const book = _formatGoogleBook(googleBook)
            const isGoogleBook = true
            return save(book, isGoogleBook)
        })


}


function _formatGoogleBook(googleBook) {
    const { volumeInfo } = googleBook
    const book = {
        id: googleBook.id || '',
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle || '',
        authors: volumeInfo.authors || [],
        publishedDate: volumeInfo.publishedDate || '',
        description: volumeInfo.description || '',
        pageCount: volumeInfo.pageCount || 0,
        categories: volumeInfo.categories || [],
        language: volumeInfo.language || '',
        thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '',
        listPrice: {
            amount: 100,
            currencyCode: 'EUR',
            isOnSale: false,
        }
    }
    return book


}

function getBooks() {
    const books = JSON.parse(localStorage.getItem(BOOKS_KEY))
    return books
}

function saveBooks(books) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
}

function _createBooks() {
    let books = storageServices.loadFromStorage(BOOK_DB)
    if (!books || !books.length) {
        const books = [
            {
                "id": "OXeMG8wNskc",
                "title": "metus hendrerit",
                "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
                "authors": [
                    "Barbara Booktland"
                ],
                "publishedDate": 1999,
                "description": utilService.makeLorem(55),
                "pageCount": 713,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 109,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "JYOJa2NpSCq",
                "title": "morbi",
                "subtitle": "lorem euismod dictumst inceptos mi",
                "authors": [
                    "Barbara Booktland"
                ],
                "publishedDate": 1978,
                "description": utilService.makeLorem(45),
                "pageCount": 129,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 44,
                    "currencyCode": "EUR",
                    "isOnSale": true
                }
            },
            {
                "id": "1y0Oqts35DQ",
                "title": "at viverra venenatis",
                "subtitle": "gravida libero facilisis rhoncus urna etiam",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1999,
                "description": utilService.makeLorem(50),
                "pageCount": 972,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 108,
                    "currencyCode": "ILS",
                    "isOnSale": false
                }
            },
            {
                "id": "kSnfIJyikTP",
                "title": "dictum",
                "subtitle": "augue eu consectetur class curabitur conubia ligula in ullamcorper",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1978,
                "description": utilService.makeLorem(35),
                "pageCount": 303,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 30,
                    "currencyCode": "EUR",
                    "isOnSale": true
                }
            },
            {
                "id": "f4iuVmbuKCC",
                "title": "sem himenaeos aptent",
                "subtitle": "interdum per habitasse luctus purus est",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 2011,
                "description": utilService.makeLorem(85),
                "pageCount": 337,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 19,
                    "currencyCode": "USD",
                    "isOnSale": false
                }
            },
            {
                "id": "U2rfZO6oBZf",
                "title": "mi ante posuere",
                "subtitle": "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 1978,
                "description": utilService.makeLorem(55),
                "pageCount": 748,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/1.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 91,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "xI0wrXaaAcq",
                "title": "non",
                "subtitle": "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 2011,
                "description": utilService.makeLorem(75),
                "pageCount": 65,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 90,
                    "currencyCode": "USD",
                    "isOnSale": false
                }
            },
            {
                "id": "9laHCEdSpFy",
                "title": "tristique",
                "subtitle": "consectetur a eu tincidunt condimentum amet nisi",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1999,
                "description": utilService.makeLorem(55),
                "pageCount": 299,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/11.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 176,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "nGhVwZvGCGp",
                "title": "urna ornare gravida",
                "subtitle": "sem vestibulum semper convallis pharetra tempor himenaeos ut",
                "authors": [
                    "Jin Yong"
                ],
                "publishedDate": 2011,
                "description": utilService.makeLorem(65),
                "pageCount": 803,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 116,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "Q8Q9Lsd03BD",
                "title": "consequat neque volutpat",
                "subtitle": "vel quis taciti fermentum feugiat ullamcorper curae praesent",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1978,
                "description": utilService.makeLorem(25),
                "pageCount": 891,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/5.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 145,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "bd7a76kARao",
                "title": "risus",
                "subtitle": "pretium bibendum pharetra curabitur quisque dictumst",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 2018,
                "description": utilService.makeLorem(55),
                "pageCount": 86,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 157,
                    "currencyCode": "ILS",
                    "isOnSale": true
                }
            },
            {
                "id": "qKyG0vqeO3e",
                "title": "interdum etiam vulputate",
                "subtitle": "velit sapien eget tincidunt nunc tortor",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 2018,
                "description": utilService.makeLorem(85),
                "pageCount": 882,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/17.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 57,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "2RvT48ZNInj",
                "title": "sagittis justo",
                "subtitle": "etiam primis proin praesent placerat nisi fermentum nisi",
                "authors": [
                    "Agatha Christie"
                ],
                "publishedDate": 2011,
                "description": utilService.makeLorem(75),
                "pageCount": 598,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/8.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 167,
                    "currencyCode": "ILS",
                    "isOnSale": false
                }
            },
            {
                "id": "5z2s9pDXAYj",
                "title": "quam ullamcorper himenaeos",
                "subtitle": "ut placerat eu dapibus sapien sodales laoreet",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1999,
                "description": utilService.makeLorem(45),
                "pageCount": 608,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/3.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 150,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "zBZu5cDEWha",
                "title": "quis",
                "subtitle": "suscipit turpis etiam turpis libero lobortis",
                "authors": [
                    "Jin Yong"
                ],
                "publishedDate": 2011,
                "description": utilService.makeLorem(95),
                "pageCount": 583,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/6.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 58,
                    "currencyCode": "ILS",
                    "isOnSale": true
                }
            },
            {
                "id": "aOI7tQuPZ2f",
                "title": "aliquam aliquet dapibus",
                "subtitle": "neque eu purus euismod placerat adipiscing odio egestas consequat",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 2011,
                "description": utilService.makeLorem(60),
                "pageCount": 497,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/7.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 78,
                    "currencyCode": "USD",
                    "isOnSale": false
                }
            },
            {
                "id": "WBooB82Uvwu",
                "title": "class",
                "subtitle": "elit enim ultricies amet imperdiet a molestie class elementum venenatis",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1999,
                "description": utilService.makeLorem(35),
                "pageCount": 804,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 118,
                    "currencyCode": "ILS",
                    "isOnSale": false
                }
            },
            {
                "id": "xm1z5bbZjlS",
                "title": "vitae",
                "subtitle": "class habitant at commodo semper ligula a bibendum",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 1999,
                "description": utilService.makeLorem(55),
                "pageCount": 231,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 60,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "u3j6QIKLlJb",
                "title": "rhoncus vivamus",
                "subtitle": "nullam class risus amet senectus scelerisque etiam curabitur",
                "authors": [
                    "Agatha Christie"
                ],
                "publishedDate": 1978,
                "description": utilService.makeLorem(70),
                "pageCount": 652,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 110,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "vxYYYdVlEH3",
                "title": "donec mi ullamcorper",
                "subtitle": "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
                "authors": [
                    "William Shakespeare"
                ],
                "publishedDate": 2011,
                "description": utilService.makeLorem(80),
                "pageCount": 904,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 186,
                    "currencyCode": "ILS",
                    "isOnSale": true
                }
            }
        ]
        storageServices.saveToStorage(BOOK_DB, books)
    }
    console.log("creating books...", books)
}

function _createBook(title, { amount, isOnSale, currCode = "EUR" }) {
    return {
        title,
        description: "placerat nisi sodales suscipit tellus",
        thumbnail: "http://ca.org/books-photos/20.jpg",
        listPrice: {
            amount,
            currCode,
            isOnSale,
        },
    }
}