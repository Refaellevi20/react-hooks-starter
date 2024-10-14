const {useState} = React

export function Validate({ name = 'Jojo', onValidate = () => { }, onIncreaseSize, onClose }) {
    const [isSideScreen, setIsSideScreen] = useState(false)

    function handleToggleFullscreen() {
        setIsSideScreen(!isSideScreen)
    }

    function handleSubmit(event) {
        event.preventDefault()
        onValidate()
    }

    function closeModal() {
        setIsModalOpen(false)
      }


    return (

        <section className={`validate-container ${isSideScreen ? 'side-fullscreen ' : ''}`}>
            <div className="header-container">
            <h2 className="email-header">New Message</h2>
            <button className="close-btn" onClick={onClose}>x</button>

           
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">To:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter recipient's email"
                />
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Enter subject"
                />
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here..."
                    rows="10"
                ></textarea>
                <button type="submit" className="compose-send-btn">Send</button>
            </form>
            <button onClick={handleToggleFullscreen} className="side-fullscreen-toggle-btn">
                {isSideScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
            </button>
        </section>
    )
}
