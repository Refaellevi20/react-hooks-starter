
import { Modal } from "../cmps/Modal.jsx"
import { Validate } from "../cmps/Validate.jsx" 

const { useRef, useState } = React

export function MailIndex() {
    const [isOpen, setIsOpen] = useState(false)
    const [sizeClass, setSizeClass] = useState('')

    const h1Ref = useRef()
    const imgRef = useRef()

    function onActivate() {
        animateCSS(h1Ref.current, 'rubberBand').then(() => {
            animateCSS(imgRef.current, 'bounceOut', false)
        })
    }

    function onValidate() {
        console.log('Validated!!!')
        setTimeout(() => {
            setIsOpen(false)
        }, 1000)
    }

    function onIncreaseSize() {
        setSizeClass('large')
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <section className="home">
            {/* <button onClick={onActivate}>Activate</button>
            <button onClick={() => setIsOpen(isOpen => !isOpen)} >Toggle Modal</button> */}

            <h1 ref={h1Ref} >Car's R Us!</h1>
            <button onClick={openModal}>Open Modal</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Validate onValidate={onValidate} onIncreaseSize={onIncreaseSize} onClose={closeModal}/>
            </Modal>
            
        </section>
    )
}
