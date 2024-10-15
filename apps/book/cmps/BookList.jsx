const { Link } = ReactRouterDOM

import { BookPreview } from './BookRreview.jsx' 

export function BookList({ books, onRemoveBook, onSelectBookId }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
                </li>
            ))}
        </ul>
    )
}



