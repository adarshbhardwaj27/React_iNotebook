import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "614db8f7495a2745a282c9b0",
          "user": "614c0c22098b3a4e3cf5bb48",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2021-09-24T11:39:35.211Z",
          "__v": 0
        },
        {
          "_id": "614f4a179eab72bfe6eff959",
          "user": "614c0c22098b3a4e3cf5bb48",
          "title": "My Title is Apple on banana",
          "description": "Please wake up at night",
          "tag": "personal",
          "date": "2021-09-25T16:11:03.415Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial);


    // Add a Note
    const addNote = (title,description,tag)=>{
      let note =         {
        "_id": "614f4a179eab72bfe6eff959",
        "user": "614c0c22098b3a4e3cf5bb48",
        "title": "My Title is added",
        "description": "Please wake ",
        "tag": "personal",
        "date": "2021-09-25T16:11:03.415Z",
        "__v": 0
      };
      setNotes(notes.push(note))
    }
    // Delete a Note
    const deleteNote = ()=>{

    }
    // Edit a Note
    const editNote = ()=>{
      
    }

    return (
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}} >
            {props.children}
        </noteContext.Provider >
    )
}

export default NoteState;