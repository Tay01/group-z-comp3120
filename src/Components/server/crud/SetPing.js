import React, { useEffect, useState } from 'react';
import StartFirebase from '../firebase.js';
import { ref, set, push,  get, update, remove, child } from 'firebase/database';

/*
Use this as a template for other functions that 
we want to add into the application.
Best practice would be to create one file for one type of functionality
with all the functions and export them all out. For consistency and to keep
it organised.
*/

export function SetPing(props) {
    //Database Hook
    const [db, setDB] = useState();
    //JSON Object
    const [coords, setCoords] = useState({});

    //Connecting to DB aka componentDidMount
    useEffect(() => {
        setDB(StartFirebase());
      }, []);
    //Submit Function using Switch statement.
    //Can create other buttons, functions thru this.
    const submit = (e) => {
        switch(e.target.id) {
            case 'addBtn' :
                    setCoords(
                        {
                            lat: props.lat,
                            lng: props.lng
                        })
                    addData()
        }
    }
    //Pushing data into the server.
    const addData = () => {
        const locListRef = ref(db, 'loc');
        const newLocListRef = push(locListRef);
        set(newLocListRef,
        {
            loc: coords
        });
    }
      return (
        <>
        <label>Coords</label>
        <input type='text' id='lat-box' value={props.lat}/>
        <br/><br/>
        <input type='text' id='lng-box' value={props.lng}/>
        <br/><br/>
        <button id="addBtn" onClick={submit} >Push Coords to DB</button>
        </>
      )
}