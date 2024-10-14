
const { useState, useEffect } = React

import { MailFilter } from '../cmps/mainFilter.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { MailList } from '../cmps/MailList.jsx';
import { MailCompose } from '../cmps/mailCompose.jsx';
import { mailService } from '../services/mail.service.js';
import { LanguageSwitcher } from '../cmps/hebrowEnglish.jsx';

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isComposeClicked, setIsComposeClicked] = useState(false)
    const [isSmall, setIsSmall] = useState(false)


    useEffect(() => {
        loadMails()
    }, [filterBy, mails])

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



    return (
        <main className={`mail-index-container ${isSmall ? 'small' : ''}`}>

            <MailFilter
                onSetFilter={onSetFilter} />
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
            <div>
            <h1>Email Labels</h1>
            <LanguageSwitcher />
        </div>
        </main>
    )
}

