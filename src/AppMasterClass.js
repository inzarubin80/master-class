import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HeaderComponent from './components/HeaderComponent'
import ListMasterClasses from './components/ListMasterClasses'

import TestList from './components/TestList'

import FooterComponent from './components/FooterComponent'
import ClassForm from './components/ClassForm'



import Auth from './components/Auth'

const MasterClass = ()=> {
    
        return (
            <div className="TodoApp">
             
                <Router>
                    <>
                        <HeaderComponent/>
                        
                        <Switch>

                            <Route path="/" exact component={ListMasterClasses}/>
                           
                           {/* <Route path="/classes" exact component={ListMasterClasses}/>*/}
                            
                            <Route path="/classes" exact component={ListMasterClasses}/>


                            <Route path="/login" component={Auth}/>
                            <Route path="/class/:id" component={ClassForm}/>
                              
                        </Switch>
                      
                       {/* <FooterComponent/> */}
                       
                    </>
                </Router>
             
            </div>
        )
    
}

export default MasterClass