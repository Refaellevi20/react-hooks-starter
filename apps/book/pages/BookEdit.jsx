
const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from '../service/book.service.js'
import { eventBusService } from "../service/event-bus.service.js"

export function BookEdit() {
    // const [checked, setChecked] = useState({ isOn: false, name: "" })
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()
    // useEffect(() => {}, [bookToEdit])

    useEffect(() => {
        if (bookId) loadBook()
    }, [])


    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch((err) => {
                console.log(err, " had issue in BookDetails cmp")
                navigate("/book")
            })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit).then((book) => {
            navigate("/book")
            console.log("book:", book)
        })
    }


    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleListPriceChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }))
    }
    const fields = ['title', 'language', 'publishedDate', 'pageCount']
    return (
        <section className='book-edit'>
            <h2 className='form-title'>{!bookId ? "Book" : "Edit Book"}</h2>
            <form onSubmit={onSaveBook} className='form'>
                {fields.map((field) => (
                    <div className='form-group' key={field}>
                        <label htmlFor={field}>{`Book ${field.charAt(0).toUpperCase() + field.slice(1)}`}</label>
                        <input
                            required
                            type={field === 'publishedDate' || field === 'pageCount' ? 'number' : 'text'}
                            name={field}
                            id={field}
                            placeholder={`Enter book ${field}`}
                            onChange={handleChange}
                            value={bookToEdit[field]}
                            className='input-field'
                        />
                    </div>
                ))}
                <div className='form-group'>
                    <label htmlFor='amount'>Price</label>
                    <input
                        required
                        type='number'
                        name='amount'
                        id='amount'
                        placeholder='Enter price'
                        onChange={handleListPriceChange}
                        value={bookToEdit.listPrice.amount}
                        className='input-field'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='isOnSale' className='switch-label'>
                        <span className='label-text'>on sale?</span>
                        <input
                            type='checkbox'
                            name='isOnSale'
                            id='isOnSale'
                            checked={bookToEdit.listPrice.isOnSale}
                            onChange={handleListPriceChange}
                            className='checkbox'
                        />
                        <span className='slider'></span>
                    </label>
                </div>
                <button type='submit' className='submit-button'>{!bookId ? "Add Book" : "Save"}</button>
                <Link to={!bookId ? "/book" : `/book/${bookId}`} className='cancel-link'>Cancel</Link>
            </form>
        </section>
    )
}