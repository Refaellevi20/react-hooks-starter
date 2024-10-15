import { MailPreview } from "./MailPreview.jsx" 
import { MailTableHeader } from "./MailTableHeader.jsx" 

export function MailList({ mails, setStared, removeMail, onSetFilter, setReadMail, setToggleRead }) {
    return (
        <section className="mail-list">
            <MailTableHeader onSetFilter={onSetFilter} />
            <div className="mail-grid">
                {mails.map(mail => (
                    <MailPreview 
                        key={mail.id}
                        mail={mail}
                        setStared={setStared}
                        removeMail={removeMail}
                        setReadMail={setReadMail}
                        setToggleRead={setToggleRead}
                    />
                ))}
            </div>
        </section>
    )
}