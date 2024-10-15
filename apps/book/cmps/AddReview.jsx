const { useState } = React

import { bookService } from '../service/book.service.js' 
import { StarRating } from './StarRating.jsx'
import { SurveyIndex } from './SurveyIndex.jsx'


export function AddReview({ book, onSetBook }) {
    const [reviewToEdit, setReviewToEdit] = useState({
        fullName: "",
        rating: "",
        readAt: "",
    })

    //! another way
    const [rating, setRating] = useState('')

    function handleChange({ target }) {
        let { type, name: field, value } = target
        value = type === "number" ? +value : value
        setReviewToEdit((prevReview) => ({ ...prevReview, [field]: value }))
    }

    //! another way
    function handleChangeUtiqe(ev) {
        const value = ev.target.value
        if (value >= 1 && value <= 5) {
            setRating(value)
        } else {
            setMsg('Please enter a rating between 1 and 5')
        }
    }

    function updateRating(val) {
        setReviewToEdit(prevReview => ({ ...prevReview, rating: val }))
    }

    // function getStarRating() {
    //     const elStars = document.querySelector('input[name="star"]:checked')
    //     const rating = elStars ? +elStars.value : 0
    //     setReviewToEdit((prev) => ({ ...prev, rating }))
    // }

    function onAddReviewSubmit(ev) {
        ev.preventDefault()

        bookService.addReview(book, reviewToEdit)
            .then((updatedBook) => {
                onSetBook(updatedBook)
                setReviewToEdit({
                    fullName: '',
                    rating: '',
                    readAt: '',
                })
            })
    }

    const stars = ['🌟', '⭐🌟', '🌟🌟🌟', '🌟🌟🌟🌟', '🌟🌟🌟🌟🌟']
    return (
        <section className="book-review">
            <h2>Add a Review</h2>
            <form onSubmit={onAddReviewSubmit}>
                <div className="form-group">
                    {/* This helps improve accessibility, as it allows screen readers to correctly associate a label with its respective form element. */}
                    <label htmlFor="fullName">Full Name </label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        placeholder="Full Name"
                        onChange={handleChange}
                        value={reviewToEdit.fullName}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="rating">Rate </label>
                    <select
                        name="rating"
                        id="rating"
                        required
                        onChange={handleChange}
                        value={reviewToEdit.rating}
                    >
                        <option value="">Select Rating</option>
                        {stars.map((star) => (
                            <option key={star} value={star}>{star}</option>
                        ))}
                    </select>
                </div> */}
                {/* another way the coolest way*/}
               

                    {/* <StarRating getStarRating={getStarRating} /> */}
                
                {/* another way */}

                {/* <div className="form-group">
                    <label htmlFor="rating">Rate</label>
                    <select
                        name="rating"
                        id="rating"
                        required
                        onChange={handleForm}
                        value={reviewToEdit.rating}
                    >
                        <option value="">Select Rating</option>
                        <option value="🌟">🌟</option>
                        <option value="🌟🌟">🌟🌟</option>
                        <option value="🌟🌟🌟">🌟🌟🌟</option>
                        <option value="🌟🌟🌟🌟">🌟🌟🌟🌟</option>
                        <option value="🌟🌟🌟🌟🌟">🌟🌟🌟🌟🌟</option>
                    </select>
                </div> */}

                {/* another way */}

                {/* <div className="form-group">
                    <label htmlFor="rating">Rate </label>
                    <select
                        name="rating"
                        id="rating"
                        required
                        onChange={handleForm}
                        value={reviewToEdit.rating}
                    >
                        <option value="">Select Rating</option>
                        <option value={starOptions[0]}>{starOptions[0]}</option>
                        <option value={starOptions[1]}>2</option>
                        <option value={starOptions[2]}>3</option>
                        <option value={starOptions[3]}>4</option>
                        <option value={starOptions[4]}>5</option>
                    </select>
                </div> */}

                {/* another way */}
                {/* <div>
                    <label htmlFor="rateInput"></label>
                    <input
                        type="number"
                        id="rateInput"
                        value={rating}
                        onChange={handleChangeUtiqe}
                        placeholder="Enter rating (1-5)"
                    />
                    <p>Your rating: {rating}</p>
                </div> */}
                <SurveyIndex onRatingChange={updateRating} />

                <div className="form-group">
                    <label htmlFor="readAt">Read At </label>
                    <input
                        type="date"
                        name="readAt"
                        id="readAt"
                        required
                        onChange={handleChange}
                        value={reviewToEdit.readAt}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit">Add Review</button>
                </div>
            </form>
        </section>
    )
}