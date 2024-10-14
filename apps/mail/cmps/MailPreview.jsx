
// const { Fragment, useState } = React
// const { Link } = ReactRouterDOM

// import { utilService } from "../../../services/util.service" 

// export function MailPreview({ mail, setStared, removeMail, setReadMail, setToggleRead }) {
//     const [isExpanded, setIsExpanded] = useState(false)

//     function onRemoveMail(ev) {
//         ev.stopPropagation()
//         if (confirm('Are you sure you want to delete this email?')) removeMail(mail);
//     }

//     return (
//         <Fragment key={mail.id}>
//             <tr onClick={() => setIsExpanded(!isExpanded)} className={mail.isRead ? "mail-preview read" : "mail-preview"}>
//                 <td className={mail.isRead ? "mail-sender read" : "mail-sender"}>
//                     <span onClick={() => setStared(mail)} className={mail.isStared ? "stared icon" : "icon"}>star</span>
//                     {mail.from}
//                 </td>
//                 <td className="mail-content">
//                     <span className={mail.isRead ? "read" : ""}>{mail.subject}</span>
//                     <span> - {mail.body}</span>
//                 </td>
//                 <td>{utilService.getFormattedDay(mail.sentAt)} {utilService.getMonthName(mail.sentAt)}</td>
//                 <td>
//                     <span onClick={onRemoveMail} className="icon">delete</span>
//                     <span onClick={() => setToggleRead(mail)} className="icon">{mail.isRead ? 'mail' : 'drafts'}</span>
//                 </td>
//             </tr>
//             {isExpanded && (
//                 <tr>
//                     <td colSpan="3" className="mail-hidden-container expanded">
//                         <h2>{mail.subject}</h2>
//                         <Link to={`/mail/${mail.id}`}>Full Screen</Link>
//                     </td>
//                 </tr>
//             )}
//         </Fragment>
//     )
// }
