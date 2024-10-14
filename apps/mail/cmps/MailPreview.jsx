
const { Fragment, useState } = React
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';

export function MailPreview({ mail, setStared, removeMail, setReadMail, setToggleRead }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [customTime, setCustomTime] = useState(mail.sentAt)
    const [isEditingTime, setIsEditingTime] = useState(false)

    function getMonthDay() {
        const date = new Date(mail.sentAt)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = date.getDate();
        return `${month} ${day}`;
    }


    function onRemoveMail(ev) {
        ev.stopPropagation()
        removeMail(mail)

    }

    function onToggleRead(ev) {
        ev.stopPropagation()
        setToggleRead(mail)
    }

    function onSetStared(ev) {
        ev.stopPropagation()
        setStared(mail)
    }

    function onEnterMail(ev) {
        ev.stopPropagation()
        setReadMail(mail)
    }

    function handleTimeChange(ev) {
        setCustomTime(ev.target.value)
    }

    function toggleTimeEdit() {
        setIsEditingTime(!isEditingTime)
    }


    return (
        <Fragment>
            <tr 
                onClick={() => setIsExpanded(!isExpanded)} 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
                className={mail.isRead ? "mail-preview read" : "mail-preview"} 
                key={mail.id}
            >
                <td className={mail.isRead ? "mail-sender read" : "mail-sender"}>
                    <span 
                        onClick={onSetStared} 
                        className={mail.isStared ? "material-symbols-outlined icon stared" : "material-symbols-outlined icon"}
                    >
                        star
                    </span> 
                    {mail.from}
                </td>
                
                <td className="mail-content">
                    <span className={mail.isRead ? "mail-subject read" : "mail-subject"}>{mail.subject}</span> 
                    <span className="mail-preview-body"> - {mail.body}</span>
                </td>
                
                <td className="mail-actions">
                    {isHovered ? (
                        <span>
                            <span onClick={(ev) => onRemoveMail(ev)} className="material-symbols-outlined icon">delete</span>
                            <span onClick={(ev) => onToggleRead(ev)} className="material-symbols-outlined icon">
                                {mail.isRead ? 'delete' : ' drafts'}
                            </span>
                        </span>
                    ) : (
                        <span>{getMonthDay(customTime)}</span>
                    )}
                </td>
            </tr>

            <tr hidden={!isExpanded}>
                <td colSpan="3" className="mail-hidden-container">
                    <h2>{mail.subject}</h2>
                    <Link onClick={onEnterMail} to={`/mail/${mail.id}`}>
                        <span className="material-symbols-outlined fullscreen">fullscreen</span>
                    </Link>
                    <div className="flex space-between">
                        <h5>
                            from: {mail.from} 
                            <span className="details-email">{`<${mail.fromEmail}>`}</span>
                        </h5>
                        <h5 className="details-date">
                            {isEditingTime ? (
                                <input 
                                    type="datetime-local" 
                                    value={new Date(customTime).toISOString().slice(0, 16)}
                                    onChange={handleTimeChange}
                                />
                            ) : (
                                <span onClick={toggleTimeEdit} className="material-symbols-outlined clock-icon">schedule</span>
                            )}
                            <span>{utilService.getFormattedDate(customTime)}</span>
                        </h5>
                    </div>
                    <p>{mail.body}</p>
                </td>
            </tr>
        </Fragment>
    )
}