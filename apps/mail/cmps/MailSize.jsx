
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.jsx"

export function MailSize({ mails }) {
    const [totalSize, setTotalSize] = useState(0)

    useEffect(() => {
        console.log('Calculating total size for mails:', mails)
        calculateTotalSize()
    }, [mails])

    function calculateTotalSize() {
        let totalBytes = mails.reduce((acc, mail) => {
            const size = typeof mail.size === 'number' ? mail.size : parseSize(mail.Bytes || '0')
            return acc + (size || 0)
        }, 0)
        setTotalSize(formatBytes(totalBytes))
    }

    function parseSize(sizeStr) {
        const sizeMap = {
            Bytes: 1,
            KB: 1024,
            MB: 1024 ** 2,
            GB: 1024 ** 3,
        }
        const match = sizeStr.match(/(\d+(\.\d+)?)([A-Za-z]+)/)
        if (!match) return 0
        const [, size, , unit] = match
        return parseFloat(size) * (sizeMap[unit.toUpperCase()] || 1)
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    function getSizeTotal() {
        mailService.getSize().then((size) => Size(size + '%'))
    }
    

    return (
        <div className="mail-size">
            {/* <span>Total Email Size: {totalSize}</span> */}
            <div className="persent-bar-container"><div className="persent-bar" style={{ width: `${totalSize}` }}>{totalSize}</div></div>

        </div>
    )
}

