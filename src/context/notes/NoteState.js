import {useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "61d82a6f3bd73ac24750bb92",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title Updated",
          "description": "Please Wake up early Updated updated",
          "tag": "personal",
          "date": "2022-01-07T11:56:31.573Z",
          "__v": 0
        },
        {
          "_id": "61d82a713bd7pac24750bb94",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T11:56:33.332Z",
          "__v": 0
        },
        {
          "_id": "61d8308a6bd791c3793e61e6",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T12:22:34.773Z",
          "__v": 0
        },
        {
          "_id": "61d82a6f3bd73ag24750bb92",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title Updated",
          "description": "Please Wake up early Updated updated",
          "tag": "personal",
          "date": "2022-01-07T11:56:31.573Z",
          "__v": 0
        },
        {
          "_id": "61v82a713bd73ac24750bb94",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T11:56:33.332Z",
          "__v": 0
        },
        {
          "_id": "61d8308a6bd791c379be61e3",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T12:22:34.773Z",
          "__v": 0
        },{
          "_id": "61d82a6f3bd73ac24750b292",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title Updated",
          "description": "Please Wake up early Updated updated",
          "tag": "personal",
          "date": "2022-01-07T11:56:31.573Z",
          "__v": 0
        },
        {
          "_id": "21d82a713bd73ac24750bb94",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T11:56:33.332Z",
          "__v": 0
        },
        {
          "_id": "61d8308a6bd791c379be67e6",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T12:22:34.773Z",
          "__v": 0
        },{
          "_id": "61d82ahf3bd73ac24750bb92",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title Updated",
          "description": "Please Wake up early Updated updated",
          "tag": "personal",
          "date": "2022-01-07T11:56:31.573Z",
          "__v": 0
        },
        {
          "_id": "61d82a713bk73ac24750bb94",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T11:56:33.332Z",
          "__v": 0
        },
        {
          "_id": "61d8308a6bd791c3o9be61e6",
          "user": "61d7fd5231959dd8279182ff",
          "title": "My title",
          "description": "Please Wake up early",
          "tag": "personal",
          "date": "2022-01-07T12:22:34.773Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitial)

    // Add note 
    const addNote = (title, description, tag)=>{
      // api call
      console.log("Adding a new note")
      let note = [{
        "_id": "61d8308a6bd791c3o9be61e6",
        "user": "61d7fd5231959dd8279182ff",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-01-07T12:22:34.773Z",
        "__v": 0
      }]
      setNotes(notes.concat(note))
    }


    //edit note
    const editNote = ()=>{
      
    }


    //delete note
    const deleteNote = (id)=>{
        console.log("Deleting the note with id" + id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }


    return (
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState