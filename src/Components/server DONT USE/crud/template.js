import React, { useEffect, useState } from 'react';
import StartFirebase from '../firebase.js';
import { ref, set, get, update, remove, child } from 'firebase/database';

/*
Use this as a template for other functions that 
we want to add into the application.
Best practice would be to create one file for one type of functionality
with all the functions and export them all out. For consistency and to keep
it organised.
*/

export function CreateComment(props) {
    // Setting comment for point on map. Still testing func... Pin details will need to be passed thru and parsed.
    const [username, setUsername] = useState();
    const [db, setDB] = useState();
    //Connecting to DB aka componentDidMount
    useEffect(() => {
        setDB(StartFirebase());
      }, []);
    //Submit Function using Switch statement.
    //Can create other buttons, functions thru this.
    const submit = (e) => {
        switch(e.target.id) {
            case 'addBtn' :
                addData();
        }
    }
    //Pushing data into the server.
    const addData = () => {
        set(ref(db, 'users/'+ username),
        {
            Username: username
        })
    }
      return (
        <>
        <label>Enter Username</label>
        <input type='text' id='userbox' value={username} onChange={e => setUsername(e.target.value)}/>
        <br/><br/>
        <button id="addBtn" onClick={submit} >Add Data</button>
        </>
      )
}