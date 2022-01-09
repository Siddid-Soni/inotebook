import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import {useNavigate} from "react-router-dom";

const AddNote = (props) => {

    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({title: "", description:"", tag: "default"})
    const history = useNavigate()

    const handleClick = async (e)=>{
        e.preventDefault()
        let err = await addNote(note.title, note.description, note.tag)


        console.log(err)
        if (err && err.error==='invalidToken') {
            localStorage.removeItem("_inoihb@%$21")
            history("/login")
        }


        if (err && err.error === 'validation') {
            for (let i = 0; i < err.errors.length; i++) {
                if (err.errors[i] === 'title') {
                    document.getElementById('err').innerHTML = 'title should be at least 3 characters'
                }
                if (err.errors[i] === 'description') {
                    document.getElementById('desc').innerHTML = 'description should be at least 5 characters'
                }
            }

        }
        else {
            document.getElementById('err').innerHTML = ''
            document.getElementById('desc').innerHTML = ''
            document.getElementById('title').value = ''
            document.getElementById('description').value = ''
            document.getElementById('tag').value = ''
            setNote({title: "", description:"", tag: ""})
            props.showAlert("Note Added Successfully!", "success")
        }


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
                    <input type="text" className="form-control" id="title" name='title' placeholder="Enter title" onChange={onChange}/>
                </div>
                <small id="err" className='ms-1 text-danger'/>
                <div className="mb-3">
                    <legend className="form-label">Description</legend>
                    <textarea className="form-control" id="description" name='description' onChange={onChange} rows="3" />
                </div>
                <small id="desc" className='ms-1 text-danger'/>
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
