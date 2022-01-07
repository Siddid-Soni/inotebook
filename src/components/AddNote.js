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
            <form action="" className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="title" name='title' placeholder="Enter title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="description" name='description' onChange={onChange} rows="3"></textarea>
                </div>
                <button className='btn btn-primary' onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote