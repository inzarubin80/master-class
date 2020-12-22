import {
  FETCH_SAVE_ClASS_REQUEST,
  FETCH_SAVE_ClASS_FAILURE,
  FETCH_SAVE_ClASS_SUCCESS,
  ADD_ClASS,
  UPDATE_ClASS,
  GET_LISTS_ClASSES,
  
  SET_ID_ANSWER_COMMENT,
  SET_ID_MODIFIED_COMMENT,
  SET_ID_DEL_COMMENT,



} from '../types'

 import * as api  from '../../api/firebaseApi'


export const setAnswerCommentId = (id) => {
  return {
    type: SET_ID_ANSWER_COMMENT,
    payload: id
  };
};


export const setModifiedCommentId = (id) => {
  return {
    type: SET_ID_MODIFIED_COMMENT,
    payload: id
  };
};

export const setDelCommentId = (id) => {
  return {
    type: SET_ID_DEL_COMMENT,
    payload: id
  };
};




export const setSaveRequest = () => {
  return {
    type: FETCH_SAVE_ClASS_REQUEST
  };
};




export const setSaveFailure = (error) => {
  return {
    type: FETCH_SAVE_ClASS_FAILURE,
    payload: error
  };
};


export const setSaveSUCCESS = () => {
  return {
    type: FETCH_SAVE_ClASS_SUCCESS
  };
};


export const saveMasterClass = (data, filesToAdd, removeFiles, key, goToClasses) => {

  return async (dispatch, getState) => {

    
  
    let urls = {};

    //грузим последовательно файлы
    for (let i = 0; i < filesToAdd.length; i++) {
      await api.addFiles(filesToAdd[i].filename, filesToAdd[i].file).then(url => {
        urls[filesToAdd[i].filename] = url;
      })
        .catch(error => dispatch(setSaveFailure(error)));
    }

    if (Object.keys(urls).length !== filesToAdd.length ){
      return;
    }

    const images = data.images.map((item) => {
      if ([item.filename] in urls) {
        return { filename: item.filename, src: urls[item.filename] };
      }
      else {
        return item
      }
    });


    if (!key || key == '-1') {
      api.addMasterClass({ ...data, images: images }).then(masterClass => {

        console.log(masterClass);

       // goToClasses();

        dispatch({ type: ADD_ClASS, payload: masterClass })
        
        goToClasses();

      }

      ).catch(error => setSaveFailure(error));
    }
    else {
      api.updateMasterClass(key, { ...data, images: images}).then(masterClass => {

       dispatch({ type: UPDATE_ClASS, payload: masterClass})
       goToClasses();
        
      }
      ).catch(error => setSaveFailure(error));    
    }

  }
}

export const getLists = () => {

  return (dispatch, getState) => {
    
    return api.getLists()
    .then(lists => (
       
      dispatch({type: GET_LISTS_ClASSES, payload: lists})
      
      
      ));


  
  };

}
