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

export function createMasterClass(data, file) {
    let key;

    const imageRef = storage.ref('images').child(data.keyMaster);

    if (file) {

        imageRef.put(file).then(function (snapshot) {

            snapshot.ref.getDownloadURL().then(function (ImgMasterClass) {

                data.ImgMasterClass = ImgMasterClass;

                db.ref('masterClass').push({
                    ...data
                }).then(docRef => {
                    docRef.on('value',
                        (snapshot) => {
                            key = snapshot.key;

                        })
                })


            });

        });
    }

    else {

        db.ref('masterClass').push({
            ...data
        }).then(docRef => {
            docRef.on('value',
                (snapshot) => {
                    key = snapshot.key;

                })
        })
    }




}

const saveMasterClassPicture = (fileName, file) => {

    const imageRef = storage.ref('images').child(fileName);

    imageRef.put(file).then(function (snapshot) {

        snapshot.ref.getDownloadURL().then(function (ImgMasterClass) {

        });

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