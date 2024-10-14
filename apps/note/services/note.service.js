// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    getById,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.title))
            }
            if (filterBy.minSpeed) {
                notes = notes.filter(book => book.listPrice >= filterBy.listPrice)
            }
            return notes
        })
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

function getEmptyNote(title = '', listPrice = '') {
    return { title, listPrice }
}

function getDefaultFilter() {
    return { txt: '', noteType: '' }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
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
              backgroundColor: '#00d' 
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
      utilService.saveToStorage(NOTE_KEY, notes)
    }
  }
  
  
  


function _createNote() {
return {
    id: utilService.makeId(),
    title: "metus hendrerit",
    subtitle: utilService.makeLorem(15),
    authors: ["Oren Yaniv"],
    publishedDate: utilService.getRandomInt(1700, 2022),
    description: utilService.makeLorem(50),
    pageCount: utilService.getRandomInt(1, 700),
    categories: [
        "Computers",
        "Hack"
    ],
    thumbnail: "http://coding-academy.org/books-photos/20.jpg",
    language: "en",
    listPrice: {
        amount: utilService.getRandomInt(10, 30),
        currencyCode: "EUR",
        isOnSale: false
    }
}
}