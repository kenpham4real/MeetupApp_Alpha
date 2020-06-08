'use strict'

/************************ Create a blob ************************/
const blob = await new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log('blob here', xhr.response['_data'].name)
        res(xhr.response);
    };
    xhr.onerror = function() {
        rej(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', postImageUri, true);
    xhr.send(null);
})

/************************ Add post to Firebase real-time database ************************/

export const addPost = (postImage, date, description, checkin_location) => {
    return async (dispatch, getState) => {
        const token = getState().auth.user.token;
        const userId = getState().auth.user.uid;
            const response = await fetch(
                `https://meetupapp-21180.firebaseio.com/users/${userId}/posts.json?auth=${token}`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        postImage,
                        date,
                        description,
                        checkin_location,
                        // ownerId: userId,
                    })
                });

            const resData = await response.json();
            console.log(resData);
            if(!response.ok){
                console.log("reponse isn't ok in post action ", response)
            };

            dispatch({
                type: ADD_POST,
                postData:{
                    id: resData.name,
                    ownerId: userId,
                    postImage,
                    date,
                    description,
                    checkin_location
                }
            })
    }
}

/************************ Fetch post to Firebase real-time database ************************/

export const fetchPost = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.user.token;
        const userId = getState().auth.user.uid;
        try {
            const response = await fetch(
                `https://meetupapp-21180.firebaseio.com/users/${userId}/posts.json?auth=${token}`,{
                    method: 'GET',
                    credentials: 'same-origin'
                }
            )
            
            // if(!response.ok){
            //     throw new Error('Something went wrong, please try again!')
            // };

            const resData = await response.json();
            const loadedPosts = [];
            console.log('Fetching...');
            for(const key in resData){
                loadedPosts.push(new Post(
                    key,
                    resData[key].ownerId,
                    resData[key].postImage,
                    resData[key].date,
                    resData[key].description,
                    resData[key].checkin_location
                ))
            };

            dispatch({
                type: SET_POST,
                postMade: loadedPosts,
                posts: loadedPosts.filter(post => post.ownerId === userId)
            });
            console.log('\nFetch post finished');

        } catch (error) {
            console.log('Fetching post has error (action)', error);
            throw error;
        }
    }
}