const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';
import { MailSize } from '../cmps/MailSize.jsx'

export function MailFolderList({ onSetFilter, onToggleCompose, mails, onResizeClick }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCheckedStar, setIsCheckedStar] = useState(false)
    const [inboxCount, setInboxCount] = useState('')
    const [draftCount, setDraftCount] = useState('')
    const [language, setLanguage] = useState('English')
    const [readPersent, setReadPersent] = useState(0)
    const [showIconsOnly, setShowIconsOnly] = useState(0)

    const [labels, setLabels] = useState(
        {
            sent: 'Sent',
            inbox: 'Inbox',
            all: 'All',
            draft: 'Draft',
            delete: 'Delete',
        }
    )

    getDraftCount()
    getInboxCount()
    getReadBarPersent()

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

    function handleLanguageChange(ev) {
        setLanguage(ev.target.value)
    }



    function handleTranslate() {
        switch (language) {
            case 'Hebrew':
                setLabels({
                    sent: 'נשלח',
                    inbox: 'תיבת דואר נכנס',
                    all: 'הכל',
                    draft: 'טיוטה',
                    delete: 'מחק',
                    // star: 'ןחני',
                    // Stared: "דגה"
                })
                break;
            case 'Spanish':
                setLabels({
                    sent: 'Enviado',
                    inbox: 'Bandeja de entrada',
                    all: 'Todos',
                    draft: 'Borrador',
                    delete: 'Eliminar',
                })
                break;
            case 'French':
                setLabels({
                    sent: 'Envoyé',
                    inbox: 'Boîte de réception',
                    all: 'Tous',
                    draft: 'Brouillon',
                    delete: 'Supprimer',
                })
                break;
            case 'German':
                setLabels({
                    sent: 'Gesendet',
                    inbox: 'Posteingang',
                    all: 'Alle',
                    draft: 'Entwurf',
                    delete: 'Löschen',
                })
                break;
            case 'Italian':
                setLabels({
                    sent: 'Inviato',
                    inbox: 'Posta in arrivo',
                    all: 'Tutti',
                    draft: 'Bozza',
                    delete: 'Elimina',
                })
                break;
            default:
                setLabels({
                    sent: 'Sent',
                    inbox: 'Inbox',
                    all: 'All',
                    draft: 'Draft',
                    delete: 'Delete',
                })
                break;
        }
    }

    function getReadBarPersent() {
        mailService.getReadPersent().then((persent) => setReadPersent(persent + '%'))
    }

    function getInboxCount() {
        mailService.getInboxNum().then(setInboxCount)
    }

    function getDraftCount() {
        mailService.getDraftNum().then(setDraftCount)
    }

    function toggleIconsOnly() {
        setShowIconsOnly(!showIconsOnly)
    }

    return (
        <div className="side-bar-container ">
            {/* <button className="resize-btn" onClick={onResizeClick}>
                <span className="material-symbols-outlined">zoom_out</span>Resize
            </button> */}
            <button className="compose-btn" onClick={onToggleCompose}>
                <span className="material-symbols-outlined">edit</span>Compose
            </button>

            <select value={language} onChange={handleLanguageChange} className="custom-select">
                <option value="English">English</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
            </select>
            <button onClick={handleTranslate} className="custom-button">
                <i className="fas fa-language"></i> Translate
            </button>
            <ul className="folder-list-container">
                <li onClick={() => onSetListFilter('all')} className={filterBy.status === 'all' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">mail</span>{labels.all}</li>
                <li onClick={() => onSetListFilter('inbox')} className={filterBy.status === 'inbox' ? "folder-list-item checked inbox" : "folder-list-item inbox"}>
                    <span className="material-symbols-outlined icon">inbox </span> {labels.inbox} <span>&nbsp;{inboxCount}</span>
                </li>
                <li onClick={() => onSetListFilter('sent')} className={filterBy.status === 'sent' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">send</span>{labels.sent}</li>
                <li onClick={() => onStarFilter(!isCheckedStar)} className={isCheckedStar ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">star</span>Stared</li>
                <li onClick={() => onSetListFilter('trash')} className={filterBy.status === 'trash' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">delete</span>{labels.delete}</li>
                <li onClick={() => onSetListFilter('draft')} className={filterBy.status === 'draft' ? "folder-list-item checked" : "folder-list-item"}>
                    <span className="material-symbols-outlined icon">draft</span>{labels.draft}<span>&nbsp;{draftCount}</span></li>
            </ul>
            <div className="">
                <MailSize mails={mails} />
            </div>
            <div className="persent-bar-container"><div className="persent-bar" style={{ width: `${readPersent}` }}>{readPersent}</div></div>
        </div>
    )
}

//   return (
//         <ul className="folder-list-container">
//             <li
//                 onClick={() => onSetListFilter('all')}
//                 className={filterBy.status === 'all' ? 'folder-list-item checked' : 'folder-list-item'}
//             >
//                 <span className="material-symbols-outlined icon">mail</span>
//                 {!showIconsOnly && <span>{labels.all}</span>}
//             </li>
//             <li
//                 onClick={() => onSetListFilter('inbox')}
//                 className={filterBy.status === 'inbox' ? 'folder-list-item checked' : 'folder-list-item'}
//             >
//                 <span className="material-symbols-outlined icon">inbox</span>
//                 {!showIconsOnly && <span>{`${labels.inbox} (${inboxCount})`}</span>}
//             </li>
//             <li
//                 onClick={() => onSetListFilter('sent')}
//                 className={filterBy.status === 'sent' ? 'folder-list-item checked' : 'folder-list-item'}
//             >
//                 <span className="material-symbols-outlined icon">send</span>
//                 {!showIconsOnly && <span>{labels.sent}</span>}
//             </li>
//             <li
//                 onClick={() => onStarFilter(!isCheckedStar)}
//                 className={isCheckedStar ? 'folder-list-item checked' : 'folder-list-item'}
//             >
//                 <span className="material-symbols-outlined icon">star</span>
//                 {!showIconsOnly && <span>Starred</span>}
//             </li>
//             <li
//                 onClick={() => onSetListFilter('trash')}
//                 className={filterBy.status === 'trash' ? 'folder-list-item checked' : 'folder-list-item'}
//             >
//                 <span className="material-symbols-outlined icon">delete</span>
//                 {!showIconsOnly && <span>{labels.delete}</span>}
//             </li>
//             <li
//                 onClick={() => onSetListFilter('draft')}
//                 className={filterBy.status === 'draft' ? 'folder-list-item checked' : 'folder-list-item'}
//             >
//                 <span className="material-symbols-outlined icon">draft</span>
//                 {!showIconsOnly && <span>{labels.draft}</span>}
//             </li>
//         </ul>
//     )
// }