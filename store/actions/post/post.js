'use strict'

import { Post } from "../../../src/models/post/post";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

import {filterFilePath} from '../../../src/helper/ArrayFunctions'

// Basic actions
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const SET_POST = 'SET_POST';
export const BASIC_INFO = 'BASIC_INFO';

// Interaction
export const LIKE_UNLIKE = 'LIKE_UNLIKE';
export const LIKE = 'LIKE';
export const UNLIKE = 'UNLIKE';

export const COMMENT_UNCOMMENT = 'COMMENT_UNCOMMENT';
export const COMMENT = 'COMMENT';
export const UNCOMMENT = 'UNCOMMENT';

export const SHARE_POST = 'SHARE_POST';

export const fetchPost = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.user.token;
        const userId = getState().auth.user.uid;
        let resData;
        try {
            await 
            firestore()
            .collection('posts')
            .doc('userId')
            .collection(`${userId}`)
            .orderBy('createdAt', 'desc')
            .get()
            .then(documentSnapshot => resData = documentSnapshot.docs)

            // if(!response.ok){
            //     throw new Error('Something went wrong, please try again!')
            // };
            // console.log('resData for post', resData);
            const loadedPosts = [];
            console.log('Fetching...');
            for(let key in resData){
                loadedPosts.push(new Post(
                    resData[key]._data.id,
                    resData[key]._data.uid,
                    resData[key]._data.image,
                    resData[key]._data.createdAt,
                    resData[key]._data.description,
                    resData[key]._data.location,
                    resData[key]._data.likeInfo,
                    resData[key]._data.commentInfo,
                    resData[key]._data.shareInfo
                ))
            }

            dispatch({
                type: SET_POST,
                postMade: loadedPosts,
                posts: loadedPosts.filter(post => post.uid === userId)
            });
            console.log('\nFetch post finished');

        } catch (error) {
            console.log('Fetching post has error (action)', error);
            throw error;
        }
    }
}

export const uploadPost = async (postImageUri, userId) => {
    const filePath = await getPathForImageFile(postImageUri)
    console.log('filepath', filePath)
    const filteredFilePathName = filterFilePath(filePath);
    const storageRef = storage().ref('posts').child(`/${userId}/${filteredFilePathName}`)
    const metadata = {
        contentType: 'image/jpeg',
        cacheControl: 'no-store'
    };

    return new Promise(async(res, rej) => {
        storageRef.putFile(`${filePath}`,metadata)
        .on(
            storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log('snapshot', snapshot.state);
                console.log('progress', (snapshot.bytesTransferred)/(snapshot.totalBytes)*100);
                console.log('snapshot.state',snapshot.state);
                if(snapshot.state === storage.TaskState.SUCCESS){
                    console.log('SUCCESS')
                }
            },
            error => {
                console.log('Image upload error', error);
                rej(error)
            },
            () => {
                storageRef.getDownloadURL()
                .then((downLoadUri) => {
                    console.log('File available at: ', downLoadUri);
                    res(downLoadUri)
                })
            }
        )
                
    })
}

export const addPost = (postId, postImageUri, date, description, checkin_location) => {
    
    return async (dispatch, getState) => {
        const userId = getState().auth.user.uid;
        const remoteUri = await uploadPost(postImageUri, userId);
        
        try {
            await 
            firestore()
            .collection('posts')
            .doc('userId')
            .collection(`${userId}`)
            .doc(`${postId}`)
            .set({
                id: postId,
                createdAt: date,
                description: description,
                image: remoteUri,
                location: checkin_location,
                uid: userId,
                likeInfo: {
                    like_count: 0,
                    user_likes: null
                },
                commentInfo:{
                    comment_count: 0,
                    user_comments: null
                },
                shareInfo:{
                    share_count: 0,
                    user_shares: null
                }
            })
            console.log('Finished adding post')
        } catch (error) {
            console.log('error', error)
        }
        dispatch({
            type: ADD_POST,
            postData: {
                postId,
                postImage: remoteUri,
                userId,
                date,
                description,
                checkin_location
            }
        })
    }

}
// TODO: This works for choosing image from library, broken when taking an image to post --> Fix 
export const getPathForImageFile = async (uri) => {
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
}

