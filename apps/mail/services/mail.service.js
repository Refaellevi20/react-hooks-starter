
import { utilService } from '../../../services/util.service.js' 
import { storageService } from '../../../services/async-storage.service.js' 
import { showSuccessMsg } from '../../../services/event-bus.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
  email: 'Refaelisrael125@appsus.com',
  fullName: 'Elinor Levi'
}

// let mails = []

_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  // getEmptyBook,
  getDefaultFilter,
  getEmptyMailToSend,
  getEmptyMailToDraft,
  getReadPersent,
  getMails,
  getMailById,
  getInboxNum,
  getDraftNum,
  getSize,
  archiveMail

  // addReview,
  // getNextBookId,
  // getPrevBookId
}

function getMailById(id) {
  const mail = mails.find(mail => mail.id === id)
  return mail || null
}

function archiveMail(mail) {
  console.log('Archiving mail:', mail)
  mail.status = 'archived'
  return storageService.put(MAIL_KEY, mail) 
      .then(() => {
        showSuccessMsg('Mail archived successfully')

          console.log('Mail archived successfully')
      })
      .catch(err => {
        console.error('Error archiving mail:', err)
        showSuccessMsg('Failed to archive mail')
    })
}

function getMails() {
  return storageService.query(MAIL_KEY) 
}

// function query() {
//     return storageService.query(MAIL_KEY) 
//   }


function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) return storageService.put(MAIL_KEY, mail)
  else return storageService.post(MAIL_KEY, mail)
}


function query(filterBy) {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => (regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from)))
      }
      if (filterBy.isRead !== null) {
        mails = mails.filter(mail => {
          return mail.isRead === filterBy.isRead
        })
      }
      if (filterBy.isStared) {
        mails = mails.filter(mail => {
          return mail.isStared
        })
      }
      if (filterBy.status) {
        if (filterBy.status === 'all') {
          mails = mails.filter(mail => {
            return (mail.status !== 'trash' && mail.status !== 'draft')
          })
        } else {
          mails = mails.filter(mail => {
            return mail.status === filterBy.status
          })
        }
      }
    //   console.log('mails:',mails)
      return mails
    })
}

function getReadPersent(){
  return storageService.query(MAIL_KEY)
    .then(mails => {
      const newMails = mails.filter(mail => mail.isRead)
      return Math.ceil((newMails.length / mails.length) * 100)
    })
}

function getSize(){
  return storageService.query(MAIL_KEY)
    .then(mails => {
      const newMails = mails.filter(mail => mail.isRead)
      return Math.ceil((newMails.length / mails.length) * 100)
    })
}

function getInboxNum() {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      const newMails = mails.filter(mail => mail.status === 'inbox')
      return newMails.length
    })
}

function getDraftNum() {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      const newMails = mails.filter(mail => mail.status === 'draft')
      return newMails.length
    })
}

function getDefaultFilter() {
  return { txt: '', isRead: null, status: 'all' }
}

function getEmptyMailToSend() {
  return {
    subject: '',
    from: loggedinUser.fullName,
    fromEmail: loggedinUser.email,
    body: '',
    isRead: false,
    sentAt: Date.now(),
    to: '',
    status: 'sent',
    isStared: false,
    size: 5406 * 1024
  }
}

function getEmptyMailToDraft() {
  return {
    subject: '',
    from: loggedinUser.fullName,
    fromEmail: loggedinUser.email,
    body: '',
    isRead: false,
    sentAt: Date.now(),
    to: '',
    status: 'draft',
    isStared: false,
    size: 5406 * 1024
  }
}


