import React, {useState} from 'react';
import {useQuery} from "react-query";
import NoteSummary from "../NoteSummary/NoteSummary";
import axios from 'axios';
import EditNote from "../EditNote/EditNote";
import {Link} from "react-router-dom";
import loadingIcon from "../../assets/svg/Dual Ring-1s-200px.svg";

const getNotes = async () => {
    try {
        return await axios.get("https://boiling-basin-70629.herokuapp.com/api/notes");
    } catch (e) {
        console.log(e.message)
    }
}

const Notes = () => {
    const {data, status} = useQuery('notes', getNotes);
    const [editRequiredNote, setEditRequiredNote] = useState(null);
    return (
        <>
            {status === 'error' && (
                <div className="container margin-top40">
                    <div className="error">Sorry something went wrong!</div>
                </div>
            )}
            {status === 'loading' && (
                <div className="container margin-top40">
                    <div className="loading">
                        <img src={loadingIcon} alt="loading icon"/>
                    </div>
                </div>
            )}
            {status === 'success' && (
                <div className="container margin-top40">
                    <Link className="add-note-link" to={'/notes/add'}>Add Note</Link>
                    <section className="notes-list">
                        <ul>
                            {
                                data.data.length ?
                                    data.data.map(note => {
                                        if(note._id === editRequiredNote) {
                                            return <EditNote key={note._id} title={note.title} text={note.text} _id={note._id} setEditRequiredNote={setEditRequiredNote} />
                                        } else {
                                            return <NoteSummary key={note._id} title={note.title} text={note.text} _id={note._id} setEditRequiredNote={setEditRequiredNote} />
                                        }
                                    })
                                    :
                                    <div className='no-note'>There is no Notes!! go ahead and add one</div>
                            }
                        </ul>
                    </section>
                </div>
            )}
        </>
    );
};

export default Notes;