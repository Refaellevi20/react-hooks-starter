const  { useState, useEffect, useRef } = React
import { mailService } from '../services/mail.service.js'; 

export function MailFolderList2({ onSetFilter, onToggleCompose }) {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCheckedStar, setIsCheckedStar] = useState(false)
    const [inboxCount, setInboxCount] = useState('')
    const [labels, setLabels] = useState(
        {
            sent: 'Sent',
            inbox: 'Inbox',
            all: 'All',
            draft: 'Draft',
            delete: 'Delete',
        }
    )

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

    return (
        <div className="side-bar-container ">

            <ul className="folder-list-container">
                <li onClick={() => onSetListFilter('all')} className={filterBy.status === 'all' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">mail</span>{labels.all}</li>
                <li onClick={() => onSetListFilter('inbox')} className={filterBy.status === 'inbox' ? "folder-list-item checked inbox" : "folder-list-item inbox"}>
                    <span className="material-symbols-outlined icon">inbox</span>{labels.inbox} <span>{inboxCount}</span></li>
                <li onClick={() => onSetListFilter('sent')} className={filterBy.status === 'sent' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">send</span>{labels.sent}</li>
                <li onClick={() => onStarFilter(!isCheckedStar)} className={isCheckedStar ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">star</span>Stared</li>
                <li onClick={() => onSetListFilter('trash')} className={filterBy.status === 'trash' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">delete</span>{labels.delete}</li>
                <li onClick={() => onSetListFilter('draft')} className={filterBy.status === 'draft' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">draft</span>{labels.draft}</li>
            </ul>
        </div>
    )
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

