import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HeaderComponent from './components/HeaderComponent'
import MasterСlasses from './pages/MasterСlasses'

import Auth from './pages/Auth'

const MasterClass = ()=> {
    
        return (
            <div className="TodoApp">
             
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>

                            <Route path="/" exact component={MasterСlasses}/>
                            
                            <Route path="/classes" exact component={MasterСlasses}/>
                            
                            <Route path="/login" component={Auth}/>

                              
                        </Switch>
                      
                       
                    </>
                </Router>
             
            </div>
        )
    
}

export default MasterClass