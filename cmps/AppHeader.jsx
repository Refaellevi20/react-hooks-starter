const { Link, NavLink } = ReactRouterDOM
const { useState} = React
export function AppHeader() {
    const [isClicked, setIsClicked] = useState(false)

    return (
        <header className="app-header">
            <Link to="/">
                <img src="assets/img/svg/hours.svg" className="img-logo img-home" alt="Logo" />
            </Link>
            <nav>
                <span 
                    onClick={() => setIsClicked(!isClicked)} 
                    className="material-symbols-outlined menu"
                >
                    menu
                </span>
                {isClicked && (
                    <div className="header-modal">
                        <NavLink onClick={() => setIsClicked(false)} to="/">
                            <img src="assets/img/home.png" className="img-logo" alt="Home" />
                        </NavLink>
                        <NavLink onClick={() => setIsClicked(false)} to="/book">
                            <img src="assets/img/books.png" className="img-logo" alt="Book" />
                        </NavLink>
                        <NavLink onClick={() => setIsClicked(false)} to="/mail">
                            <img src="assets/img/email.png" className="img-logo" alt="Mail" />
                        </NavLink>
                        <NavLink onClick={() => setIsClicked(false)} to="/note">
                            <img src="assets/img/note.png" className="img-logo" alt="Note" />
                        </NavLink>
                    </div>
                )}
            </nav>
        </header>
    )
}