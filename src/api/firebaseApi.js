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



export async function createMasterClass(data, addFiles, removeFiles, key, dispatch) {
    
    console.log('createMasterClass');


    if (!addFiles.length) {
        saveMasterClass(key, data, dispatch);
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
                        

                        saveMasterClass(key, {...data, images:images}, dispatch);


                    }

                }).catch( );

            });

        }
    }

    removeFiles.forEach((element) => remveMasterClassPicture(element.filename));

}

const saveMasterClass = (key, data, dispatch) => {

    console.log('dispatch',dispatch);


    if (key) {

        const ref = db.ref('masterClass/' + key);

        console.log('ref', ref);

        ref.set(data, function(error) {
            if (error) {
                
                dispatch(setSaveFailure(error));

            } else {
                
                dispatch(setSaveSUCCESS());

            }
          });
    }
    else {

        db.ref('masterClass').push(data, function(error) {
            if (error) {
                
                dispatch(setSaveFailure(error));

            } else {
                
                dispatch(setSaveSUCCESS());

            }
          });
    }
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