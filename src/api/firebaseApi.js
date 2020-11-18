import { db, auth, storage } from '../firebase';

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


/* DB */
export function getLists() {
    return db.collection('lists')
        .get()
        .then(snapshot => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return items;
        });
}

export function getTodos() {
    return db.collection('todos')
        .where('listId', '==', '')
        .get()
        .then(snapshot => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return items;
        });
}

export function getListTodos(listId) {
    return db.collection('todos')
        .where('listId', '==', listId)
        .get()
        .then(snapshot => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return items;
        });
}

export async function createMasterClass(data, addFiles, removeFiles, key) {

    console.log('data', data);
    console.log('addFiles', addFiles);
    console.log('removeFiles', removeFiles);
    console.log('key', key);

    if (!addFiles.length) {
        console.log('data', data);
        saveMasterClass(key, data);
    }
    
    else {

        let urls = {};

        for (let i = 0; i < addFiles.length; i++) {

            const imageRef = storage.ref('images').child(addFiles[i].filename);

            await imageRef.put(addFiles[i].file).then(function (snapshot) {

                snapshot.ref.getDownloadURL().then(function (URL) {

                    urls[addFiles[i].filename] = URL;

                    console.log('urls', urls);


                    if (i == (addFiles.length - 1)) {


                        console.log('urls __i', urls);

                        const images = data.images.map((item) => {
                            if ([item.filename] in urls) {

                                console.log('Есть', item.filename);
                                return { filename: item.filename, src: urls[item.filename] };
                            }
                            else {
                                console.log('Нет', item.filename);
                                return item
                            }
                        }
                        );
                        

                        saveMasterClass(key, {...data, images:images});


                    }

                });

            });

        }
    }

    removeFiles.forEach((element) => remveMasterClassPicture(element.filename));

}

const saveMasterClass = (key, data) => {
    
    console.log('data', data);
    console.log('key', key);

    if (key) {

        const ref = db.ref('masterClass/' + key);

        console.log('ref', ref);

        ref.set(data, function(error) {
            if (error) {
              // The write failed...
            } else {
              // Data saved successfully!
            }
          });
    }
    else {

        db.ref('masterClass').push(data).then(docRef => {
            docRef.on('value',
                (snapshot) => {
                })
        })

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