import { NoteTxt } from '../cmps/NoteTxt.jsx';
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteVid } from './NoteVid.jsx'; 
import { NoteEdit } from './NoteEdit.jsx';
import { noteService } from "../services/note.service.js";
import { ColorInput } from './ColorInput.jsx';
const { useState } = React;
const { useNavigate } = ReactRouterDOM



export function NotePreview({ type, note, editNote, removeNote, addNote }) {
  const [editMode, setEditMode] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState(note.color || 'white')
  const navigate = useNavigate()

  function getNoteType(type) {
    switch (type) {
      case 'NoteTxt':
        return <NoteTxt note={note} />

      case 'NoteImg':
        return <NoteImg note={note} />

      case 'NoteTodos':
        return <NoteTodos note={note} />

      case 'NoteVid':
        return <NoteVid note={note} />
    }
  }

  const handleColorChange = (newColor) => {
   
    setSelectedColor(newColor)
    const updatedNote = { ...note, style: { backgroundColor: newColor }  } 
    editNote(updatedNote)
    setShowColorPicker(false)
  }

  

  const handlePinNote = () => {
    const updatedNote = { ...note, isPinned: note.isPinned ? false : true }
    editNote(updatedNote)
  }

  const duplicateNote = () => {
    const duplicateNote = { ...note }
    delete duplicateNote.id
    addNote(duplicateNote)
  }

  const mailNote = () => {
    let body
    const { title, content } = noteService.getNoteEditData(note)
    if (note.type === 'NoteTxt') body = title
    else body = content
    const params = new URLSearchParams({ body })

    navigate('/mail/?' + params.toString())
  }


  return (
    <section className='note-preview' key={note} style={{ backgroundColor:note.style ? note.style.backgroundColor  : 'white' }}>
      {getNoteType(type)}
      
      <div className='note-actions-container'>
        <div className='note-actions'>
          <span onClick={() => removeNote(note.id)} className="material-symbols-outlined ">delete</span>
          <span onClick={duplicateNote} className="material-symbols-outlined">content_copy</span>
          <span onClick={mailNote} className="material-symbols-outlined">mail</span>
          <span onClick={handlePinNote} className={note.isPinned ? "material-symbols-outlined pinned" : "material-symbols-outlined"}>push_pin</span>
          
          <span
            onClick={() => setShowColorPicker(!showColorPicker)} 
            className="material-symbols-outlined icon-btn"
            title="Change color"
          >
            palette
          </span>

          
          {showColorPicker && (
            <div className="color-picker-container">
            <ColorInput 
              note={note} 
              onSetnoteStyle={handleColorChange} 
              backgroundColor={selectedColor} />
                         </div>
          )}

         
          {note.type !== "note-todos" && (
                        <span
                            onClick={() => setEditMode(!editMode)}
                            className="material-symbols-outlined"
                        >
                            edit
                        </span>
                    )}
                    {editMode && (
                        <NoteEdit
                            note={note}
                            editNote={editNote}
                            setEditMode={setEditMode}
                        />
                    )}
        </div>
      </div>
    </section>
  )
}







