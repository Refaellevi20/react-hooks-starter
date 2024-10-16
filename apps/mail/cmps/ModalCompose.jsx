const { useState, useEffect } = React
const { useNavigate,useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { EmojiSelector } from "./emojis.jsx"

export function ModalCompose({ addMail, onToggleCompose, saveDraft }) {
    const [draftMail, setDraftMail] = useState(mailService.getEmptyMailToDraft())
    const [isTimePassed, setIsTimePassed] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    // const { send  } = useParams()

    // useEffect(() => {
    //     const { send  } = useParams()
    //     if (send ) {
    //         const mailDetails = mailService.getMailById(send )
    //         if (mailDetails) {
    //             setDraftMail(mailDetails)
    //         } else {
    //             console.error(`Mail with ID ${send } not found.`)
    //         }
    //     }
    // }, [send])

    

    function onAddMail(ev) {
        ev.preventDefault()
        const { target } = ev
        const newMail = createNewMail(target)

        if (file) {
            newMail.file = file
        }

        addMail(newMail)
        onCloseCompose()
        navigate('send')
    }

    function createNewMail(target) {
        const newMail = mailService.getEmptyMailToSend()
        newMail.to = target.to.value
        newMail.subject = target.subject.value
        newMail.body = target.body.value
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
        navigate('/mail')
    }

    function handleAddLine(emoji) {
        const textarea = document.getElementById('body')
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newBody = draftMail.body.substring(0, start) + emoji + draftMail.body.substring(end)
        setDraftMail(prev => ({ ...prev, body: newBody }))
        textarea.setSelectionRange(start + emoji.length, start + emoji.length)
        textarea.focus()
    }

    function handleFileChange(event) {
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            console.log('Selected file:', file)
        }
    }

    return (
        <div className="email-compose-modal">
            <div className="email-compose-header">
                <div className="possibilities-actions1">
                    <button type="button" className="possibilities-send-btn1">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div className="compose-actions1">
                    <button type="submit" className="compose-send-btn1">
                        <span className="material-symbols-outlined send_back">send</span>
                    </button>
                </div>
                <div className="mobile-attachment-container">
                    <label htmlFor="file-input" className="mobile-attachment-label">
                        <span className="material-symbols-outlined">attach_file</span>
                    </label>
                    <input
                        type="file"
                        id="file-input"
                        className="mobile-file-input"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <span className="material-symbols-outlined arrow_forward" onClick={onCloseCompose} >arrow_forward</span>
            </div>

            <form onSubmit={onAddMail} className="email-compose-form">
                <div className="email-compose-input-container">
                    <label htmlFor="from" className="input-label-from">From:</label>
                    <input
                        type="text"
                        id="from"
                        name="from"
                        placeholder="Your Name or Email"
                        className="email-compose-input"
                        value={draftMail.from}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="email-compose-input-container">
                    <label htmlFor="to" className="input-label-to">To:</label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        placeholder="To"
                        className="email-compose-input"
                        value={draftMail.to}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="email-compose-input-container">
                    <label htmlFor="subject" className="input-label-subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        className="email-compose-input"
                        value={draftMail.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="email-compose-input-container">
                    <label htmlFor="body" className="input-label-body"></label>
                    <textarea
                        className="email-compose-textarea"
                        name="body"
                        id="body"
                        rows="8"
                        placeholder="Compose email"
                        value={draftMail.body}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
            </form>
        </div>
    )
}
