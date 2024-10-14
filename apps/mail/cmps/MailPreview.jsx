
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
            {/* Main Mail Row */}
            <tr
                onClick={() => setIsExpanded(!isExpanded)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={mail.isRead ? "mail-preview read" : "mail-preview"}
                key={mail.id}
            >
                {/* Sender and Star */}
                <td className={mail.isRead ? "mail-sender read" : "mail-sender"}>
                    <span
                        onClick={(ev) => { ev.stopPropagation(); onSetStared(); }}
                        className={mail.isStared ? "material-symbols-outlined icon stared" : "material-symbols-outlined icon"}
                    >
                        star
                    </span>
                    {mail.from}
                </td>

                {/* Subject and Body Preview */}
                <td className="mail-content">
                    <span className={mail.isRead ? "mail-subject read" : "mail-subject"}>{mail.subject}</span>
                    <LongTxt txt={mail.body} length={20} />
                </td>

                {/* Date or Mail Actions */}
                <td className="mail-actions">
                    {isHovered ? (
                        <span className="mail-actions-container">
                            <span onClick={(ev) => { ev.stopPropagation(); onRemoveMail(ev); }} className="material-symbols-outlined icon">delete</span>
                            <span onClick={(ev) => { ev.stopPropagation(); onToggleRead(ev); }} className="material-symbols-outlined icon">
                                {mail.isRead ? 'mark_as_unread' : 'drafts'}
                            </span>
                            {isEditingTime ? (
                                <input
                                    type="datetime-local"
                                    value={new Date(customTime).toISOString().slice(0, 16)}
                                    onClick={(ev) => ev.stopPropagation()} // Prevent click propagation
                                    onChange={handleTimeChange}
                                />
                            ) : (
                                <span onClick={(ev) => { ev.stopPropagation(); toggleTimeEdit(); }} className="material-symbols-outlined clock-icon">schedule</span>
                            )}
                        </span>
                    ) : (
                        <span>{getMonthDay(customTime)}</span>
                    )}
                </td>
            </tr>

            {/* Expanded Mail Content */}
            <tr hidden={!isExpanded}>
                <td colSpan="3" className="mail-hidden-container">
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
                </td>
            </tr>
        </Fragment>
    )
}