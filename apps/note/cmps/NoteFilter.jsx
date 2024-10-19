import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteFilter({ onSetFilter, noResults  }) {
  const [FilterByEdit, setFilterByEdit] = useState(noteService.getDefaultFilter)
  const [activeFilter, setActiveFilter] = useState('')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  

  function handleTypeChange(ev) {
    const { value } = ev.target
    setFilterByEdit((prevFilter) => ({
      ...prevFilter,
      txt: value
    }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(FilterByEdit)
  }

  function onChangeType( type ) {
    setActiveFilter(type)
    onSetFilter({ ...FilterByEdit, noteType: type })
  }
  

  function toggleSidebar() {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }


  return ( 
  <section className="note-filter">
     {/* Search bar */}
    <form className="text-filter-form" onSubmit={onSubmitFilter}>
    <div className="input-wrapper">
    <span className="material-symbols-outlined">search</span>
      <input 
      className="input-filter-note" 
      type="text" 
      id="txt"
      name="txt"
      placeholder="Search"
      onChange={handleTypeChange}
      value={FilterByEdit.txt} 
      />
      </div>
    </form>
{/* Sidebar for note types */}
<div className={`side-bar-container-wrapper ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
    <span className="material-symbols-outlined" onClick={toggleSidebar}>menu</span>
    <ul className="side-bar-container-note clean-list" onChange={onChangeType}>
    <li
    onClick={() => onChangeType('')}
            className={activeFilter === '' ? 'active' : ''}
          >
           <span className="material-symbols-outlined">note</span>
           {!isSidebarCollapsed && <span className="side-bar-text">Notes</span>}
          </li>
          <li
            onClick={() => onChangeType('NoteTxt')}
            className={activeFilter === 'NoteTxt' ? 'active' : ''}
          >
            <span className="material-symbols-outlined">label</span>
            {!isSidebarCollapsed && <span className="side-bar-text">Reminders</span>}
          </li>
          <li
            onClick={() => onChangeType('NoteImg')}
            className={activeFilter === 'NoteImg' ? 'active' : ''}
          >
            <span className="material-symbols-outlined">photo</span> 
            {!isSidebarCollapsed && <span className="side-bar-text">Photos</span>}
          </li>
          <li
            onClick={() => onChangeType('NoteVid')}
            className={activeFilter === 'NoteVid' ? 'active' : ''}
          >
            <span className="material-symbols-outlined">movie</span>
            <span className="side-bar-text">Videos</span> 
          </li>
          <li
            onClick={() => onChangeType('NoteTodos')}
            className={activeFilter === 'NoteTodos' ? 'active' : ''}
          >
            <span className="material-symbols-outlined">label</span> 
            {!isSidebarCollapsed && <span className="side-bar-text">Todos</span>}
          </li>
    </ul>
    </div>
    {noResults && <p className="no-results-message">No results found</p>}
    </section>
  )
}


