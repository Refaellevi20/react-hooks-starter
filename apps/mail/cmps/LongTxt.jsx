const { useState } = React


export function LongTxt({ txt, length = 30 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    // function toggleText  (){
    //     setIsExpanded(!isExpanded)
    // }

    return (
        <div>
            <p>
                {isExpanded ? txt : `${txt.substring(0, length)}...`}
                {/* <button onClick={toggleText} className="read-more-btn"> */}
                    {/* {isExpanded ? 'Read Less' : 'Read More'}
                </button> */}
            </p>
        </div>
    )
}