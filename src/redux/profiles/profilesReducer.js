import { } from '../types'

const initialState = {
    profiles: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case 'added':
            return {
                ...state, profiles: [...state.profiles, ...action.payload]
            };

        case 'modified':
            return {
                ...state, profiles: state.profiles.map((item) => {
                    const modifiedItem = action.payload.find(modifiedItem => modifiedItem.uid == item.uid);
                    if (modifiedItem) {
                        return modifiedItem;
                    }
                    else {
                        return item;
                    }
                })
            };


        default:

            return state
    }
}
