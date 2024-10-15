const { useState, useEffect, useRef } = React

import { eventBusService } from "../services/event-bus.service.js"

// const {showUserMsg} = eventBusService

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef(null)
  const elUserMsg = useRef(null)
  const [isShown, setIsShown] = useState(true)

  useEffect(() => {
    const unsubscribe = eventBusService.on("show-user-msg", (msg) => {
      setMsg(msg)
      if (elUserMsg.current) {
        setIsShown(true)
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(() => {
        onCloseMsg()
      }, 3000)
    })
    return unsubscribe
  }, [])

  function onCloseMsg() {
    setIsShown(false)
    elUserMsg.current = setTimeout(() => {
      setMsg(null)
    }, 500)
  }

  if (!msg) return <span></span>
  return (
    <div
      ref={elUserMsg}
      className={`user-msg ${msg.type} ${isShown ? `shown` : ""}`}>
      <i className='fa-regular fa-square-check'></i>
      {msg.txt}
    </div>
  )
}
