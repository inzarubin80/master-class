import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import ListMasterClasses from './components/ListMasterClasses'
import ScreenMasterClass from './components/ScreenMasterClass'
import ClassForm from './components/ClassForm'

import Auth from './components/Auth'

const App = ()=> {
    
        return (
            <div className="TodoApp">
             
                <Router>
                    <>
                        {/*<HeaderComponent/>*/}
                        
                        <HeaderComponent/>

                        <Switch>

                            <Route path="/" exact component={ListMasterClasses}/>
                           
                           {/* <Route path="/classes" exact component={ListMasterClasses}/>*/}
                            
                            <Route path="/classes" exact component={ListMasterClasses}/>

                            
                            <Route path="/login" component={Auth}/>
                      
                            <Route path="/classes/:id" component={ScreenMasterClass}/>

                            <Route path="/change/:id" component={ClassForm}/>
                            
                              
                        </Switch>
                      
                      

                       {/* <FooterComponent/> */}
                       
                    </>
                </Router>
             
            </div>
        )
    
}

export default App