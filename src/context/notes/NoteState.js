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
              'auth-token': localStorage.getItem('_inoihb@%$21')
          }
        })

        const notes = await response.json()
        if (!notes.error) {
        setNotes(notes)
        }
        return notes

    }

    // Add note 
    const addNote = async (title, description, tag)=>{

        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('_inoihb@%$21')
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = await response.json()

        if (json.errors) {
            let err = {error:'validation',errors: []}
            for (let i = 0; i < json.errors.length; i++) {
                err.errors.push(json.errors[i].msg)
            }
            return err
        }
        else {
            if (!json.error) {
                setNotes(notes.concat([json]))
            }
            else{
                return json
            }
        }
    }


    //edit note
    const editNote = async (id, title, description, tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('_inoihb@%$21')
            },
            body: JSON.stringify({title,description,tag})
        })

        const json = await response.json()

        if (json.errors) {
            let err = {error:'validation',errors: []}
            for (let i = 0; i < json.errors.length; i++) {
                err.errors.push(json.errors[i].msg)
            }
            return err
        }

        else {
            if (!json.error) {
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
            else{
                return json
            }
        }
    }


    //delete note
    const deleteNote = async (id)=>{
        let response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('_inoihb@%$21')
            }
        })

        let json = await response.json()

        if (!json.error) {
            const newNotes = notes.filter((note)=>{return note._id !== id})
            setNotes(newNotes)
        }
        else{
            return json
        }
    }


    return (
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState