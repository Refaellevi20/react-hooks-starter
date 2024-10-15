import { bookService } from '../service/book.service.js' 
import { utilService } from '../../../services/util.service.js'

const { useState, useRef } = React

export function AddGoogleBook({ onSetBooks }) {
    const [matchBooks, setMatchBooks] = useState([])
    // const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')
    
    const onSearchBooksDebounce = useRef(utilService.debounce(onSearchBooks, 300)).current

    function onSearchBooks({ target }) {
        const searchTitle = target.value.trim()
        setError('')

        if (!searchTitle) {
            setMatchBooks([])
            return
        }

        bookService.getGoogleBooks(searchTitle)
            .then((books) => {
                console.log('books:', books)
                setMatchBooks(books || [])
            })
            .catch(err => {
                console.error(err)
                setError('Error fetching books. Please try again.')
            })

    }

    function onAddBook(matchIdx) {
        const googleBook = matchBooks[matchIdx]
        bookService.addGoogleBook(googleBook)
            .then(newBook => {
                setMatchBooks([])
                onSetBooks(newBook)
            })
    }

    return (
        <section className="book-add">
            <label>Search for a book:</label>
            <input
                type="text"
                onChange={onSearchBooksDebounce}
                placeholder="Enter book title..."
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!!matchBooks.length && (
                <ul className="search-res-list">
                    {matchBooks.map((matchBook, matchIdx) => (
                        <li key={matchIdx}>
                            <p>{matchBook.volumeInfo.title}</p>
                            <button onClick={() => onAddBook(matchIdx)}>⊕</button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
