// 'use strict'

import { 
    ADD_POST,
    SET_POST, 
    UPDATE_POST, 
    DELETE_POST,
    BASIC_INFO,
    LIKE_UNLIKE,
    COMMENT_UNCOMMENT, 
} from '../../actions/post/post';
import {Post} from '../../../src/models/post/post';

const initialState = {
    posts: [],
    availablePosts: []
}

export default postReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:
            const newPost = new Post(
                action.postData.postId,
                action.postData.userId,
                action.postData.postImage,
                action.postData.date,
                action.postData.description,
                action.postData.checkin_location
            )
            return{
                ...state,
                posts: state.posts.concat(newPost),
                availablePosts: state.availablePosts.concat(newPost)
            }
        case SET_POST:
            return{
                ...state,
                posts: action.posts,
                availablePosts: action.postMade
            }
        case UPDATE_POST:
            const userPostIndex = state.posts.findIndex(post => post.postId === action.postId);
            const availablePostIndex = state.availablePosts.findIndex(post => post.postId === action.postId);
            const likeInfo = {
                like_count: action.postData.like_count,
                user_liker_uid: action.postData.user_liker_uid
            }
            const commentInfo = {
                comment_count: action.postData.comment_count,
                user_commenter_uid: action.postData.user_commenter_uid,
                comment: action.postData.comment
            }
            const shareInfo = {
                share_count: action.postData.share_count,
                user_sharer_uid: action.postData.user_sharer_uid
            }
            const updatedPosts = new Post(
                action.postId,
                state.posts[userPostIndex].ownerId,
                state.posts[userPostIndex].postImage,
                state.posts[userPostIndex].date,
                action.type_of_update === BASIC_INFO 
                    ? action.postData.description
                    : state.posts[userPostIndex].description,
                action.type_of_update === BASIC_INFO 
                    ? action.postData.checkin_location
                    : state.posts[userPostIndex].checkin_location,
                action.type_of_update === LIKE_UNLIKE
                    ? likeInfo
                    : state.posts[userPostIndex].likeInfo,
                action.type_of_update === COMMENT_UNCOMMENT
                    ? commentInfo
                    : state.posts[userPostIndex].commentInfo,
                action.type_of_update === SHARE_POST
                    ? shareInfo
                    : state.posts[userPostIndex].shareInfo
            );

            const updatedUserPosts = [...state.posts];
            const updatedAvailabePosts = [...state.availablePosts];

            updatedUserPosts[userPostIndex] = updatedPosts;
            updatedAvailabePosts[availablePostIndex] = updatedPosts;

            return {
                ...state,
                posts: updatedUserPosts,
                availablePosts: updatedAvailabePosts
            }
        case DELETE_POST:
            return{
                posts: state.posts.filter(id => id !== action.postId),
                availablePosts: state.availablePosts.filter(id => id !== action.postId)
            }
        default: return state;
    }
}
