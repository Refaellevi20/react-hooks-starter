const { useEffect, useRef, useState } = React
import { mailService } from '../services/mail.service.js' 
import { LoadEmails } from '../cmps/loadEmails.jsx' 

import { Modal } from "../cmps/Modal.jsx"  
import { Validate } from "../cmps/Validate.jsx" 

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const h1Ref = useRef()

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails(){
        mailService.query()
            .then(fetchedMails => {
                setMails(fetchedMails)
            })
            .catch(err => {
                console.error('Error loading mails:', err)
            })
    }

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <section className="home">
            <h1 ref={h1Ref}>Car's R Us!</h1>
            <button onClick={openModal}>Open Modal</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Validate onClose={closeModal} />
            </Modal>

            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>From</th>
                        <th>Status</th>
                        <th>Sent At</th>
                        <th>Is Read</th>
                    </tr>
                </thead>
                <tbody>
                    {mails.map(mail => (
                        <tr key={mail.id}>
                            <td>{mail.subject}</td>
                            <td>{mail.from}</td>
                            <td>{mail.status}</td>
                            <td>{new Date(mail.sentAt).toLocaleString()}</td>
                            <td>{mail.isRead ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
