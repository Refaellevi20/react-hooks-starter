const { useState } = React

export function LanguageSwitcher (){
    const [language, setLanguage] = useState('English')
    const [labels, setLabels] = useState({
        sent: 'Sent',
        inbox: 'Inbox',
        all: 'All',
        draft: 'Draft',
        delete: 'Delete',
    })

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleTranslate = () => {
        if (language === 'Hebrew') {
            setLabels({
                sent: 'נשלח',
                inbox: 'תיבת דואר נכנס',
                all: 'הכל',
                draft: 'טיוטה',
                delete: 'מחק',
            })
        } else {
            setLabels({
                sent: 'Sent',
                inbox: 'Inbox',
                all: 'All',
                draft: 'Draft',
                delete: 'Delete',
            })
        }
    }

    return (
        <div>
            <select value={language} onChange={handleLanguageChange}>
                <option value="English">English</option>
                <option value="Hebrew">Hebrew</option>
            </select>
            <button onClick={handleTranslate}>Translate</button>
            <div>
                <p>{labels.sent}</p>
                <p>{labels.inbox}</p>
                <p>{labels.all}</p>
                <p>{labels.draft}</p>
                <p>{labels.delete}</p>
            </div>
        </div>
    )
}