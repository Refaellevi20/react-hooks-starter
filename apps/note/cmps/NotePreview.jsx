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
    // console.log("NotePreview note:", note);
  
  const [editMode, setEditMode] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const navigate = useNavigate();

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

  const handleColorChange = (e, note) => {
    const color = e.target.value;
    const updatedNote = { ...note, color }
    editNote(updatedNote)
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
    const { title, content } = noteService.getNoteEditData(note);
    if (note.type === 'NoteTxt') body = title
    else body = content
    const params = new URLSearchParams({ body });

    navigate('/mail/?' + params.toString())
  }


  return (
    <section className='note-preview' style={{ backgroundColor: note.color ? note.color : 'white' }}>
      {getNoteType(type)}
      <div className='note-actions-container'>
        <div className='note-actions'>
          <span onClick={() => removeNote(note.id)} className="material-symbols-outlined ">delete</span>
          <span onClick={duplicateNote} className="material-symbols-outlined">content_copy</span>
          <span onClick={mailNote} className="material-symbols-outlined">mail</span>
          <span onClick={handlePinNote} className={note.isPinned ? "material-symbols-outlined pinned" : "material-symbols-outlined"}>push_pin</span>
          <label htmlFor={"color" + note.id}><span className="material-symbols-outlined">palette</span></label>
          <input style={{ display: 'none' }} onChange={(e) => handleColorChange(e, note)} type="color" name="color" id={"color" + note.id} />
          {note.type !== "note-todos" ? <span onClick={() => setEditMode(prev => !prev)} className="material-symbols-outlined">edit</span> : null}
          {editMode ? <NoteEdit note={note} editNote={editNote} setEditMode={setEditMode} /> : null}
        </div>
      </div>
    </section>
  )
}







