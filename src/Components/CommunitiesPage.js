import React from 'react'
import Globals from '../Globals.js';
import FriendsList from './FriendsList.js';

export default function CommunitiesPage(props) {
    

  return (
    <div id="communitiesPage" className="menuSection">
        {props.children}
    </div>
  )
}
