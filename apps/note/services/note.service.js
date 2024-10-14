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
    addColor
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.txt))
            }
            if (filterBy.isPinned) {
                notes = notes.filter(note => note.isPinned >= filterBy.isPinned)
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

function getDefaultFilter(){
    return { text: '' }
}


function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId)
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
              backgroundColor: '#00d' 
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
              backgroundColor: '#00d' 
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
        // {
        //     id: 'n102', 
        //     createdAt: 1112223, 
        //     type: 'NoteImg', 
        //     isPinned: false, 
        //     info: { 
        //       url: 'http://some-img/me', 
        //       title: 'Bobi and Me' 
        //     }, 
        //     style: { 
        //       backgroundColor: '#00d' 
        //     }
        // },
        // {
        //     id: 'n103', 
        //     createdAt: 1112224, 
        //     type: 'NoteTodos', 
        //     isPinned: false, 
        //     info: { 
        //       title: 'Get my stuff together', 
        //       todos: [ 
        //         { txt: 'Driving license', doneAt: null }, 
        //         { txt: 'Coding power', doneAt: 187111111 } 
        //       ] 
        //   }
        // }
  
      ]
      storageServices.saveToStorage(NOTE_KEY, notes)
    }
  }
  
  
  


// function _createNote() {
// return {
//     id: utilService.makeId(),
//     title: "metus hendrerit",
//     subtitle: utilService.makeLorem(15),
//     authors: ["Oren Yaniv"],
//     publishedDate: utilService.getRandomInt(1700, 2022),
//     description: utilService.makeLorem(50),
//     pageCount: utilService.getRandomInt(1, 700),
//     categories: [
//         "Computers",
//         "Hack"
//     ],
//     thumbnail: "http://coding-academy.org/books-photos/20.jpg",
//     language: "en",
//     listPrice: {
//         amount: utilService.getRandomInt(10, 30),
//         currencyCode: "EUR",
//         isOnSale: false
//     }
// }
// }