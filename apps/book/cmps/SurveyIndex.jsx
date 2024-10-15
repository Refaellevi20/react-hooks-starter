import { StarRating } from "./StarRating.jsx"

const { useState } = React

export function SurveyIndex({ onRatingChange }) {

    const [selectedMethod, setSelectedMethod] = useState('RateBySelect') 
    const [rating, setRating] = useState('') 

    function handleMethodChange (event) {
        setSelectedMethod(event.target.value)
    }

    function handleRatingChange(val){
        setRating(val)
        onRatingChange(val)
    }


    function getStarRating() {
        const elStars = document.querySelector('input[name="star"]:checked')
        const ratingValue  = elStars ? +elStars.value : 0
      setRating(ratingValue)
      onRatingChange(ratingValue)

    }

    const ratingComponents = {
        RateBySelect: <RateBySelect val={rating} onRatingChange={handleRatingChange} />,
        RateByTextbox: <RateByTextbox val={rating} onRatingChange={handleRatingChange} />,
        RateByStars: <StarRating val={rating} getStarRating={getStarRating} />
    }

    return (
        <section className="survey-index">
            <select onChange={handleMethodChange} value={selectedMethod}>
                <option value="RateBySelect">Rate by Select</option>
                <option value="RateByTextbox">Rate by Textbox</option>
                <option value="RateByStars">Rate by Stars</option>
            </select>

            <div>
                {ratingComponents[selectedMethod]}
            </div>

            <hr />
            <p>Your Rating: {rating}</p>
        </section>
    )
}

function RateBySelect({ val, onRatingChange }) {
    const options = ['🌟', '🌟🌟', '🌟🌟🌟', '🌟🌟🌟🌟', '🌟🌟🌟🌟🌟']
    return (
        <div className="form-group">
            <label htmlFor="rateSelect">Select Rating</label>
            <select
                id="rateSelect"
                value={val}
                onChange={(event) => onRatingChange(event.target.value)}
            >
                <option value=''>Select Rating</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    )
}

function RateByTextbox({ val, onRatingChange }) {
    const maxStars = 5
    function renderStars(rating) {
        const fullStars = '🌟'.repeat(rating)
        const emptyStars = '☆'.repeat(maxStars - rating)
        return fullStars + emptyStars
    }

    return (
        <div className="form-group">
            <label htmlFor="rateTextbox">Enter Rating (1-5)</label>
            <input
                type="number"
                id="rateTextbox"
                value={val}
                placeholder="Enter rating (1-5)"
                onChange={(event) => {
                    const value = +event.target.value
                    if (value >= 1 && value <= 5) {
                        onRatingChange(value)
                    }
                }}
            />
             <div className="star-display">
                {renderStars(val)} 
            </div>
        </div>
    )
}

