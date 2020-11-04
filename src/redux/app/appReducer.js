/*
import { SET_CURRENTDATE, EDIT_EVENT, ADD_EVENT, FETCH_EVENTS_SUCCESS, SET_CURRENTMONTH, DEL_EVENT } from '../types'




const initialState = {

    events: [], 
    currentMonth: new Date(),
    currentId: 0,
   };

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENTDATE: {
            return Object.assign({}, state, {
                currentDate: action.payload
            })
        }

        case SET_CURRENTMONTH: {
            return Object.assign({}, state, {
                currentMonth: action.payload
            })
        }

        case EDIT_EVENT: {

            return Object.assign({}, state, {
                events: state.events.map(event => {
                    if (event.id !== action.payload.id) {
                        return event
                    }

                    return Object.assign({}, event, {
                        date: action.payload.date,
                        title: action.payload.title,
                        duration: action.payload.duration,
                        summary: action.payload.summary,
                        partner: action.payload.partner,
                        project: action.payload.project

                    })
                })
            })
        }

        case ADD_EVENT: {

            return { ...state, events: [...state.events, action.payload] }
        }

        case DEL_EVENT: {

            console.log('DEL_EVENT');

            return { ...state, events: state.events.filter(item => item.id !== action.payload.id)}
        }

        case FETCH_EVENTS_SUCCESS:

            return { ...state, events: action.payload }


        default:

            return state
    }
}

*/