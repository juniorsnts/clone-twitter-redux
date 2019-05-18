import { saveLikeToggle, saveTweet } from '../utils/api';

import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'SAVE_TWEET';

export function addTweet(tweet){
    return {
        type: ADD_TWEET,
        tweet,
    }
}

export function handleAddTweet(text, replyingTo){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveTweet({
            text,
            author: authedUser,
            replyingTo 
        })
            .then((tweet)=> dispatch(addTweet(tweet)))
            .then(()=> dispatch(hideLoading()))
    }
}

export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

export function toogleTweet ({ id, authedUser, hasLiked }){
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweet(info){
    return (dispatch) => {
        dispatch(toogleTweet(info)) // primeiro atualizamos a view

        return saveLikeToggle(info) // depois salva no banco do backend (atualizacao otimista)
            .catch((err) => {
                console.warn('Error in handleToogleTweet: ', err);
                dispatch(toogleTweet(info));
                alert('Erro ao curtir o tweet');
            })
    }
}