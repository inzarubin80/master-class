import { db, auth, storage } from '../firebase';
import {setSaveFailure, setSaveSUCCESS} from '../redux/app/appActions'


/* Auth */
export function logInUser(email, password) {

    console.log(email);
    console.log(password);

    return auth.signInWithEmailAndPassword(email, password);
}

export function signOutUser() {
    return auth.signOut();
}

export function registerUser(email, password) {

    console.log(email);
    console.log(password);

    return auth.createUserWithEmailAndPassword(email, password);
}

export function initAuth(onAuth) {
    auth.onAuthStateChanged(onAuth);
}


const  setfailure = (dispatch, err) =>
{

    dispatch(setSaveFailure(err));

    setTimeout(() => {
        dispatch(setSaveFailure('')); 
    }, 3000);


}

export async function createMasterClass(data, addFiles, removeFiles, key, dispatch, goToClasses) {
    
    console.log('createMasterClass');


    if (!addFiles.length) {
        saveMasterClass(key, data, dispatch, goToClasses);
    }
    
    else {

        let urls = {};

        for (let i = 0; i < addFiles.length; i++) {

            const imageRef = storage.ref('images').child(addFiles[i].filename);

            await imageRef.put(addFiles[i].file).then(function (snapshot) {

                snapshot.ref.getDownloadURL().then(function (URL) {

                    urls[addFiles[i].filename] = URL;

                  
                    if (i === (addFiles.length - 1)) {


                        const images = data.images.map((item) => {
                            if ([item.filename] in urls) {

                                return { filename: item.filename, src: urls[item.filename] };
                            }
                            else {
                                return item
                            }
                        }
                        );
                        

                        saveMasterClass(key, {...data, images:images}, dispatch, goToClasses);


                    }

                }).catch( (error) =>{setfailure(dispatch, error.message)});

            }).catch( (error) =>{setfailure(dispatch, error.message)});

        }
    }

    removeFiles.forEach((element) => remveMasterClassPicture(element.filename));

}

const saveMasterClass = (key, data, dispatch, goToClasses) => {

    console.log('dispatch',dispatch);


    if (key) {

        const ref = db.ref('masterClass/' + key);

        console.log('ref', ref);

        ref.set({basicData:data}, function(error) {
            if (error) {
                
                console.log('error', error.message);
                setfailure(dispatch, error.message)
            } else {
                
                dispatch(setSaveSUCCESS());
                goToClasses();
                
            }
          });
    }
    else {

        db.ref('masterClass').push({basicData:data}, function(error) {
            if (error) {
                    setfailure(dispatch, error.message)
            } else {
                
                dispatch(setSaveSUCCESS());
                goToClasses();
                

            }
          });
    }
}


export const masterClassReservation = (key, uid) => {

    const ref = db.ref('masterClass/' + key);
    
    ref.transaction((masterClass) => {
      if (masterClass) {
        if (masterClass.reservation && masterClass.reservation[uid]) {
            masterClass.reservation[uid] = null;
        } else {
        
          
          if (!masterClass.reservation) {
            masterClass.reservation = {};
          }
    

          if (Object.keys(masterClass.reservation).length < masterClass.basicData.numberSeats)
          {
           
            console.log("masterClass.numberSeats", masterClass.numberSeats);
            masterClass.reservation[uid] = true;
          
        }
         

        }
      }
      return masterClass;
    });
}


const remveMasterClassPicture = (fileName) => {

   // console.log('remveMasterClassPicture fileName ', fileName);


    const imageRef = storage.ref('images').child(fileName);

    imageRef.delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });



}


export function updateTodo(todoId, data) {
    return db.collection('todos').doc(todoId).update(data)
        .then(() => ({
            id: todoId,
            ...data
        }));
}

export function deleteTodo(todoId) {
    return db.collection('todos').doc(todoId).delete()
        .then(() => todoId);
}