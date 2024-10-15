const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from '../service/book.service.js'
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useEffect, useState } = React

export function BookBDetails({ onBack }) {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()

    // const [reviews, setReviews] = useState([])
    const navigate = useNavigate()

    //* GETTING THE bookId which is promise which is return an arr of reviews
    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
            })
    }


    function onBack() {
        navigate('/book')
        //* beucose it will kick him from the app (friend)
        // navigate(-1)
    }

    //* delete review
    function onRemoveReview(reviewId) {
        bookService.removeReview(book, reviewId)
            .then(() => {
                setBook({ ...book })
            })
            .catch(err => {
                console.log('err:', err)
            })

    }

    //* add review
    function onSetBook(book) {
        setBook({ ...book })
    }

    function getPageCountTag(pageCount) {
        if (pageCount > 500) return <span className='tag serious-tag'>Serious reading</span>
        if (pageCount > 200) return <span className='tag descent-tag'>Decent reading</span>
        if (pageCount < 100) return <span className='tag light-tag'>Light reading</span>
        return ""
    }

    function getPublishedDateTag(publishedDate) {
        const date = new Date().getFullYear()
        if (publishedDate < date - 10) return <span className='tag descent-tag'>Vintage</span>
        return <span className='tag light-tag'>New</span>
    }

    if (!book) return <div>Loading...</div>

    const {
        thumbnail,
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        onSale,
        reviews = [],
        price
    } = book

    console.log('authors:', authors)
    return (
        <section className="book-details">
            <div className="book-header">

                <article>
                    <Link to={`/book/edit/${bookId}`}>
                        <div className='book-btns'>
                            <span>📚 Edit Book</span> {/* Add descriptive text next to the icon */}
                        </div>
                    </Link>
                </article>

                {/* pre + nex to the another pic...*/}

                <section className="card-btn">
                    <Link to={`/book/${book.prevBookId}`} className="btn rounded arrow prev">
                        Prev book
                    </Link>
                    <Link to={`/book/${book.nextBookId}`} className="btn rounded arrow next">
                        Next book
                    </Link>
                </section>

                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <h3>By: {authors}</h3>
            </div>
            <div style={{ display: 'flex' }}>
                <div className="book-info-description">
                    <div className="book-info">
                        <p style={{ marginTop: '1.2em' }}>Published: {publishedDate} {getPublishedDateTag(publishedDate)}</p>
                        <p>Categories: {categories}</p>
                        <p>Page Count: {pageCount} {getPageCountTag(pageCount)}</p>
                    </div>
                    <div className="book-description">
                        <LongTxt txt={description} length={100} />
                    </div>
                </div>
                <div className="book-price">
                    <p className={`price ${price > 150 ? 'red' : price < 20 ? 'green' : ''}`}>

                    </p>
                    {onSale && <span className="on-sale-tag">On Sale</span>}
                </div>
                <div className="book-thumbnail">
                    <img src={thumbnail} alt={`${title} Thumbnail`} />
                </div>
            </div>
            <button className="back-button" onClick={onBack}>Back</button>
            <hr />
            {/*Review Section */}
            <div className="card review-card">
                <AddReview book={book} onSetBook={onSetBook} />
                <hr />
                <h2 style={{ textAlign: 'center' }}>Reviews</h2>
                {reviews.length === 0 ? (
                    <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="no-reviews">
                        Could not hind any reviews yet.
                    </p>) : (
                    <ul className="show-reviews">
                        {reviews.map((review) => (
                            <li key={review.id}>
                                <div className="show-reviews review-card">
                                    <p>
                                        <strong>Name:</strong> {review.fullName} <br />
                                        <strong>Rate:</strong> {review.rating} <br />
                                        <strong>Read At:</strong> {review.readAt}
                                    </p>
                                    {/* Pass both book and review.id when deleting */}
                                    <button onClick={() => onRemoveReview(review.id)}>Delete Review</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>

    )
}

