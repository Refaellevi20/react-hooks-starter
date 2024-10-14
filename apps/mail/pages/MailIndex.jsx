// const { useEffect, useRef, useState } = React
// import { mailService } from '../services/mail.service.js' 

// import { Modal } from "../cmps/Modal.jsx"  
// import { Validate } from "../cmps/Validate.jsx" 

// export function MailIndex() {
//     const [mails, setMails] = useState([])
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [visibleBodyId, setVisibleBodyId] = useState(null)
//     const [selectedMail, setSelectedMail] = useState(null)
//     const h1Ref = useRef()

//     useEffect(() => {
//         loadMails()
//     }, [])

//     function loadMails(){
//         mailService.query()
//             .then(fetchedMails => {
//                 setMails(fetchedMails)
//             })
//             .catch(err => {
//                 console.error('Error loading mails:', err)
//             })
//     }
//     function toggleBodyVisibility(mailId) {
//         if (visibleBodyId === mailId) {
//             setVisibleBodyId(null)
//         } else {
//             setVisibleBodyId(mailId)
//         }
//     }

//     function formatDate(date) {
//         const options = { month: 'long', day: 'numeric' }
//         const formattedDate = new Date(date).toLocaleDateString('en-US', options);

//         const day = new Date(date).getDate();
//         const suffix = day % 10 === 1 && day !== 11 ? 'st' :
//                        day % 10 === 2 && day !== 12 ? 'nd' :
//                        day % 10 === 3 && day !== 13 ? 'rd' : 'th';
//                        return `${formattedDate.replace(/\d+/, day + suffix)}`
//     }

//     function openModal() {
//         setSelectedMail(mail)
//         setIsModalOpen(true)
//     }

//     function closeModal() {
//         setIsModalOpen(false)
//         setSelectedMail(null)
//     }

//     return (
//         <section className="home">
//             <h1 ref={h1Ref}>Car's R Us!</h1>
//             <button onClick={openModal}>Open Modal</button>

//             <Modal isOpen={isModalOpen} onClose={closeModal}>
//                 <Validate onClose={closeModal} />
//             </Modal>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>From</th>
//                         <th>Subject</th>
//                         <th>Body</th>
//                         <th>Sent At</th>
//                         {/* <th>Is Read</th> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {mails.map(mail => (
//                         <tr key={mail.id} onClick={() => toggleBodyVisibility(mail.id)} style={{ cursor: 'pointer' }}>
//                             <td>{mail.from}</td>
//                             <td>{mail.subject}</td>
//                             <td>
//                                 {visibleBodyId === mail.id && <span>{mail.body}</span>}
//                             </td>
//                             <td>{formatDate(mail.sentAt)}</td>
//                             {/* <td>{mail.isRead ? 'Yes' : 'No'}</td> */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </section>
//     )
// }
//!
// const { useEffect, useRef, useState } = React
// import { mailService } from "../services/mail.service.js" 

// import { Modal } from "../cmps/Modal.jsx"
// import { Validate } from "../cmps/Validate.jsx"

// export function MailIndex() {
//     const [mails, setMails] = useState([])
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [visibleBodyId, setVisibleBodyId] = useState(null)
//     const [selectedMail, setSelectedMail] = useState(null)
//     const [modalType, setModalType] = useState('')
//     const h1Ref = useRef()

//     useEffect(() => {
//         loadMails()
//     }, [])

//     function loadMails() {
//         mailService.query()
//             .then(fetchedMails => {
//                 setMails(fetchedMails)
//             })
//             .catch(err => {
//                 console.error('Error loading mails:', err)
//             })
//     }
//     function toggleBodyVisibility(mailId) {
//         if (visibleBodyId === mailId) {
//             setVisibleBodyId(null)
//         } else {
//             setVisibleBodyId(mailId)
//         }
//     }

//     function formatDate(date) {
//         const options = { month: 'long', day: 'numeric' }
//         const formattedDate = new Date(date).toLocaleDateString('en-US', options)

//         const day = new Date(date).getDate();
//         const suffix = day % 10 === 1 && day !== 11 ? 'st' :
//             day % 10 === 2 && day !== 12 ? 'nd' :
//                 day % 10 === 3 && day !== 13 ? 'rd' : 'th';
//         return `${formattedDate.replace(/\d+/, day + suffix)}`
//     }

//     function openMailModal(mail) {
//         setSelectedMail(mail)
//         setModalType('mail')
//         setIsModalOpen(true)
//     }

//     function openValidationModal() {
//         setModalType('validate')
//         setIsModalOpen(true)
//     }

//     function closeModal() {
//         setIsModalOpen(false)
//         setSelectedMail(null)
//     }


//     return (
//         <section className="home">
//             <h1 ref={h1Ref}>Car's R Us!</h1>

//             <button onClick={openValidationModal}>Open Modal</button>

//             <Modal isOpen={isModalOpen} onClose={closeModal}>
//                 {modalType === 'validate' ? (
//                     <Validate onClose={closeModal} />
//                 ) : (
//                     selectedMail && (
//                         <>
//                             <h2>{selectedMail.subject}</h2>
//                             <p>{selectedMail.body}</p>
//                         </>
//                     )
//                 )}
//             </Modal>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>From</th>
//                         <th>Subject</th>
//                         <th>Body</th>
//                         <th>Sent At</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {mails.map(mail => (
//                         <tr key={mail.id} onClick={() => openMailModal(mail)} style={{ cursor: 'pointer' }}>
//                             <td>{mail.from}</td>
//                             <td>{mail.subject}</td>
//                             <td>{mail.body}</td>
//                             <td>{formatDate(mail.sentAt)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </section>
//     )
// }


const { useState, useEffect } = React

import { MailFilter } from '../cmps/mainFilter.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx'; 
import { MailList } from '../cmps/MailList.jsx';
import { MailCompose } from '../cmps/mailCompose.jsx';
import { mailService } from '../services/mail.service.js';

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isComposeClicked, setIsComposeClicked] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy, mails])

    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function addMail(newMail) {
        mailService.save(newMail).then((mail) => {
            mails.unshift(mail)
            setMails(mails)
        })
    }

    function onToggleCompose() {
        setIsComposeClicked(!isComposeClicked)
    }

    function setStared(mail) {
        mail.isStared = !mail.isStared
        mailService.save(mail)
    }

    function removeMail(mail) {
        if (mail.status === 'trash') {
            mailService.remove(mail.id)
                .catch((err) => {
                    console.log('Had issues removing', err)
                    showErrorMsg('Could not delete mail, try again please!')
                })
        } else {
            mail.status = 'trash'
            mailService.save(mail)
        }
    }

    function setReadMail(mail) {
        mail.isRead = false
        mailService.save(mail)
    }

    function setToggleRead(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
    }

    function saveDraft(mail) {
        mailService.save(mail)
    }

    return <main className="mail-index-container">
        <MailFilter onSetFilter={onSetFilter} />
        <section className="mail-container">
            <MailFolderList mails={mails}
                onSetFilter={onSetFilter}
                onToggleCompose={onToggleCompose} />
            <MailList mails={mails}
                setStared={setStared}
                removeMail={removeMail}
                onSetFilter={onSetFilter}
                setReadMail={setReadMail}
                setToggleRead={setToggleRead} />
            {isComposeClicked && <MailCompose
                addMail={addMail}
                onToggleCompose={onToggleCompose}
                saveDraft={saveDraft} />}
        </section>
    </main>
}

