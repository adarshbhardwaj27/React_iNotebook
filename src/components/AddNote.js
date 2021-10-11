import React, { useState , useContext} from 'react'
import noteContext from "../context/notes/noteContext" 

const AddNote = () => {
    const context = useContext(noteContext);
    const {notes,setNotes} = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick =()=>{

    }
    const onChange =(e)=>{
        setNotes({...note,[e.target.name]: e.target.value})
    }
    return (
        <div className="container">
            <h1>Add a note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} id="title" name="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="desc" onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
