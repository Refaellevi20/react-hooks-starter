const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailTableHeader({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isClicked, setIsClicked] = useState(false)
    const [readCount, setReadCount] = useState(0)
    const [unreadCount, setUnreadCount] = useState(0)

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
                        Read ({readCount})  {/* Corrected here */}
                    </p>
                    <p className="read-filter-option" onClick={() => handleChange(false)}>
                        Unread ({unreadCount})  {/* Corrected here */}
                    </p>
                </div>
            )}
        </div>
    )
}