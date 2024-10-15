

const { Link, NavLink } = ReactRouterDOM
const { useEffect, useState } = React
import { mailService } from "../apps/mail/services/mail.service.js";

export function AppHeader() {


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        mailService.getMails().then(() => {
            setLoading(false)
        })
    }, [])

    return <header className="app-header">
        <Link to="/">
        <img src="assets/img/svg/hours.svg" className="img-logo img-home" />
        </Link>
        <nav>
            <NavLink to="/"><img src="assets/img/home.png" className="img-logo " /></NavLink>
            <NavLink to="/about"><img src="assets/img/about.png" className="img-logo " /></NavLink>
            <NavLink to="/mail">
                    {loading ? (
                        <div className="loading-spinner"></div> 
                    ) : (
                        <img src="assets/img/email.png" className="img-logo" alt="Mail" /> // Show email icon when not loading
                    )}
                </NavLink>
            <NavLink to="/note"><img src="assets/img/note.png" className="img-logo" /></NavLink>
        </nav>
    </header>
    }


{/* <NavLink to="/mail"><img src="assets/img/email.png" className="img-logo" /></NavLink> */}
