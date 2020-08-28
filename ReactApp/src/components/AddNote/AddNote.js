import React, {useState} from 'react';
import axios from 'axios';
import {useMutation} from "react-query";
import "./AddNote.css";
import {useHistory} from "react-router";

const addNote = (data) => {
    return axios.post("https://boiling-basin-70629.herokuapp.com/api/notes", data);
}

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mutate] = useMutation(addNote);
    const history = useHistory();
    const handleChangeTitle = e => {
        setTitle(e.target.value);
    };
    const handleChangeText = e => {
        setText(e.target.value)
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await mutate({
                title, text
            });
            setText("");
            setTitle("");
            history.push('/notes');
        } catch (e) {
            console.log(e.message);
        }
    }
    const resetForm = e => {
        setTitle("");
        setText("");
    }
    return (
        <div className="container margin-top80">
            <section className='add-note-sec'>
                <h4 className="title">Add Note</h4>
                <form className='add-note' method='post' onSubmit={handleSubmit}>
                    <input type="text" value={title} name="title" id="title" placeholder='Title' onChange={handleChangeTitle}/>
                    <textarea name="text" id="text" placeholder="Text" value={text} onChange={handleChangeText}></textarea>
                    <div className="btn-sec">
                        <input type="submit" value="Submit"/>
                        <input type="reset" value="Reset" onClick={resetForm}/>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddNote;