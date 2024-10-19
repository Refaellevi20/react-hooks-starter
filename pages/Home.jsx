
const { Link, NavLink } = ReactRouterDOM
export function Home() {
    return (
        <section className="home">
            <h1>Welcome to the Notes & Missbook & Email Application!</h1>
            <p className="intro-text">
                Manage your notes, emails, and appointments easily!
            </p>
            <div className="icon-container">
                <NavLink onClick={() => setIsClicked(false)} to="/book">
                    <img src="assets/img/svg/book.svg" className="img-logo" alt="Book" />
                </NavLink>
                <NavLink onClick={() => setIsClicked(false)} to="/mail">
                    <img src="assets/img/email.png" className="img-logo" alt="Mail" />
                </NavLink>
                <NavLink onClick={() => setIsClicked(false)} to="/note">
                    <img src="assets/img/note.png" className="img-logo" alt="Note" />
                </NavLink>
            </div>
            <ul className="features-list">
                <li><strong>Notes:</strong> Create, edit, and delete notes to stay organized.</li>
                <li><strong>Email:</strong> Send and receive emails from within the app.</li>
                <li><strong>Missbook:</strong> Organize appointments and tasks effortlessly.</li>
            </ul>

        </section>
    )
}
