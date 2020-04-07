export const LOGIN = 'LOGIN';

export const addUser = (token, uid) => {
    return{
        type: LOGIN,
        userData:{
            token: token, 
            uid: uid
        }
    }
}