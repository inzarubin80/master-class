import { db, auth, storage } from '../firebase';
import { setSaveFailure, setSaveSUCCESS, addClassesEnd, addClassesStart } from '../redux/app/appActions'
import { createMasterClassFromVal } from '../model/mastreClass'

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


const setfailure = (dispatch, err) => {

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


                        saveMasterClass(key, { ...data, images: images }, dispatch, goToClasses);


                    }

                }).catch((error) => { setfailure(dispatch, error.message) });

            }).catch((error) => { setfailure(dispatch, error.message) });

        }
    }

    removeFiles.forEach((element) => remveMasterClassPicture(element.filename));

}

const saveMasterClass = (key, data, dispatch, goToClasses) => {

    console.log('dispatch', dispatch);


    if (key && key != '-1') {

        const ref = db.ref('masterClass/' + key);

        console.log('ref', ref);

        ref.set({ basicData: data }, function (error) {
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

        db.ref('masterClass').push({ basicData: data }, function (error) {
            if (error) {
                setfailure(dispatch, error.message)
            } else {

                dispatch(setSaveSUCCESS());
                goToClasses();


            }
        });
    }
}


export const masterСlassСhangeReserve = (key, uid) => {

    const ref = db.ref('masterClass/' + key);

    ref.transaction((masterClass) => {
        if (masterClass) {

            if (masterClass.reservation && masterClass.reservation[uid]) {

                console.log("Сняли резерв");

                masterClass.reservation[uid] = null;

            }
            else {


                if (!masterClass.reservation) {
                    masterClass.reservation = {};
                }


                if (Object.keys(masterClass.reservation).length < masterClass.basicData.numberSeats) {

                    console.log("Установили резерв");
                    console.log("masterClass", masterClass);
                    console.log("masterClass.basicData.numberSeats", masterClass.basicData.numberSeats);

                    masterClass.reservation[uid] = true;

                }


            }
        }
        return masterClass;
    });
}


const remveMasterClassPicture = (fileName) => {

    const imageRef = storage.ref('images').child(fileName);
    imageRef.delete().then(function () {
    }).catch(function (error) {
    });
}


export const fetchMasterClas = (firstKnownKey, dispatch) => {

    const refMasterClass = db.ref('masterClass');

    let qwery;
    if (firstKnownKey) {
        qwery = refMasterClass.orderByKey().endAt(firstKnownKey).limitToLast(100);
    } else {
        qwery = refMasterClass.orderByKey().limitToLast(100);
    }

    qwery.once('value', function (snapshot) {

        let payload = [];

        snapshot.forEach((childSnapshot) => {

            let key = childSnapshot.key;
            let childData = childSnapshot.val();

            if (firstKnownKey !== key) {
                payload.unshift(createMasterClassFromVal(key, childData));
            }
        });

        if (payload.length) {
            if (firstKnownKey) {
                dispatch(addClassesEnd(payload));
            }
            else {
                dispatch(addClassesStart(payload));
            }

        }
    });

}



