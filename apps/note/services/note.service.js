// note service

import { storageService } from "../../../services/async-storage.service.js" 
import { storageServices } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
let notesDB = []
_createNotes()

export const noteService = {
    query,
    getById,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    generateId,
    removeColor,
    editColor,
    addColor,
    getNoteEditData,
    createNote
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
      .then(notes => {
        if (filterBy.txt) {
          const regex = new RegExp(filterBy.txt, 'i')
          notes = notes.filter(note => (regex.test(note.info.title) || regex.test(note.info.label) || regex.test(note.info.txt)))
        }
        if (filterBy.noteType) {
          notes = notes.filter(note => (note.type === filterBy.noteType))
        }
  
        console.log(notes)
        return notes
      })
  }

function generateId() {
    return Math.random().toString(36).substr(2, 9)
}

function removeColor(noteId) {
    notesDB = notesDB.filter(note => note.id !== noteId)
    return Promise.resolve()
}

function editColor(updatedNote) {
    const index = notesDB.findIndex(note => note.id === updatedNote.id)
    if (index !== -1) {
        notesDB[index] = updatedNote
    }
    return save(NOTE_KEY, notesDB)
}

function addColor(newNote) {
    newNote.id = generateId()
    notesDB.push(newNote)
    return Promise.resolve()
}


function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function getNoteEditData(note) {
    if (note.type === 'NoteTxt') {
      return { title: note.info.txt, content: '', titleField: 'txt' }
    }
  
    if (['NoteImg', 'NoteVid'].includes(note.type)) {
      return { title: note.info.title, content: note.info.url, titleField: 'title', contentField: 'url' }
    }
  
    if (note.type === 'NoteTodos') {
      return {
        title: note.info.label, content: note.info.todos.map(todo => todo.txt).join(', '),
        titleField: 'title',
        contentField: 'todos'
      }
    }
  
    throw new Error('noteType is unknown')
  
  }
  

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', isPinned = '') {
    return { title, isPinned }
}

function getDefaultFilter() {
    return { txt: '', noteType: '' }
}

function _createNotes() {
    let notes = storageServices.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
      notes = [
        {
            id: 'n101', 
            createdAt: 1112222, 
            type: 'NoteTxt', 
            isPinned: true, 
            style: { 
              backgroundColor: '#FFFFFF' 
            }, 
            info: { 
              txt: 'Fullstack Me Babyyy!' 
            } 
        },
        {
            id: 'n104', 
            createdAt: 1112225, 
            type: 'NoteTxt', 
            isPinned: true, 
            style: { 
              backgroundColor: '#FFFFFF' 
            }, 
            info: { 
              txt: 'Fullstack Me Babyss!' 
            } 
        },
        {
            id: 'n105', 
            createdAt: 1112226, 
            type: 'NoteTxt', 
            isPinned: true, 
            style: { 
              backgroundColor: '#00d' 
            }, 
            info: { 
              txt: 'Fullstack Me Baby!' 
            } 
        },
        {
            id: 'n102', 
            createdAt: 1112223, 
            type: 'NoteImg', 
            isPinned: false, 
            info: { 
              url: 'http://some-img/me', 
              title: 'Bobi and Me' 
            }, 
            style: { 
              backgroundColor: '##FFFFFF' 
            }
        },
        {
            id: 'n103', 
            createdAt: 1112224, 
            type: 'NoteTodos', 
            isPinned: false, 
            info: { 
              title: 'Get my stuff together', 
              todos: [ 
                { txt: 'Driving license', doneAt: null }, 
                { txt: 'Coding power', doneAt: 187111111 } 
              ] 
          }
        }
  
      ]
      storageServices.saveToStorage(NOTE_KEY, notes)
    }
  }
  
  
  function createNote(noteType, textInput, noteData) {
    const backgroundColor = ' #FFFFFF'
    if (noteType === 'NoteTxt') {
      return {
        type: 'NoteTxt',
        isPinned: false,
        info: { txt: textInput },  backgroundColor
      }
    }
  
    if (noteType ===  'NoteImg') {
      return {
        type:  'NoteImg',
        isPinned: false,
        info: {
          url: noteData,
          title: textInput
        },  backgroundColor
      }
    }
  
    if (noteType === 'NoteVid') {
      return {
        type: 'NoteVid',
        isPinned: false,
        info: {
          url: noteData,
          title: textInput
        },  backgroundColor
      }
    }
  
    if (noteType === 'NoteTodos') {
      const todos = noteData.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }))
      return {
        type: 'NoteTodos',
        isPinned: false,
        info: {
          label: textInput, todos
        },  backgroundColor
      }
    }
  
    throw new Error('noteType is unknown')
  }
  
  
  
  


