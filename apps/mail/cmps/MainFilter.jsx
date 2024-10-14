const { useState, useEffect } = React

// import {img} ./
// import img from './apps/cmps/img'

import { mailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // const [language, setLanguage] = useState('English')
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    // const [labels, setLabels] = useState({
    //     sent: 'Sent',
    //     inbox: 'Inbox',
    //     all: 'All',
    //     draft: 'Draft',
    //     delete: 'Delete',
    // })

    useEffect(() => {
        console.log(filterBy)
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function handleMenuToggle() {
        setIsMenuOpen(prevState => !prevState)
    }


    // function handleLanguageChange(ev) {
    //     setLanguage(ev.target.value)
    // }

    // const handleTranslate = () => {
    //     switch (language) {
    //         case 'Hebrew':
    //             setLabels({
    //                 sent: 'נשלח',
    //                 inbox: 'תיבת דואר נכנס',
    //                 all: 'הכל',
    //                 draft: 'טיוטה',
    //                 delete: 'מחק',
    //             });
    //             break;
    //         case 'Spanish':
    //             setLabels({
    //                 sent: 'Enviado',
    //                 inbox: 'Bandeja de entrada',
    //                 all: 'Todos',
    //                 draft: 'Borrador',
    //                 delete: 'Eliminar',
    //             });
    //             break;
    //         case 'French':
    //             setLabels({
    //                 sent: 'Envoyé',
    //                 inbox: 'Boîte de réception',
    //                 all: 'Tous',
    //                 draft: 'Brouillon',
    //                 delete: 'Supprimer',
    //             });
    //             break;
    //         case 'German':
    //             setLabels({
    //                 sent: 'Gesendet',
    //                 inbox: 'Posteingang',
    //                 all: 'Alle',
    //                 draft: 'Entwurf',
    //                 delete: 'Löschen',
    //             });
    //             break;
    //         case 'Italian':
    //             setLabels({
    //                 sent: 'Inviato',
    //                 inbox: 'Posta in arrivo',
    //                 all: 'Tutti',
    //                 draft: 'Bozza',
    //                 delete: 'Elimina',
    //             });
    //             break;
    //         default:
    //             setLabels({
    //                 sent: 'Sent',
    //                 inbox: 'Inbox',
    //                 all: 'All',
    //                 draft: 'Draft',
    //                 delete: 'Delete',
    //             })
    //             break;
    //     }
    // }

    return (
        <section className="mail-filter">


            <div
                className="hamburger-menu"
                aria-expanded="true"
                aria-label="Main menu"
                role="button"
                tabIndex="0"
                onClick={handleMenuToggle}
            >
                <span className="material-symbols-outlined">menu</span>
            </div>
            <img
                className="gmail-logo"
                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
                srcSet="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png 2x"
                alt="Gmail Logo"
                aria-hidden="true"
                role="presentation"
                style={{ width: '109px', height: '40px' }}
            />
            <div className="filter-container">
                <span className="material-symbols-outlined">search</span>
                <form className="filter-form">
                    <input
                        type="text"
                        id="txt"
                        name="txt"
                        className="search-input"
                        placeholder="Search mail"
                        value={filterBy.txt}
                        onChange={handleChange}
                    />
                </form>
            </div>
            {/* <select value={language} onChange={handleLanguageChange}>
                <option value="English">English</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
            </select>
            <button onClick={handleTranslate}>Translate</button> */}

        </section>
    )
}