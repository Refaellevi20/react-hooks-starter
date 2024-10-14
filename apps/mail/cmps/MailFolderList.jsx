const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFolderList({ onSetFilter, onToggleCompose, mails }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCheckedStar, setIsCheckedStar] = useState(false)

    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy, isCheckedStar])

    function onSetListFilter(value) {
        onStarFilter(false)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, status: value }
        })
    }

    function onStarFilter(isFilterOn) {
        setIsCheckedStar(isFilterOn)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, isStared: isFilterOn, status: '' }
        })
    }

    return <div className="side-bar-container">
        <button className="compose-btn" onClick={onToggleCompose}><span className="material-symbols-outlined">edit</span>Compose</button>
        <ul className="folder-list-container">
            <li onClick={() => onSetListFilter('all')}
                className={filterBy.status === 'all' ?
                    "folder-list-item checked" : "folder-list-item"}>
                <span className="need icon here">mail</span>All</li>          
        </ul>
    </div>
}