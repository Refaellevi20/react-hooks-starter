const { useState } = React
import { MainFilter } from './MainFilter.jsx'; 
import { MailFolderList } from './MailFolderList.jsx'; 

export function onlyIcons() {
    const [showIconsOnly, setShowIconsOnly] = useState(false)

    function toggleIconsOnly() {
        setShowIconsOnly(prevState => !prevState)
    }

    return (
        <div>
            <MainFilter toggleIconsOnly={toggleIconsOnly} />
            <MailFolderList showIconsOnly={showIconsOnly} />
        </div>
    )
}