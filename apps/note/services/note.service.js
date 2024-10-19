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
              backgroundColor: '#e9e3d4'
            }, 
            info: { 
              txt: 'The only way to do great work is to love what you do.” - Steve Jobs' 
            } 
        }, 
        {
          id: 'n109', 
          createdAt: 1112222, 
          type: 'NoteTxt', 
          isPinned: true, 
          style: { 
            backgroundColor: '#e9e3d4'
          }, 
          info: { 
            txt: 'Hope is the only thing stronger than fear.” - President Snow' 
          } 
      },
        {
            id: 'n104', 
            createdAt: 1112225, 
            type: 'NoteTxt', 
            isPinned: true, 
            style: { 
              backgroundColor:  '#efeff1' 
            }, 
            info: { 
              txt: 'Don\'t forget to schedule dentist appointment for next Monday!'
            } 
        },
        {
          id: 'n110', 
          createdAt: 1112225, 
          type: 'NoteTxt', 
          isPinned: true, 
          style: { 
            backgroundColor:  '#efeff1' 
          }, 
          info: { 
            txt: 'Don\'t forget to go to the library on Tuesday!'
          } 
      },
        {
            id: 'n105', 
            createdAt: 1112226, 
            type:  'NoteImg', 
            isPinned: true, 
            style: { 
              backgroundColor: '#efeff1' 
            }, 
            info: { 
              url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkU70BfA_n2W7nPgy2knY3TiSsYhuEuir59w&s', 
              title: 'Sunset at Santorini' 
          }
        },
        {
          id: 'n111', 
          createdAt: 1112226, 
          type:  'NoteImg', 
          isPinned: true, 
          style: { 
            backgroundColor: '#efeff1' 
          }, 
          info: { 
            url: 'https://www.state.gov/wp-content/uploads/2023/07/shutterstock_433413835v2-768x512.jpg', 
            title: 'My trip to Rome!' 
        }
      },
        {
            id: 'n102', 
            createdAt: 1112223, 
            type: 'NoteTodos', 
            isPinned: false, 
            style: { 
              backgroundColor: '#faafa8' 
          },
          info: { 
              title: 'To-Do: React Project', 
              todos: [ 
                  { txt: 'Set up project repo'}, 
                  { txt: 'Create main component' }, 
                  { txt: 'Test API integration' },
                  { txt: 'Write unit tests' }
              ] 
          }
        },
        {
          id: 'n112', 
          createdAt: 1112223, 
          type: 'NoteTodos', 
          isPinned: false, 
          style: { 
            backgroundColor: '#faafa8' 
        },
        info: { 
            title: 'To-Do: Clean my room', 
            todos: [ 
                { txt: 'Pick up any clothes '}, 
                { txt: 'Tidy up surfaces' }, 
                { txt: 'Dust - Wipe down any shelves, furniture, or electronics.' },
                { txt: 'Sweep the floor' },
                { txt: 'Organize ' }
            ] 
        }
      },
        {
            id: 'n103', 
            createdAt: 1112224, 
            type: 'NoteVid', 
            isPinned: false, 
            style: { 
              backgroundColor: '#fff8b8' 
          },
          info: { 
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
              title: 'How to Learn Web Development'
          }
        },
        {
          id: 'n113', 
          createdAt: 1112224, 
          type: 'NoteVid', 
          isPinned: false, 
          style: { 
            backgroundColor: '#fff8b8' 
        },
        info: { 
            url: 'https://www.youtube.com/watch?v=Oa_RSwwpPaA', 
            
        }
      },
        {
          id: 'n107', 
          createdAt: Date.now(), 
          type: 'NoteImg', 
          isPinned: false, 
          style: { 
              backgroundColor: '#d3bfdb' 
          },
          info: { 
              url: 'https://www.dogsforgood.org/app/smush-webp/2020/06/Dogs-For-Good-October-22-2019-308-1024x660.jpg.webp', 
              title: 'My Dog is Adorable!' 
          }
        },
        {
          id: 'n108', 
          createdAt: Date.now(), 
          type: 'NoteTxt', 
          isPinned: false, 
          style: { 
              backgroundColor: '#d3bfdb' 
          },
          info: { 
           txt: 'Dinner reservation at the best restaurant!' 
        }
        },
        {
          id: 'n120', 
          createdAt: Date.now(), 
          type: 'NoteTxt', 
          isPinned: false, 
          style: { 
              backgroundColor: '#d3bfdb' 
          },
          info: { 
           txt: '12.03 Date night!' 
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
  
  
  
  


