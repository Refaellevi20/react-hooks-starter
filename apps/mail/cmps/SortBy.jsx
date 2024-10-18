
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js" 

export function SortBy() {



    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState('')



    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    function sortByCriterion(criterion) {
        const sortedMails = [...mails]
        sortedMails.sort((a, b) => {
            if (criterion === 'subject') return a.subject.localeCompare(b.subject)
            if (criterion === 'time') return a.sentAt - b.sentAt
            if (criterion === 'from') return a.from.localeCompare(b.from)
        })
        setMails(sortedMails)
        setSortBy(criterion)
    }


    return (
        <div className="sort-buttons">
            <button
                className={sortBy === 'subject' ? 'active' : ''}
                onClick={() => sortByCriterion('subject')}
            >
                <span className="material-symbols-outlined">sort_by_alpha</span> Sort by Title
            </button>
            <button
                className={sortBy === 'time' ? 'active' : ''}
                onClick={() => sortByCriterion('time')}
            >
                <span className="material-symbols-outlined">access_time</span> Sort by Time
            </button>
            <button
                className={sortBy === 'from' ? 'active' : ''}
                onClick={() => sortByCriterion('from')}
            >
                <span className="material-symbols-outlined">person</span> Sort by Sender
            </button>
        </div>
    )
}