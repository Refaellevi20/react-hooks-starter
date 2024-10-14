const { useState, useEffect } = React



const PAGE_SIZE = 20
let gEmojiPageIdx = 0
let gEmojis = [] 
//* Array to hold emojis




//* Create emojis
function _createEmojis() {
    for (let i = 128512; i < 128591; i++) {
        gEmojis.push(String.fromCodePoint(i))
    }
    for (let i = 129296; i < 129356; i++) {
        gEmojis.push(String.fromCodePoint(i))
    }
}

//* Get the current page of emojis
function getEmojis() {
    let startIdx = gEmojiPageIdx * PAGE_SIZE
    return gEmojis.slice(startIdx, startIdx + PAGE_SIZE)
}

//* EmojiSelector component
export function EmojiSelector({ onAddLine }) {
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        _createEmojis() 
    }, [])

    //* Render emojis
    function renderEmojis() {
        const emojis = getEmojis()
        return emojis.map((emoji) => (
            <button 
                key={emoji} 
                onClick={(ev) => onEmojiClick(ev, emoji)} 
                className="emoji-item"
            >
                {emoji}
            </button>
        ))
    }

    function onEmojiClick(ev, emoji) {
        ev.stopPropagation()
        onAddLine(emoji)
        setIsOpen(false)
    }

    //* Toggle emoji
    function onEmojiSelect() {
        setIsOpen((prev) => !prev)
    }

    //* Handle emoji click and prevent event 
    function onEmojiClick(ev, emoji) {
        ev.stopPropagation()
        onAddLine(emoji)
        setIsOpen(false)
         //* Close emoji picker after selection
    }

    //* Handle next page click
    function onNextPage(ev) {
        ev.stopPropagation()
        nextPage()
        setIsOpen(true)
         //* Keep the emoji selector open
    }

    //* Handle previous page click
    function onPrevPage(ev) {
        ev.stopPropagation()
        prevPage()
        setIsOpen(true)
         //* Keep the emoji selector open
    }

    //* Get the next page of emojis
    function nextPage() {
        gEmojiPageIdx++
        if (gEmojiPageIdx * PAGE_SIZE >= gEmojis.length) {
            gEmojiPageIdx = 0 
            //* Loop back to first page
        }
    }

    //* Get the previous page of emojis
    function prevPage() {
        gEmojiPageIdx--
        if (gEmojiPageIdx < 0) {
            gEmojiPageIdx = Math.floor(gEmojis.length / PAGE_SIZE) - 1
        }
    }

    return (
        <div className="emoji-select" onClick={onEmojiSelect}>
            <span className="emoji-btn" role="img" aria-label="emoji">😁</span>
            {isOpen && (
                <div className="module-wrapper">
                    <div className="emojis-module grid">
                        {renderEmojis()}
                    </div>
                    <div className="module-pages flex space-between">
                        <button onClick={onPrevPage} className="prev-page">
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button onClick={onNextPage} className="next-page">
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
