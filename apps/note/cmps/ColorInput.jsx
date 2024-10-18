const { useState,useEffect } = React
export function ColorInput({ note, onSetnoteStyle, backgroundColor }) {

    const colors = [
        '#e9e3d4',
        '#efeff1',
        '#aeccdc',
        '#faafa8',
        '#fff8b8',
        '#b4ddd3',
       ' #e2f6d3' ,
        '#d3bfdb' ,
        '#f39f76'
    ]

    const [selectedColor, setSelectedColor] = useState(backgroundColor || '#ffffff')
    function onSetColor(color) {  
        setSelectedColor(color)
        onSetnoteStyle(color)
    }

    useEffect(() => {
        setSelectedColor(backgroundColor || '#ffffff')
    }, [backgroundColor])


    return (
        <section className="color-input">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${color === backgroundColor ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}> 
                         {color === backgroundColor &&(
                            <div className="color-indicator">✓</div>
                        )}
                        </div>
                ))}
            </div>
        </section >
    )
}