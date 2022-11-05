import React from 'react'
import Globals from '../Globals'

export default function FriendsList(props) {
  const [state, setState] = React.useState({friends: {}});
  //this component will query the api and get a list of friends that the user has
  //it will then render a list of friends

  const inputRef = React.useRef(null);

  function submit() {
    console.log(inputRef.current.value, props.appState.userState.user);
    fetch(Globals.API_BASEURL + "/user/addfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.appState.userState.user,
        friend: inputRef.current.value,
      }),
    }).then((res) => {
      if(res.status == 200){
        getFriends()
      }
    });
  }

  function getFriends() {
    console.log(props.appState.userState.user)
    fetch(Globals.API_BASEURL + "/user/getfriends/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.appState.userState.user,
      }),
    })
      .then((res) => {
        console.log(props.appState.userState.user);
        console.log(res)
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setState({ friends: data.friends });
      });
  }

  React.useEffect(() => {
    getFriends();
  }, []);

  console.log(state);
  return (
    <div id="friendsList">
      {(Object.keys(state.friends).length > 0)?state.friends.map((friend) => {
        return <p key={friend}>{friend}</p>;
      }):<p>You have ZERO FRIENDS</p>}
      <input ref={inputRef} type="text" id="addFriendTextInput"></input>
      <button onClick={submit}>Add Friend</button>
    </div>
  );
}
