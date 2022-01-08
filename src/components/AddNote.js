import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {

    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({title: "", description:"", tag: "default"})

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <div className='container my-3'>
            <h1>Add a note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <legend className="form-label">Title</legend>
                    <input type="text" className="form-control" id="title" name='title' placeholder="Enter title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <legend className="form-label">Description</legend>
                    <textarea className="form-control" id="description" name='description' onChange={onChange} rows="3"/>
                </div>
                <div className="mb-3">
                    <legend className="form-label">Tag</legend>
                    <input className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button className='btn btn-primary' onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
