const { Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

import { bookService } from '../service/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookBDetails } from './BookDeteils.jsx'
import { AddGoogleBook } from "../cmps/AddGoogleBook.jsx"
import { Category } from '../cmps/Category.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        console.log('filterBy', filterBy)
        setSearchParams(filterBy)
        loadBooks()
    }, [filterBy])
    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
        console.log(bookId)
    }

    function onSetBooks(newBook) {
        setBooks(prevBooks => [...prevBooks, newBook])
    }

    return (
        <section className='book-index'>
            <h1>Books</h1>
            {!selectedBookId ? (
                <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} />
                    <AddGoogleBook onSetBooks={onSetBooks} />
                        <Category />
                    <article className={`book-preview add-book book-list`}>
                        <Link to='/book/edit'>
                            <div className='book-btns'>
                                <i className="fas fa-book"></i>
                            </div>
                        </Link>
                    </article>
                    {books ? (
                        <BookList onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} books={books} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </React.Fragment>
            ) : (
                <BookBDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
            )}
        </section>
    )
}

