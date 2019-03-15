import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});


export const postComment = (CenterId,author,comment, rating)  => (dispatch) => {

    const newComment = {
        CenterId:CenterId,
        author:author,
        comment:comment,
        rating:rating
    };
    newComment.date = new Date().toISOString();

    setTimeout(() => {
        dispatch(addComment(newComment));
    }, 2000);
};


export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchCenters = () => (dispatch) => {

    dispatch(centersLoading());

    return fetch(baseUrl + 'centers')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(centers => dispatch(addCenters(centers)))
    .catch(error => dispatch(centersFailed(error.message)));
};

export const centersLoading = () => ({
    type: ActionTypes.CENTERS_LOADING
});

export const centersFailed = (errmess) => ({
    type: ActionTypes.CENTERS_FAILED,
    payload: errmess
});

export const addCenters = (centers) => ({
    type: ActionTypes.ADD_CENTERS,
    payload: centers
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const fetchOptions = () => (dispatch) => {
    
    dispatch(optionsLoading());

    return fetch(baseUrl + 'testOptions')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(options => dispatch(addOptions(options)))
    .catch(error => dispatch(optionsFailed(error.message)));
};

export const optionsLoading = () => ({
    type: ActionTypes.OPTIONS_LOADING
});

export const optionsFailed = (errmess) => ({
    type: ActionTypes.OPTIONS_FAILED,
    payload: errmess
});

export const addOptions = (options) => ({
    type: ActionTypes.ADD_OPTIONS,
    payload: options
});