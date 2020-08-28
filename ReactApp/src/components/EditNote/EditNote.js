import React, {useState} from 'react';
import axios from "axios";
import {queryCache} from "react-query";

const EditNote = ({title, text, _id, setEditRequiredNote}) => {
    const [_title, set_title] = useState(title);
    const [_text, set_text] = useState(text);
    const handle_titleChange = e => {
        set_title(e.target.value);
    };
    const handle_textChange = e => {
        set_text(e.target.value);
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`https://boiling-basin-70629.herokuapp.com/api/notes/${_id}`, {
                title: _title,
                text: _text
            })
            await queryCache.invalidateQueries('notes');
            setEditRequiredNote(null)
        } catch (e) {
            console.log(e.message);
        }
    };
    document.addEventListener('keyup', e => {
        e.key === 'Escape' && setEditRequiredNote(null);
    })
    return (
        <li>
            <div className="card">
                <div className='edit-sec'>
                    <h4 className="title">Edit Note</h4>
                    <form className="add-note" method="post" onSubmit={handleSubmit}>
                        <input type="text" name="title" id="titleEdit" placeholder="Title" value={_title} onChange={handle_titleChange}/>
                        <textarea name="text" id="text" placeholder="Text" value={_text} onChange={handle_textChange}></textarea>
                        <div className="btn-sec">
                            <button type="submit">Submit</button>
                            <button type='cancel' onClick={() => setEditRequiredNote(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </li>
    );
};

export default EditNote;