
const { useState, useEffect } = React

import { MainFilter } from '../cmps/MainFilter.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { MailList } from '../cmps/MailList.jsx';
import { MailCompose } from '../cmps/mailCompose.jsx';
import { mailService } from '../services/mail.service.js';
import { MainFilter2 } from '../cmps/Modal.jsx';
import { MailFolderList2 } from '../cmps/Validate.jsx';

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isComposeClicked, setIsComposeClicked] = useState(false)
    const [isSmall, setIsSmall] = useState(false)
    const [activeFilter, setActiveFilter] = useState('')
    const [sortBy, setSortBy] = useState('')


    function updateFilter() {
        if (window.innerWidth <= 650) {
            setActiveFilter('MainFilter2')
        } else {
            setActiveFilter('MainFilter')
        }
    }

    useEffect(() => {
        updateFilter()

        window.addEventListener('resize', updateFilter)

        return () => {
            window.removeEventListener('resize', updateFilter)
        }
    }, [])

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function addMail(newMail) {
        mailService.save(newMail).then((mail) => {
            mails.unshift(mail)
            setMails(mails)
        })
    }

    function onToggleCompose() {
        setIsComposeClicked(!isComposeClicked)
    }

    function setStared(mail) {
        mail.isStared = !mail.isStared
        mailService.save(mail)
    }

    function removeMail(mail) {
        if (mail.status === 'trash') {
            mailService.remove(mail.id)
                .catch((err) => {
                    console.log('Had issues removing', err)
                    showErrorMsg('Could not delete mail, try again please!')
                })
        } else {
            mail.status = 'trash'
            mailService.save(mail)
        }
    }

    function setReadMail(mail) {
        mail.isRead = false
        mailService.save(mail)
    }

    function setToggleRead(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
    }

    function saveDraft(mail) {
        mailService.save(mail)
    }

    function onResizeClick() {
        setIsSmall(!isSmall)
    }

    function sortByCriterion(criterion) {
        setSortBy(criterion)
        const sortedMails = [...mails]
        if (criterion === 'subject') {
            sortedMails.sort((a, b) => (a.subject.toLowerCase() > b.subject.toLowerCase()) ? 1 : -1)
        } else if (criterion === 'time') {
            sortedMails.sort((a, b) => (a.sentAt > b.sentAt) ? 1 : -1)
        } else if (criterion === 'from') {
            sortedMails.sort((a, b) => a.from.toLowerCase().localeCompare(b.from.toLowerCase()))
        }
        setMails(sortedMails)
    }

    return (
        <main>
            <section className={`mail-index-container ${isSmall ? 'small' : ''}`}>
                <div>
                    {activeFilter === 'MainFilter2' && (
                        <MainFilter2 onSetFilter={onSetFilter} />
                    )}
                    {activeFilter === 'MainFilter' && (
                        <MainFilter onSetFilter={onSetFilter} />
                    )}
                    {/*the other components */}
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
                </div>
            </section>
            <section className="mail-container">
                <MailFolderList
                    mails={mails}
                    onSetFilter={onSetFilter}
                    onToggleCompose={onToggleCompose}
                    onResizeClick={onResizeClick}
                />
                <MailList
                    mails={mails}
                    setStared={setStared}
                    removeMail={removeMail}
                    onSetFilter={onSetFilter}
                    setReadMail={setReadMail}
                    setToggleRead={setToggleRead} />
                {isComposeClicked && <MailCompose
                    addMail={addMail}
                    onToggleCompose={onToggleCompose}
                    saveDraft={saveDraft} />}
            </section>
        </main>
    )
}

