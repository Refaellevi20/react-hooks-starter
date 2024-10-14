import { MailPreview } from "./MailPreview.jsx" 
import { MailTableHeader } from "./MailTableHeader.jsx" 

export function MailList({ mails, setStared, removeMail, onSetFilter, setReadMail, setToggleRead }) {
    return (
        <section>
            <table className="mail-table">
                <MailTableHeader onSetFilter={onSetFilter} />
                <tbody>
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
                </tbody>
            </table>
        </section>
    )
}
