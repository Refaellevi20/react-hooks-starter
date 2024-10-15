import React, { useState } from 'react'
import { bookService } from '../service/book.service.js' 

export function BookAdd({ onAdd }) {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    const handleAdd = () => {
        const newBook = {
            title,
            authors: ['Unknown Author'], 
            description: 'No description available', 
            publishedDate: new Date().getFullYear(), 
            pageCount: 0, 
            listPrice: {
                amount: +price,
                currencyCode: 'USD', 
            },
            thumbnail: 'default-thumbnail-url.jpg', 
            onSale: false, 
            categories: [], 
        }

        onAdd(newBook)

        setTitle('')
        setPrice('')
    }

    return (
        <div className="book-add">
            <h2>Add a New Book</h2>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Price"
                type="number"
                required
            />
            <button onClick={handleAdd}>Add Book</button>
        </div>
    )
}