export const deletePost = (postId) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.user.uid;
        try {
            await
            firestore()
            .collection('posts')
            .doc('userId')
            .collection(`${userId}`)
            .doc(`${postId}`)
            .delete()
        } catch (error) {
            console.log('error', error);
        }
        dispatch({
            type: DELETE_POST,
            postId: postId
        })
    }
}

export const updatePostInfo = (
    postId, type_of_update, description, checkin_location, type_of_like, like_count, user_liker_uid, 
    type_of_comment_action, comment_count, user_commenter_uid, comment, share_count, user_sharer_uid ) => {
        
    return async (dispatch, getState) => {
        const userId = getState().auth.user.uid;
        const updatePath = 
        firestore()
        .collection('posts')
        .doc('userId')
        .collection(`${userId}`)
        .doc(`${postId}`);
        switch(type_of_update){
            case BASIC_INFO:
                try {
                    await 
                    updatePath
                    .update({
                        description: description,
                        location: checkin_location
                    })
                } catch (error) {
                    console.log('Error', error)
                }
                break;
            case LIKE_UNLIKE:
                try {
                    await
                    updatePath
                    .update({
                        'likeInfo.like_count': like_count,
                        [`likeInfo.user_likes.${user_liker_uid}`]: 
                            type_of_like == LIKE 
                            ? user_liker_uid 
                            : firestore.FieldValue.delete()
                    })
                } catch (error) {
                    console.log('Error', error)
                }
                break;
            case COMMENT_UNCOMMENT:
                try {
                    await
                    updatePath
                    .update({
                        'commentInfo.comment_count': comment_count,
                        [`commentInfo.user_comments.${user_commenter_uid}`]: 
                            type_of_comment_action == COMMENT
                            ? comment
                            : firestore.FieldValue.delete()
                    });
                } catch (error) {
                    console.log('Error', error)
                }
                break;
            case SHARE_POST:
                try {
                    await
                    updatePath
                    .update({
                        'shareInfo.share_count': share_count,
                        [`shareInfo.user_shares.${user_sharer_uid}`]: user_sharer_uid
                    })
                } catch (error) {
                    console.log('Error', error)
                }
                break;
            default: break;
        }
        dispatch({
            type: UPDATE_POST,
            postId: postId,
            type_of_update: type_of_update,
            postData:{
                description: description,
                checkin_location: checkin_location,
                like_count,
                user_liker_uid,
                comment_count,
                user_commenter_uid,
                comment,
                share_count,
                user_sharer_uid
            }
        })
    }
}

export const like_unlike_post = (postId, type_of_like, like_count, user_liker_uid) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.user.uid;
        try {
            await
            firestore()
            .collection('posts')
            .doc('userId')
            .collection(`${userId}`)
            .doc(`${postId}`)
            .update({
                'likeInfo.like_count': like_count,
                [`likeInfo.user_likes.${user_liker_uid}`]: 
                    type_of_like == LIKE 
                    ? user_liker_uid 
                    : firestore.FieldValue.delete()
            })
        } catch (error) {
            console.log('Error', error);
        }
        dispatch({
            type: LIKE_UNLIKE,
            postId: postId,
            postData:{
                like_count,
                user_liker_uid,
            }
        })
    }
}

// export const comment_uncomment_post = (postId, type_of_comment_action, comment_count, user_commenter_uid, comment) => {
//     return async (dispatch, getState) => {
//         const userId = getState().auth.user.uid;
//         try {
//             await

//         } catch (error) {
//             console.log('Error', error);
//         }
//     }
// }