const { useState,useRef } = React
import { mailService } from "../services/mail.service.js"
import { EmojiSelector } from "./emojis.jsx"

export function MailCompose({ addMail, onToggleCompose, saveDraft, mailsSent }) {

    const [draftMail, setDraftMail] = useState(mailService.getEmptyMailToDraft())
    const [isTimePassed, setIsTimePassed] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const modalRef = useRef(null);



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
        textarea.focus()
    }

   function toggleFullScreen (){
        if (!document.fullscreenElement) {
            modalRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen()
        }
    }

    function toggleSize(){
        setIsExpanded(prev => !prev)
    }
    
    return (
        <div className={`compose-modal ${isExpanded ? 'expanded' : ''}`} ref={modalRef}>
            <div className="compose-header">
                <p>New Message</p>
                <button onClick={toggleSize} className="fullscreen-btn">
                <span className="material-symbols-outlined">
                    {isExpanded ? <i className="fa-solid fa-down-left-and-up-right-to-center"></i> : <i className="fa-solid fa-up-right-and-down-left-from-center"></i>}
                </span>
            </button>
                <span className="close-compose" onClick={onCloseCompose}>
                    <strong style={{ fontSize: '24px', lineHeight: '1' }}>X</strong>
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