import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'tylermcginnis';

export function handleInitialData () {
    return (dispatch) => { // usa reduz-thunk por req assincrono
        dispatch(showLoading())
        return getInitialData()
        .then(({ users, tweets }) => {
            dispatch(receiveUsers(users)) // dispatch reconhece modificacoes
            dispatch(receiveTweets(tweets))     
            dispatch(setAuthedUser(AUTHED_ID)) 
            dispatch(hideLoading())
        })
    }
}