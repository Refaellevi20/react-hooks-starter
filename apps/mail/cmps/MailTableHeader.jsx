const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailTableHeader({ onSetFilter,mails,setMails }) {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isClicked, setIsClicked] = useState(false)
    const [readCount, setReadCount] = useState(0)
    const [unreadCount, setUnreadCount] = useState(0)
    // const [sortBy, setSortBy] = useState('')
    // const [mails, setMails] = useState([])


    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy])

    useEffect(() => {
        mailService.getMails().then(emails => {
            const read = emails.filter(email => email.isRead).length
            const unread = emails.length - read
            setReadCount(read)
            setUnreadCount(unread)
        })
    }, [])

    function handleChange(value) {
        setIsClicked(false)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, isRead: value }
        })
    }

    // function sortByCriterion(criterion) {
    //     setSortBy(criterion)
    //     const sortedMails = [...mails] 
    //     if (criterion === 'subject') {
    //         sortedMails.sort((a, b) => (a.subject.toLowerCase() > b.subject.toLowerCase()) ? 1 : -1)
    //     } else if (criterion === 'time') {
    //         sortedMails.sort((a, b) => (a.sentAt > b.sentAt) ? 1 : -1)
    //     } else if (criterion === 'from') {
    //         sortedMails.sort((a, b) => a.from.toLowerCase().localeCompare(b.from.toLowerCase()))
    //     }
    //     setMails(sortedMails) 
    // }

    //* Filter on everything
    return (
        <div className="mail-table-header">
            <div className="table-header-btn-container flex">
                <span onClick={() => setIsClicked(!isClicked)} className="material-symbols-outlined read-filter">list</span>
                <span onClick={() => window.location.reload()} className="material-symbols-outlined refresh">refresh</span>
            </div>
            {isClicked && (
                <div className="read-filter-modal card">
                    <p className="read-filter-option" onClick={() => handleChange(null)}>
                        All
                    </p>
                    <p className="read-filter-option" onClick={() => handleChange(true)}>
                        Read ({readCount}) 
                    </p>
                    <p className="read-filter-option" onClick={() => handleChange(false)}>
                        Unread ({unreadCount}) 
                    </p>
                </div>
            )}
            {/* <div className="sort-buttons">
                <button onClick={() => sortByCriterion('subject')}>Sort by Title</button>
                <button onClick={() => sortByCriterion('time')}>Sort by Time</button>
                <button onClick={() => sortByCriterion('from')}>Sort by Sender</button>
            </div> */}
        </div>
    )
}

