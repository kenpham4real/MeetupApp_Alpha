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
        const postPath = 
        firestore()
        .collection('posts')
        .doc('userId')
        .collection(`${userId}`)
        let postData;
        try {
            await 
            postPath
            .orderBy('createdAt', 'desc')
            .get()
            .then(documentSnapshot => postData = documentSnapshot.docs);

            // if(!response.ok){
            //     throw new Error('Something went wrong, please try again!')
            // };
            console.log('postData for post', postData);
            const loadedPosts = [];
            console.log('Fetching...');

            for(let key in postData){
                const postComments = await postPath.doc(`${postData[key]._data.id}`).collection('commentInfo').doc(`${postData[key]._data.id}`).get()
                console.log('postComments', postComments)
                loadedPosts.push(new Post(
                    postData[key]._data.id,
                    postData[key]._data.uid,
                    postData[key]._data.image,
                    postData[key]._data.createdAt,
                    postData[key]._data.description,
                    postData[key]._data.location,
                    postData[key]._data.likeInfo,
                    postComments._data,
                    postData[key]._data.shareInfo
                ))
            }

            console.log('loadedPosts', loadedPosts)

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

export const uploadPost = async (postImageUri, userId) => {
    const filePath = await getPathForImageFile(postImageUri)
    console.log('filepath', filePath);
    const filteredFilePathName = filterFilePath(filePath);
    console.log('filteredFilePathName', filteredFilePathName);
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
        const postPath = 
        firestore()
        .collection('posts')
        .doc('userId')
        .collection(`${userId}`)
        .doc(`${postId}`)
        try {
            await 
            postPath
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
                shareInfo:{
                    share_count: 0,
                    user_shares: null
                }
            })
            await
            postPath
            .collection('commentInfo')
            .doc(`${postId}`)
            .set({
                commentInfo:{
                    comment_count: 0,
                    user_comments: []
                },
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
    const stat = await RNFetchBlob.fs.stat(uri);
    console.log('stat.path in getPathForImageFile', stat.path);
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

export const updatePostInfo = (postId, description, checkin_location) => {
        
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
                description: description,
                location: checkin_location
            })
        } catch (error) {
            console.log('Error while updating basic info of post')
        }
        
        dispatch({
            type: UPDATE_POST,
            postId: postId,
            postData:{
                description: description,
                checkin_location: checkin_location,
                
            }
        })
    }
}

export const like_unlike_post = (postId, type_of_like, like_count, user_liker_uid, userPostLikeIndex, createdAt) => {
    return async (dispatch, getState) => {
        
        const userId = getState().auth.user.uid;
        let user_likes_after_filtered;
        const postLikePath = 
            firestore()
            .collection('posts')
            .doc('userId')
            .collection(`${userId}`)
            .doc(`${postId}`)
        if(type_of_like == LIKE){
            console.log('Addling like');
            try {
                await
                postLikePath
                .update({
                    'likeInfo.like_count': like_count,
                    [`likeInfo.user_likes`]: firestore.FieldValue.arrayUnion({[`${user_liker_uid}`]: createdAt})
                })
            } catch (error) {
                console.log('Error', error);
            }
            user_likes_after_filtered = {
                [user_liker_uid]: createdAt
            }
            console.log('user_likes_after_filtered', user_likes_after_filtered);
        }else{
            console.log('Removing like from: ', user_liker_uid);
            const posts = getState().posts.posts;
            console.log('state.posts', posts);
            const postIndex = posts.findIndex(post => post.postId === postId);
            const userLikeInfo = posts[postIndex].likeInfo.user_likes[userPostLikeIndex];
            console.log('userLikeInfo to be removed', userLikeInfo);
            user_likes_after_filtered = posts[postIndex].likeInfo.user_likes.filter(user => user !== userLikeInfo)
            console.log('user_likes_after_filtered', user_likes_after_filtered);
            try {
                await
                postLikePath
                .update({
                    'likeInfo.like_count': like_count,
                    [`likeInfo.user_likes`]: firestore.FieldValue.arrayRemove(userLikeInfo)
                })
            } catch (error) {
                console.log('Error', error);
            }
        }
        dispatch({
            type: LIKE_UNLIKE,
            type_of_like: type_of_like,
            postId: postId,
            like_count,
            user_likes: user_likes_after_filtered,
        })
    }
}

export const comment_uncomment_post = (postId, commentId, type_of_comment_action, comment_count, user_commenter_uid, edited_comment) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.user.uid;
        const postCommentPath = 
            firestore()
            .collection('posts')
            .doc('userId')
            .collection(`${userId}`)
            .doc(`${postId}`)
            .collection('commentInfo')
            .doc(`${postId}`)
        if(type_of_comment_action == COMMENT){
            console.log('Adding comment');
            try {
                await
                postCommentPath
                .update({
                    comment_count: comment_count,
                    user_comments: firestore.FieldValue.arrayUnion({id: commentId, comment: edited_comment, uid: user_commenter_uid})
                })
                console.log('Finish adding comment')
            } catch (error) {
                console.log('Error', error);
            }
        }else{
            console.log('Removing comment');
            const posts = getState().posts;
            console.log('state.posts', posts)
            const userPostCommentIndex = posts.commentInfo.user_comments.findIndex(post => post.id == commentId);

            try {
                await
                postCommentPath
                .update({
                    comment_count: comment_count,
                    [`user_comments[${userPostCommentIndex}]`]: firestore.FieldValue.delete()
                })
            } catch (error) {
                console.log('Error', error);
            }
        }
        dispatch({
            type: COMMENT_UNCOMMENT,
            postId: postId,
            commentInfo:{
                commentId: commentId,
                comment_count,
                user_commenter_uid,
                edited_comment,                
            }
        })
    }
}

