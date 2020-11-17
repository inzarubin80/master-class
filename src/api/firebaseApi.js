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

export function createMasterClass(data, addFiles, removeFiles) {

    console.log('Записываемый объект', data);
    console.log('Добавляемые файлы', addFiles);
    console.log('Удаляемые файлы', removeFiles);


    if (!addFiles.length) {

        console.log('data',  data);
        addMasterClass(data);
    }
    else {

        let urls = {};

        for (let i = 0; i < addFiles.length; i++) {

            const imageRef = storage.ref('images').child(addFiles[i].filename);

            imageRef.put(addFiles[i].file).then(function (snapshot) {

                snapshot.ref.getDownloadURL().then(function (URL) {

                    urls[addFiles[i].filename] = URL;

                    console.log('urls', urls);


                    if (i == (addFiles.length - 1)) {

                       
                        const images = data.images.map((item) => {
                            if ([item.filename] in urls) {
                                return { filename: item.filename, src: urls[item.filename] };
                            }
                            else {
                                 return item 
                                }
                        }
                        );

                        console.log('data images',  images);
                        addMasterClass({...data, images:images});

                    }

                });

            });

        }
    }

    removeFiles.forEach((element) => remveMasterClassPicture(element.filename));

}

const addMasterClass = (data) => {

    db.ref('masterClass').push({
        ...data
    }).then(docRef => {
        docRef.on('value',
            (snapshot) => {
            })
    })



}

const remveMasterClassPicture = (fileName) => {

    const imageRef = storage.ref('images').child(fileName);

    imageRef.removeFiles.then(function (snapshot) {

        snapshot.ref.getDownloadURL().then(function (URL) {

            console.log(URL);

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