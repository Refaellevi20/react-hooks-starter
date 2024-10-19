const { useState } = React
import { mailService } from "../services/mail.service.js"
import { EmojiSelector } from "./emojis.jsx"

export function MailCompose({ addMail, onToggleCompose, saveDraft, mailsSent }) {

    const [draftMail, setDraftMail] = useState(mailService.getEmptyMailToDraft())
    const [isTimePassed, setIsTimePassed] = useState(false)



    function onAddMail(ev) {
        ev.preventDefault()
        const { target } = ev
        const newMail = createNewMail(target)
        addMail(newMail)

    }

    function createNewMail(target) {
        const newMail = mailService.getEmptyMailToSend()
        newMail.to = target.to.value
        newMail.subject = target.subject.value
        newMail.body = target.body.value
        onToggleCompose()
        return newMail
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setDraftMail({ ...draftMail, [field]: value })
        setTimeout(() => {
            setIsTimePassed(true)
        }, 5000)

    }

    function onCloseCompose() {
        onToggleCompose()
        if (isTimePassed) {
            saveDraft(draftMail)
        }
    }
    function handleAddLine(emoji) {
        const textarea = document.getElementById('body')
        const start = textarea.selectionStart
        const end = textarea.selectionEnd;
        const newBody = draftMail.body.substring(0, start) + emoji + draftMail.body.substring(end)
        setDraftMail(prev => ({ ...prev, body: newBody }))
        // Move cursor to the right of the inserted emoji
        textarea.setSelectionRange(start + emoji.length, start + emoji.length)
        textarea.focus();
    }
    return (
        <div className="compose-modal">
              <div className="compose-header">
            <p>New Message</p>
            {/* <img
                className="Hq aUG"
                id=":yr"
                src="images/cleardot.gif" 
                alt="Pop-out"
                aria-label="Full screen (Shift for pop-out)"
                data-tooltip-delay="800"
                data-tooltip="Full screen (Shift for pop-out)"
            /> */}
            <span className="close-compose" onClick={onCloseCompose}>
                X
            </span>
        </div>
            <form onSubmit={onAddMail} className="compose-form">
                <input type="text"
                    id="to"
                    name="to"
                    placeholder="To"
                    className="compose-input"
                    value={draftMail.to}
                    onChange={handleChange}
                />
                <input type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    className="compose-input"
                    value={draftMail.subject}
                    onChange={handleChange}
                />
                <textarea
                    className="compose-textarea"
                    name="body"
                    id="body"
                    cols="30"
                    rows="10"
                    value={draftMail.body}
                    onChange={handleChange}
                ></textarea>
                <div className="compose-actions">
                    <button className="compose-send-btn">Send</button>
                    <EmojiSelector onAddLine={handleAddLine} />
                </div>
            </form>
        </div>
    )
}