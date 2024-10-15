import { noteService } from "../services/note.service.js";

const { useState, useEffect } = React

export function NoteEdit({ note, editNote, setEditMode }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleField, setTitleField] = useState('');
  const [contentField, setContentField] = useState('');

  useEffect(() => {
    const { title, content, titleField, contentField } = noteService.getNoteEditData(note);
    setTitle(title)
    setContent(content)
    setTitleField(titleField)
    setContentField(contentField)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = {
      ...note, info: {
        ...note.info,
        [titleField]: title,
        ...(contentField ? { [contentField]: content } : {})
      }
    }
    editNote(updatedNote);
    setEditMode(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Save</button>
    </form>)
}