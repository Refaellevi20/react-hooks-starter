const { Link } = ReactRouterDOM

//! or another func inside BookPreview or stay the same in BookPreview


export function BookPreview({ book, onRemoveBook }) {

    function getShortDescription(description, maxLength = 50) {
        if (description.length <= maxLength) return description;
        return `${description.substring(0, maxLength).trim()}...`
    }

    return (
        <div className="book-preview">
            <h3 className="book-title">{book.title}</h3>
            <div className="image-container">
                {/* Sale badge should be before the image */}
                {book.listPrice.isOnSale && (
                    <div className="sale-badge">Sale!</div>
                )}
                <img className="book-thumbnail" src={book.thumbnail} alt={`${book.title}`} />
                <div className="button-container">
                    <button className="remove-button" onClick={() => onRemoveBook(book.id)}>
                        <i className='fa-regular fa-trash-can'></i>
                    </button>
                    <button className="details-button">
                        <Link to={`/book/${book.id}`}>
                            <i className="fa-solid fa-info"></i>
                        </Link>
                    </button>
                </div>
            </div>
            <p className="book-price">Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <div className="book-description">
                <p>{getShortDescription(book.description, 50)}</p>
            </div>
        </div>
    )
}