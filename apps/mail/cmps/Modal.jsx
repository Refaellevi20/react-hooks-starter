const { useState, useEffect, useRef } = React
import { mailService } from "../services/mail.service.js"
import { MailFolderList2 } from "./Validate.jsx"

export function MainFilter2({ onSetFilter }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const sidebarRef = useRef(null)
    const [isCheckedStar, setIsCheckedStar] = useState(false)
    const [inboxCount, setInboxCount] = useState('')
    //* not together
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
    }, [filterBy, onSetFilter])

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


    function handleChange({ target }) {
        const { value, name: field } = target
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function toggleModal() {
        setIsModalOpen((prev) => !prev)
    }

    function handleClickOutside(event) {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            !event.target.classList.contains('material-symbols-outlined')
        ) {
            setIsModalOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="filter-container2" ref={sidebarRef}>

            <span className="material-symbols-outlined" onClick={toggleModal}>menu</span>
            <form className="filter-form">
                <input
                    type="text"
                    id="txt"
                    name="txt"
                    className="search-input2"
                    placeholder="Search mail"
                    value={filterBy.txt}
                    onChange={handleChange}
                />
            </form>

            {isModalOpen && (
                <div className="main-screen" onClick={toggleModal} >

                    <div className="modal">
                        <div className="modal-content">

                            <img
                                className="gmail-logo"
                                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
                                srcSet="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png 2x"
                                alt="Gmail Logo"
                                aria-hidden="true"
                                role="presentation"
                                style={{ width: '109px', height: '40px' }}
                            />

                            <div className="side-bar-container ">
                            </div>
                            <span className="close" onClick={toggleModal}></span>

                            <ul className="filter-mob">
                                <li
                                    onClick={() => {
                                        // toggleModal()
                                        onSetListFilter('all')
                                    }}
                                    className={filterBy.status === 'all' ? "folder-list-item checked" : "folder-list-item"}
                                >
                                    <span className="material-symbols-outlined icon">mail</span>
                                    {labels.all}
                                </li>
                                <li
                                    onClick={() => {
                                        // toggleModal()
                                        onSetListFilter('inbox')
                                    }}
                                    className={filterBy.status === 'inbox' ? "folder-list-item checked inbox" : "folder-list-item inbox"}
                                >
                                    <span className="material-symbols-outlined icon">inbox</span>
                                    {labels.inbox} <span>{inboxCount}</span>
                                </li>
                                <li
                                    onClick={() => {
                                        // toggleModal()
                                        onSetListFilter('sent')
                                    }}
                                    className={filterBy.status === 'sent' ? "folder-list-item checked" : "folder-list-item"}
                                >
                                    <span className="material-symbols-outlined icon">send</span>
                                    {labels.sent}
                                </li>
                                <li
                                    onClick={() => {
                                        // toggleModal()
                                        onStarFilter(!isCheckedStar)
                                    }}
                                    className={isCheckedStar ? "folder-list-item checked" : "folder-list-item"}
                                >
                                    <span className="material-symbols-outlined icon">star</span>stared
                                    {labels.stared}
                                </li>
                                <li
                                    onClick={() => {
                                        // toggleModal()
                                        onSetListFilter('trash')
                                    }}
                                    className={filterBy.status === 'trash' ? "folder-list-item checked" : "folder-list-item"}
                                >
                                    <span className="material-symbols-outlined icon">delete</span>
                                    {labels.delete}
                                </li>
                                <li
                                    onClick={() => {
                                        // toggleModal()
                                        onSetListFilter('draft')
                                    }}
                                    className={filterBy.status === 'draft' ? "folder-list-item checked" : "folder-list-item"}
                                >
                                    <span className="material-symbols-outlined icon">draft</span>
                                    {labels.draft}
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            )}
        </div>

    )

}


