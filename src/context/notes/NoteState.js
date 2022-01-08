import {useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{

    const host = 'http://localhost:5000'
    const [notes, setNotes] = useState([])

    //Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
          method: 'GET',
          headers: {
              'Accept': '*/*',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkN2ZkNTIzMTk1OWRkODI3OTE4MmZmIn0sImlhdCI6MTY0MTY0MDcxOX0.r5OCS69X63Cpd75fwqx_VoxlCBWNPrJDi6yOYqZ7Y3Q'
          }
        })

        const notes = await response.json()
        setNotes(notes)

    }

    // Add note 
    const addNote = async (title, description, tag)=>{

        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkN2ZkNTIzMTk1OWRkODI3OTE4MmZmIn0sImlhdCI6MTY0MTY0MDcxOX0.r5OCS69X63Cpd75fwqx_VoxlCBWNPrJDi6yOYqZ7Y3Q'
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = await response.json()

        if (json.errors) {
            let err = []
            for (let i = 0; i < json.errors.length; i++) {
                err.push(json.errors[i].msg)
            }
            return err
        }
        else {
            setNotes(notes.concat([json]))
        }
    }


    //edit note
    const editNote = async (id, title, description, tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkN2ZkNTIzMTk1OWRkODI3OTE4MmZmIn0sImlhdCI6MTY0MTY0MDcxOX0.r5OCS69X63Cpd75fwqx_VoxlCBWNPrJDi6yOYqZ7Y3Q'
            },
            body: JSON.stringify({title,description,tag})
        })

        const json = await response.json()

        if (json.errors) {
            let err = []
            for (let i = 0; i < json.errors.length; i++) {
                err.push(json.errors[i].msg)
            }
            return err
        }

        else {
            let newNotes = JSON.parse(JSON.stringify(notes))

            for (let i = 0; i < notes.length; i++) {
                if (newNotes[i]._id === id) {
                    newNotes[i].title = title
                    newNotes[i].description = description
                    newNotes[i].tag = tag
                    break
                }
            }
            setNotes(newNotes)
        }
    }


    //delete note
    const deleteNote = async (id)=>{
        await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkN2ZkNTIzMTk1OWRkODI3OTE4MmZmIn0sImlhdCI6MTY0MTY0MDcxOX0.r5OCS69X63Cpd75fwqx_VoxlCBWNPrJDi6yOYqZ7Y3Q'
            }
        })

        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
    }


    return (
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState