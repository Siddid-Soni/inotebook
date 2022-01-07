import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, addNote } = context

    return (
        <>
        <AddNote />
        <div className='container my-3'>
            <h1>Your notes</h1>
            <div className='row row-cols-auto'>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </div>
        </>
    )
}

export default Notes
