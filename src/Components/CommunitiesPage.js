import React from 'react'
import Globals from '../Globals.js';

export default function CommunitiesPage(props) {
    const inputRef = React.useRef(null);
    

    function submit(){
        console.log(inputRef.current.value, props.appState.userState.user)
        fetch(Globals.API_BASEURL + "/user/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: props.appState.userState.user,
                friend: inputRef.current.value,
            }),
        }).then((res) => {
            console.log(res)
        })
    }

  return (
    <div id="CommunitiesPage">
        <h3>Communities Page</h3>
        <input ref={inputRef} type="text" id="addFriendTextInput"></input>
        <button onClick={submit}>Add Friend</button>
    </div>
  )
}
