
const { Fragment, useState } = React
const { Link } = ReactRouterDOM
import { LongTxt } from './LongTxt.jsx';

import { utilService } from '../../../services/util.service.js'; 

export function MailPreview({ mail, setStared, removeMail, setReadMail, setToggleRead }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [customTime, setCustomTime] = useState(mail.sentAt)
    const [isEditingTime, setIsEditingTime] = useState(false)

    function getMonthDay() {
        const date = new Date(mail.sentAt)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()]
        const day = date.getDate()
        return `${month} ${day}`
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
            <div className={`mail-preview ${mail.isRead ? "read" : ""}`}
                onClick={() => setIsExpanded(!isExpanded)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                <div className="mail-row">
                    {/* sender and Star */}
                    <div className={`mail-sender ${mail.isRead ? "read" : ""}`}>
                        <span onClick={onSetStared}
                            className={`material-symbols-outlined icon ${mail.isStared ? "stared" : ""}`}>
                            star
                        </span>
                        {mail.from}
                    </div>

                    {/* subject and Body Preview */}
                    <div className="mail-content">
                        <span className={`mail-subject ${mail.isRead ? "read" : ""}`}>{mail.subject}</span>
                        {/* Preview of the body */}
                        <span className="mail-body-preview">
                            {isExpanded ? mail.body : mail.body.length > 1000 ? `- ${mail.body.substring(0, 40)}...` : `${mail.body}...`}
                        </span>
                    </div>

                    {/* date or Mail Actions */}
                    <div className="mail-actions">
                        {isHovered ? (
                            <div className="mail-actions-container">
                                <span onClick={onRemoveMail} className="material-symbols-outlined icon">delete</span>
                                <span onClick={onToggleRead} className="material-symbols-outlined icon">
                                    {mail.isRead ? 'mail' : 'drafts'}
                                </span>
                                {isEditingTime ? (
                                    <input
                                        type="datetime-local"
                                        value={new Date(customTime).toISOString().slice(0, 16)}
                                        onClick={(ev) => ev.stopPropagation()}
                                        onChange={handleTimeChange}
                                    />
                                ) : (
                                    <span onClick={(ev) => { ev.stopPropagation(); toggleTimeEdit(); }}
                                        className="material-symbols-outlined clock-icon">schedule</span>
                                )}
                            </div>
                        ) : (
                            <span className="mail-date">{getMonthDay()}</span>
                        )}
                    </div>
                </div>

                {/* expanded Mail Content */}
                {isExpanded && (
                    <div className="mail-hidden-container">
                        <h2>{mail.subject}</h2>
                        <Link onClick={onEnterMail} to={`/mail/${mail.id}`} aria-label={`View mail ${mail.id}`}>
                            <span className="material-symbols-outlined fullscreen">fullscreen</span>
                        </Link>
                        <div className="flex space-between">
                            <h5>
                                From: {mail.from}
                                <span className="details-email">{`<${mail.fromEmail}>`}</span>
                            </h5>
                            <h5 className="details-date">
                                <span>{utilService.getFormattedDate(customTime)}</span>
                            </h5>
                        </div>
                        <p>{mail.body}</p>
                    </div>
                )}
            </div>
        </Fragment>
    )
}