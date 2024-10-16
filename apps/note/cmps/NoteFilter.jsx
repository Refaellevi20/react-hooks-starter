import { noteService } from "../services/note.service.js";
const { useState } = React;

export function NoteFilter({ onSetFilter }) {
  const [FilterByEdit, setFilterByEdit] = useState(noteService.getDefaultFilter)
  

  function handleTypeChange(ev) {
    const { value } = ev.target
    setFilterByEdit((prevFilter) => {
      return { ...prevFilter, txt: value }
    })
    console.log(FilterByEdit)
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(FilterByEdit)
  }

  function onChangeType({ target }) {
    // console.log(FilterByEdit)
    onSetFilter({ ...FilterByEdit, noteType: target.value })
  }


  return (
  <section className="note-filter">
    <form className="text-filter-form" onSubmit={onSubmitFilter}>
      <input className="input-filter" type="text" id="txt"
        name="txt"
        placeholder="Please text to filter "
        onChange={handleTypeChange}
        value={FilterByEdit.txt} />
      <button className="filterBtn" type="submit"><span className="material-symbols-outlined">filter_list</span></button>
    </form>

    <select className="side-bar-container" onChange={onChangeType}>
      <option value=''>All</option>
      <option value='NoteTxt'>Text</option>
      <option value='NoteImg'>Image</option>
      <option value='NoteVid'>Video</option>
      <option value='NoteTodos'> Todos</option>
    </select>
  </section>
  )
}