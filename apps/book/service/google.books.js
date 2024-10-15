const API_KEY = 'YOUR_GOOGLE_BOOKS_API_KEY'
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

export const googleBookService = {
    query,
}

function query(txt) {
    const url = `${BASE_URL}?q=${encodeURIComponent(txt)}&key=${API_KEY}`
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok')
            return res.json()
        })
        .then(data => {
            return data.items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
               
            }))
        })
}