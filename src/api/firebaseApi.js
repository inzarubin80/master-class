import { db, auth } from '../firebase';

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

export function createMasterClass(data) {
   /*
    return db.collection('masterClass').add({
        ...data
    })
        .then(docRef => docRef.get())
        .then(doc => ({
            id: doc.id,
            ...doc.data()
        }));
*/

//console.log(db);

return db.ref('masterClass').push({
    ...data
}).then(docRef=> {console.log(docRef); docRef.on('value', (snapshot)=>{console.log(snapshot.val())})})


//then(docRef => docRef.get())
  
/*
.then(doc => ({
        id: doc.id,
        ...doc.data()
    }));
*/

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