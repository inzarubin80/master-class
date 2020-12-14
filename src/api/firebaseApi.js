import { db, auth, storage } from '../firebase';
import {createMasterClassFromVal } from '../model/mastreClass';

/* Auth */
export function logInUser(email, password) {

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


export async function addFiles(filename, file) {

    return storage.ref('images').child(filename).put(file)
        .then(snapshot => (snapshot.ref.getDownloadURL()));

}



export const addMasterClass = (data) => {


    return db.collection('masterClass').add({ basicData: data })
        .then(docRef => docRef.get())
        .then(doc => (createMasterClassFromVal(doc.id, doc.data())));


}

export const updateMasterClass = (id, data) => {

    return db.collection('masterClass').doc(id).update({ basicData: data }).then(() => ({
        id: id,
        ...data
    }));

}


export function deleteMasterClass(Id) {
    return db.collection('masterClass').doc(Id).delete()
        .then(() => Id);
}

export const masterСlassСhangeReserve = async (key, uid) => {

    const ref = db.collection('masterClass').doc(key);
    try {
        const res = await db.runTransaction(async t => {
            const doc = await t.get(ref);

            const  masterClass = createMasterClassFromVal(key, doc.data())

            if (masterClass.reservation && masterClass.reservation[uid]) {
                
                delete masterClass.reservation[uid];

                await t.update(ref, { reservation: masterClass.reservation });
            }
            else {

                if (!masterClass.reservation) {
                    masterClass.reservation = {};
                }
                if (Object.keys(masterClass.reservation).length < masterClass.numberSeats) {
                    
                    masterClass.reservation[uid] = true;
                    await t.update(ref, { reservation: masterClass.reservation });

                }
            }

        });

        console.log('Transaction success', res);
    } catch (e) {
        console.log('Transaction failure:', e);
    }
}

const remveMasterClassPicture = (fileName) => {

    const imageRef = storage.ref('images').child(fileName);
    imageRef.delete().then(function () {
    }).catch(function (error) {
    });
}

export const getLists = () => {
    return db.collection('masterClass')

        //.where()

        .orderBy('basicData.DateMasterClass', 'desc')

        .get()
        .then(snapshot => {
            const items = snapshot.docs.map(doc => (createMasterClassFromVal(doc.id, doc.data())));
            return items;
        });
}

export const getMasterClassById = (id) => {

    return db.collection('masterClass').doc(id).get().then(snapshot => createMasterClassFromVal(snapshot.id, snapshot.data()));

}

export const getUserInfo = (uid) => {
    return db.collection('userRoles').doc(uid).collection('roles');
 
}

