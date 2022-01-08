import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const [note, setNote] = useState({id:"", etitle: "", edescription:"", etag: "default"})

    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(()=>{
        getNotes()
        //eslint-disable-next-line
    },[])
    
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const handleClick = ()=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
        <AddNote />
        <button ref={ref} type="button" className="btn btn-primary visually-hidden" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <form className='my-3'>
                            <div className="mb-3">
                                <legend className="form-label">Title</legend>
                                <input type="text" onChange={onChange} className="form-control" id="etitle" name='etitle' value={note.etitle} />
                            </div>
                            <div className="mb-3">
                                <legend className="form-label">Description</legend>
                                <textarea className="form-control" onChange={onChange} id="edescription" name='edescription' value={note.edescription} rows="3"/>
                            </div>
                            <div className="mb-3">
                                <legend className="form-label">Tag</legend>
                                <input className="form-control" onChange={onChange} id="etag" name='etag' value={note.etag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='container my-3'>
            <h1>Your notes</h1>
            <div className='row row-cols-auto'>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
        </>
    )
}

export default Notes
