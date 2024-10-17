const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

// import { UserMsg } from './cmps/UserMsg.jsx'
// import { SurveyIndex } from './cmps/SurveyIndex.jsx'
// import { Category } from './cmps/Category.jsx'
import { AppHeader } from "./cmps/AppHeader.jsx"
// import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx" 
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
// import { UserMsg } from "./cmps/UserMsg.jsx"
// import { MailDetails } from "./apps/mail/pages/mailDetails.jsx"
import { BookIndex } from "./apps/book/pages/BookIndex.jsx" 
import { BookBDetails } from "./apps/book/pages/BookDeteils.jsx" 
import { BookEdit} from "./apps/book/pages/BookEdit.jsx" 
// import { MailCompose } from "./apps/mail/pages/ModalDetails.jsx" 
import { MailDetails } from "./apps/mail/pages/mailDetails.jsx"
import { ModalCompose } from "./apps/mail/cmps/ModalCompose.jsx" 






export function App() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/book/:bookId" element={<BookBDetails />} />
                        <Route path='/book/edit' element={<BookEdit />}  />
                        <Route path='/book/edit/:bookId' element={<BookEdit />}/>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/mail/send" element={<ModalCompose />} />
                        <Route path="/mail" element={<MailIndex />} />
                        <Route path="/mail/:mailId" element={<MailDetails />} />
                        <Route path="/note" element={<NoteIndex />} />
                    </Routes>
                </main>
                {/* <UserMsg /> */}
            </section>
        </Router>
    )
}


//! LongTxt
//! read or unread to mobile
//! home imgs 
//! loaging img
//! sort 
//! canvas


{/* <Route path="/mail/details" element={<MailDetails />} />
<Route path="/mail/compose" element={<ModalDetails />} /> */}
{/* <Route path="/mail/compose/:composeId" element={<ModalCompose />} /> */}
{/* <Route path="/mail/compose/mailId" element={<ModalCompose />} /> */}

