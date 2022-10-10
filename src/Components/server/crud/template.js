import React, { useEffect, useState } from 'react';
import StartFirebase from '../firebase.js';
import { ref, set, get, update, remove, child } from 'firebase/database';


export function CreateComment(props) {
    // Setting comment for point on map. Still testing func... Pin details will need to be passed thru and parsed.
    const [username, setUsername] = useState();
    const [db, setDB] = useState();
    //Connecting to DB aka componentDidMount
    useEffect(() => {
        setDB(StartFirebase());
      }, []);

    //Updating comment

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const submit = (e) => {
        switch(e.target.id) {
            case 'addBtn' :
                addData();
        }
    }

    const addData = () => {
        set(ref(db, 'users/'+ username),
        {
            Username: username
        })
    }

      return (
        <>
        <label>Enter Username</label>
        <input type='text' id='userbox' value={username} onChange={handleUsernameChange}/>
        <br/><br/>
  
        <button id="addBtn" onClick={submit} >Add Data</button>
        </>
      )

}