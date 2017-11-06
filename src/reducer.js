
//This reducer handles all data that is passed to it and checks to see if any data is invalid before setting it.
export default function reducer(state = {laney: 0, lift: 0, white: 0, normal: false}, action) {
    switch(action.type) {
      case "SET_GREEN": {
        if(isNaN(action.payload)) {
          return {...state, green: 0};
        }
        return {...state, green: action.payload};
      }
      case "SET_WHITE": {
        let limit = 1000 - state.lift;
        if(isNaN(action.payload)) {
          return {...state, white: 0};
        }

        if (action.payload > limit) {
          return {...state, white: limit};
        }

        if (action.payload < 0) {
          return {...state, white: 0};
        }
        return {...state, white: action.payload};
      }
      case "SET_BPM": {
        if(isNaN(action.payload)) {
          return {...state, bpm: 0};
        }
        if(action.payload < 0) {
          return{...state, bpm: 0}
        }
        return {...state, bpm: action.payload};
      }
      case "SET_STARTBPM": {
        if(isNaN(action.payload)) {
          return {...state, startbpm: 0};
        }
        if(action.payload < 0) {
          return{...state, startbpm: 0}
        }
        return {...state, startbpm: action.payload};
      }
      case "SET_LIFT": {
        if(isNaN(action.payload)) {
          return {...state, lift: 0};
        }

        if (action.payload < 0) {
          return {...state, lift: 0};
        }

        if (action.payload > 1000) {
          return {...state, lift: 1000};
        }
        return {...state, lift: action.payload};
      }
      case "SET_Y": {
        if(isNaN(action.payload)) {
          return {...state, y: 0};
        }

        if (action.payload < -320) {
          return {...state, y: -320};
        }

        //laney denotes the top value for lane all which is the chart picture with all the notes. 
        //It also uses a negative value and Y is the sudden + value. Therefore Y can't exceed laney because laney handles the lift modifier.
        if (action.payload > state.laney) {
          return {...state, y: state.laney};
        }
        return {...state, y: action.payload};
      }
      case "SET_LANEY": {
        //handles the UI element for lift.

        if(isNaN(action.payload)) {
          return {...state, laney: 0};
        }

        //values range from -320 which is the most top and 0 which is the most bottom.
        if (action.payload < -320) {
          return {...state, laney: -320};
        }

        if (action.payload > 0) {
          return {...state, laney: 0};
        }



        return {...state, laney: action.payload};
      }

      case "SET_HS": {
        if(isNaN(action.payload)) {
          return {...state, hs: 0};
        }

        if (action.payload < 0) {
          return {...state, hs: 0};
        }
        return {...state, hs: action.payload};
      }

      case "SET_NORMAL": {
        if(action.payload) {
          return {...state, normal: true};
        }
        else {
          return {...state, normal: false};
        }
      }

      case "SET_NO_SCROLL": {
        if(action.payload) {
          return {...state, noscroll: true};
        }
        else {
          return {...state, noscroll: false};
        }
      }
      default:
        return state;
    }

}