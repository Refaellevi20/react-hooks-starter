const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailTableHeader({ onSetFilter }) {


    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        // console.log(filterBy)
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange(value) {
        setIsClicked(false)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, isRead: value }
        })
    }
//* filter on everything
return (
    <thead>
        <tr>
            <th className="mail-table-header">
                <div className="table-header-btn-container flex">
                    <span onClick={() => setIsClicked(!isClicked)} className="material-symbols-outlined read-filter">list</span>
                    <span onClick={() => window.location.reload()} className="material-symbols-outlined refresh">refresh</span>
                </div>
                {isClicked && (
                    <div className="read-filter-modal">
                        <p className="read-filter-option" onClick={() => handleChange(null)}>All</p>
                        <p className="read-filter-option" onClick={() => handleChange(false)}>Read</p>
                        <p className="read-filter-option" onClick={() => handleChange(true)}>Unread</p>
                    </div>
                )}
            </th>
        </tr>
    </thead>
)
}
