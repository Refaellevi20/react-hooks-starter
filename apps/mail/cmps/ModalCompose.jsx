const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { EmojiSelector } from "./emojis.jsx"

export function ModalCompose({ addMail, onToggleCompose, saveDraft }) {
    const [draftMail, setDraftMail] = useState(mailService.getEmptyMailToDraft())
    const [isTimePassed, setIsTimePassed] = useState(false)
    const [file, setFile] = useState(null)
    const [mails, setMails] = useState([])
    const [isComposeClicked, setIsComposeClicked] = useState(false)

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
        navigate('/mail')
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

    function onToggleCompose() {
        setIsComposeClicked(!isComposeClicked)
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
            // setFile(file)
            console.log('Selected file:', file)
        }
    }

    function addMail(newMail) {
        mailService.save(newMail).then((mail) => {
            mails.unshift(mail)
            setMails(mails)
        })
    }

    function saveDraft(mail) {
        mailService.save(mail)
            .then(() => {
                console.log('Draft saved successfully')
            }).catch(err => {
                console.error('Error saving draft:', err)
            })
    }


    // {isComposeClicked && <MailCompose
    //     addMail={addMail}
    //     onToggleCompose={onToggleCompose}
    //     saveDraft={saveDraft} />}
    
    return (
        <div className="email-compose-modal">
            <div className="email-compose-header">
                <div className="mobile-compose-container">
                    <button type="button" className="icon-button">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                    <label htmlFor="file-input" className="icon-button">
                        <span className="material-symbols-outlined attach_file">attach_file</span>
                    </label>
                    <input
                        type="file"
                        id="file-input"
                        className="mobile-file-input"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <span
                        className="material-symbols-outlined arrow_forward"
                        onClick={onCloseCompose}
                    >
                        arrow_forward
                    </span>
                </div>
            </div>
            <form onSubmit={onAddMail} className="email-compose-form">
                <div className="email-compose-input-container">
                    <label htmlFor="to">To:</label>
                    <input type="email" id="to" name="to" placeholder="Recipient email" required />
                </div>
                <div className="email-compose-input-container">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" placeholder="Email subject" required />
                </div>
                <div className="email-compose-input-container">
                    <label htmlFor="body"></label>
                    <textarea id="body" name="body" rows="8" placeholder="Compose your message" required></textarea>
                </div>
                <div className="compose-actions">
                    <button type="submit" className="icon-button-send">
                        <span className="material-symbols-outlined send_back">send</span>
                    </button>
                </div>
            </form>
        </div>
    )
}