function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY) || []
    // console.log('mails:',mails)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        from: 'Shuki',
        fromEmail: 'momo@momo.com',
        body: 'Would like to catch up sometimes i missed you you stupid little man how are you ',
        isRead: false,
        sentAt: 1672228849000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: true,
        size: 5406 * 1024
      },
      {
        id: 'e103',
        subject: 'AppBrewery Web',
        from: 'AppBrewery',
        fromEmail: 'AppBrewery@gmail.com',
        body: 'Enable notifications Download Discord on your phone and receive push notifications for Discord activities like messages, mentions, friend requests, and events.',
        isRead: false,
        sentAt: 1671883249000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: false,
        size: 34033 * 1024
      },
      {
        id: 'e104',
        subject: 'Hey you!',
        from: 'Tal',
        fromEmail: 'taltul125@gmail.com',
        body: 'How you Doin',
        isRead: true,
        sentAt: 1671883239000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: true,
        size: 83340 * 1024
      },
      {
        id: 'e105',
        subject: 'not you!',
        from: loggedinUser.fullName,
        fromEmail: loggedinUser.email,
        body: 'wrong email... you sent me a long long span to check if the css shit is still working and how is it',
        isRead: true,
        sentAt: 1671883149000,
        to: 'makemoney@momo.com',
        status: 'sent',
        isStared: true,
        size: 22240 * 1024
      },
      {
        id: 'e106',
        subject: 'Pukiii!!',
        from: loggedinUser.fullName,
        fromEmail: loggedinUser.email,
        body: 'hey puki, tou are trully missed. we talk about you all the time in the course. come and visit when you have the chance.',
        isRead: true,
        sentAt: 1671883149000,
        to: 'puki@momo.com',
        status: 'sent',
        isStared: true,
        size: 4042 * 1024
      },
      {
        id: 'e107',
        subject: 'Job offer',
        from: 'Momo',
        fromEmail: 'makemoney@momo.com',
        body: 'come work at our firm, good money and good hours, you can start on Mmonday!',
        isRead: false,
        sentAt: 1671883149000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: false,
        size: 540 ** 1024
      },
      {
        id: 'e108',
        subject: 'LAST CALL!!!',
        from: 'School',
        fromEmail: 'school@momo.com',
        body: 'you need to deliver your work untill 10pm or we will give you an F, your choise...',
        isRead: true,
        sentAt: 1671883149000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: false,
        size: 520 ** 1024
      },
      {
        id: 'e109',
        subject: 'Come sit with us',
        from: 'Simha',
        fromEmail: 'simha@momo.com',
        body: 'we are sitting in the park tonight, you are more then wellcome and we will love to have you in this meeting',
        isRead: false,
        sentAt: 1671883149000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: true,
        size: 140 * 1024
      },
      {
        id: 'e110',
        subject: 'about yesterday',
        from: loggedinUser.fullName,
        fromEmail: loggedinUser.email,
        body: 'hey i had fun yesterday, would like to see you again',
        isRead: true,
        sentAt: 1671883149000,
        to: 'hagar@momo.com',
        status: 'sent',
        isStared: true,
        size: 240 * 1024
      },
      {
        id: 'e111',
        subject: 'Thailand',
        from: 'ISTA',
        fromEmail: 'ista@momo.com',
        body: 'come with us and have the best vecation of your life in the cheapest price possible',
        isRead: true,
        sentAt: 1671883149000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: true,
        size: 40 * 1024
      },
      {
        id: 'e112',
        subject: 'hey shuki!',
        from: loggedinUser.fullName,
        fromEmail: loggedinUser.email,
        body: 'i thought about yesterday and i am very upset... you need to say you are sorry for what you did!',
        isRead: true,
        sentAt: 1671883149000,
        to: 'shuki@momo.com',
        status: 'sent',
        isStared: true,
        size: 40 * 1024
      },
      {
        id: 'e113',
        subject: 'Job offer!',
        from: 'Zimbabua',
        fromEmail: 'makemoney@momo.com',
        body: 'if you want to make shit loads of money come to us and we will make you rich! we pay very good and you can have the best life possible!',
        isRead: true,
        sentAt: 1671883149000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: false,
        size: 440 * 1024
      },
      {
        id: 'e114',
        subject: 'SPAN!',
        from: 'elad ashuah',
        fromEmail: 'makemoney@momo.com',
        body: 'if you happy and you know it clap your hands so be happy and dont be un happy',
        isRead: false,
        sentAt: 1671883149000,
        to: loggedinUser.email,
        status: 'inbox',
        isStared: false
      },
      {
        id: 'e115',
        subject: 'How are you!',
        from: loggedinUser.fullName,
        fromEmail: loggedinUser.email,
        body: 'i have missed you and just wanted to let you know that every thing is ok so dont worry and be happy',
        isRead: true,
        sentAt: 1671883149000,
        to: 'makemoney@momo.com',
        status: 'sent',
        isStared: true,
        size: 740 * 1024
      }

    ]
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}