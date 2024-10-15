
export function ColorInput({ note, onSetnoteStyle, backgroundColor }) {

    const colors = [
        '#e9e3d4',
        '##efeff1',
        '#aeccdc',
        '#faafa8',
        '#fff8b8',
        '#b4ddd3',
       ' #e2f6d3' ,
        '#d3bfdb' ,
        '#aeccdc',
        '#f39f76'
    ]

    function onSetColor(color) {
        const noteStyle = { backgroundColor: color }
        onSetnoteStyle(noteStyle)
    }

    return (
        <section className="color-input">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${color === backgroundColor ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    ></div>
                ))}
            </div>
        </section >
    )
}