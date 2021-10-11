import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3 "> 
            <div className="card my-3 ">
                <div class ="card-body" style={{"backgroundColor": "rgb(59 186 234 / 51%)"}}>
                <h5 class ="card-title">{note.title}</h5>
                <p class ="card-text">{note.description}</p>
                <i className="fas fa-trash-alt mx-2"></i>
                <i className="far fa-edit mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
