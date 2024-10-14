const { useState } = React
import { mailService } from "../services/mail.service.js" 

export function MailCompose({ addMail, onToggleCompose,  saveDraft }) {

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
        setDraftMail({...draftMail, [field]: value})
        setTimeout(() =>{
            setIsTimePassed(true)
        },5000)

    }

    function onCloseCompose(){
        onToggleCompose()
        if(isTimePassed){
            saveDraft(draftMail)
        }

    }

    return <div className="compose-modal animate__animated animate__slideInUp">
        <div className="compose-header"><p>New Messege</p><span className="close-compose" onClick={onCloseCompose}>X</span></div>
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
                >

            </textarea>
            <button className="compose-send-btn">Send</button>
        </form>

    </div>
}