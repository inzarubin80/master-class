
import AppMasterClass from './AppMasterClass';
import React, { useEffect } from 'react';
import { initAuth } from './redux/user/userActions';
import { useDispatch } from 'react-redux';


const App = () => {
 
   const dispatch = useDispatch();
  
   useEffect(() => {
      dispatch(initAuth());
   }, []);

   return (<div>
        <AppMasterClass />
      </div>);

};

export default App;