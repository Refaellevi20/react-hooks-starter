import { noteService } from "../services/note.service.js"

export function NoteTodos({ note }) {
  const todos = note.info.todos
  return (
    <div className="note-todos" >
    <h4>{note.info.title}</h4>
    <ul>
      {todos.map((todo, idx) => <li key={idx}>
        {todo.txt}
      </li>
      )}
    </ul>

  </div>

  )
  
}
