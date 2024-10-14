

export function LoadEmails({ emails }) {
    if (!emails.length) {
        return <div>No emails found.</div>
    }

    return (
        <div>
            <h2>Your Emails</h2>
            <ul>
                {emails.map(email => (
                    <li key={email.id}>
                        <strong>From:</strong> {email.fromEmail} <br />
                        <strong>Subject:</strong> {email.subject} <br />
                        <strong>Body:</strong> {email.body} <br />
                        <strong>Sent At:</strong> {new Date(email.sentAt).toLocaleString()} <br />
                        <strong>Status:</strong> {email.status} <br />
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    )
}
