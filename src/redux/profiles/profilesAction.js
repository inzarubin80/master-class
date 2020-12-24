import { db } from '../../firebase';

export const initUsersProfiles = () => {

    return (dispatch, getState) => {
  
      let addedProfiles = [];
      let modifiedProfiles = [];

      db.collection('openProfileInformation').onSnapshot(querySnapshot => {
  
        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            addedProfiles.push(change.doc.data());
          }

          if (change.type === 'modified') {
            modifiedProfiles.push(change.doc.data());
        }

          if (change.type === 'removed') {
          }
        });
        
        if (addedProfiles.length) {
            dispatch({type:'added', payload:addedProfiles});
        }
       
        if (modifiedProfiles.length) {
            dispatch({type:'modified', payload:modifiedProfiles});
        }
    
      })
    }
  };