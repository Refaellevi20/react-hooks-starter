const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
        <img src="assets/img/svg/hours.svg" className="img-logo img-home" />
        </Link>
        <nav>
            <NavLink to="/"><img src="assets/img/home.png" className="img-logo " /></NavLink>
            <NavLink to="/about"><img src="assets/img/about.png" className="img-logo " /></NavLink>
            <NavLink to="/mail"><img src="assets/img/email.png" className="img-logo" /></NavLink>
            <NavLink to="/note"><img src="assets/img/note.png" className="img-logo" /></NavLink>
        </nav>
    </header>
}
