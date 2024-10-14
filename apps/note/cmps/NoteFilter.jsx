const { useState, useEffect } = React



export function NoteFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFillter)
    

    const { txt } = filterByToEdit

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }



    return (
        <section className="note-filter">
            <form>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <button>Submit</button>
            </form>
        </section>
    )
}