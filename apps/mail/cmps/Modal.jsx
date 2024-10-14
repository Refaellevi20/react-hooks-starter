const { Fragment } = React

export function Modal({ children, isOpen = false }) {

    if (!isOpen) return null
    return (
        <Fragment>      
                {children}
        </Fragment>
    )
}


