import React, { Component } from 'react';
import './App.css';


export default class  App extends Component {
  constructor (){
    super();
  }
  
  render() {
    return (<div >    
      <div className='login_block'> 
        
        <input type='text' placeholder='mail'/>
        <input type='password' placeholder='password'/>
        <input type='submit'/>
        

      </div>
    </div>);
  }
}



