import React from 'react';
import StartFirebase from '../firebase.js';
import { ref, set, get, update, remove, child } from 'firebase/database';

export class Crud extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      db:'',
      username:''
    }
    this.interface = this.interface.bind(this);
  }

  componentDidMount(){
    this.setState({
      db: StartFirebase()
    });
  }

  render(){
    return(
      <>
      <label>Enter Username</label>
      <input type='text' id='userbox' value={this.state.username} onChange={e => {this.setState({username: e.target.value})}}/>
      <br/><br/>

      <button id="addBtn" onClick={this.interface}>Add Data</button>
      </>
    )
  }

  interface(event){
    const id = event.target.id;

    if(id=='addBtn'){
      this.insertData();
    }
  }

  getAllInputs(){
    return{
      username: this.state.username
    }
  }

  insertData(){
    const db = this.state.db;
    const data = this.getAllInputs();

    set(ref(db, 'users/'+data.username),
    {
      Username: data.username
    });
  }

}