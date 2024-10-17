const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MainFilter({ onSetFilter, toggleIconsOnly }) {
    // const [showIconsOnly, setShowIconsOnly] = useState(false)

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


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



    // function toggleIconsOnly  (){
    //     setShowIconsOnly(prevState => !prevState)
    // }

    return (
        <section className="mail-filter">

            {/* <onlyIcons /> */}
            <div
                className="hamburger-menu"
                aria-expanded="true"
                aria-label="Main menu"
                role="button"
                tabIndex="0"
                onClick={toggleIconsOnly}
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
        </section>
    )
}