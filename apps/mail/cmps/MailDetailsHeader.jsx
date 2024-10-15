
const { Link } = ReactRouterDOM

export function MailDetailsHeader({ mail, onRemoveMail }) {
    return (
        <section className="mail-details-header">
            <Link to={`/mail`} aria-label="Back to mail list">
                <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <span
                className="material-symbols-outlined delete-icon"
                onClick={() => onRemoveMail(mail.id)}
                aria-label="Delete mail"
                role="button"
                tabIndex="0"
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') onRemoveMail(mail.id)
                }}
            >
                delete
            </span>
        </section>
    )
}