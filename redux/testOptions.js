import * as ActionTypes from './ActionTypes';

export const testOptions = (state  = { isLoading: true,
                                        errMess: null,
                                        testOptions:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_OPTIONS:
        return {...state, isLoading: false, errMess: null, testOptions: action.payload};

        case ActionTypes.OPTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, testOptions: []}

        case ActionTypes.OPTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};