// 'use strict'

import { 
    ADD_POST,
    SET_POST, 
    UPDATE_POST, 
    DELETE_POST,
    BASIC_INFO,
    LIKE_UNLIKE,
    COMMENT_UNCOMMENT, 
    LIKE
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
            const updatedPosts = new Post(
                action.postId,
                state.posts[userPostIndex].ownerId,
                state.posts[userPostIndex].postImage,
                state.posts[userPostIndex].date,
                action.postData.description,
                action.postData.checkin_location,
                state.posts[userPostIndex].likeInfo,
                state.posts[userPostIndex].commentInfo,
                state.posts[userPostIndex].shareInfo
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
        case LIKE_UNLIKE:
            const userPostIndex_like = state.posts.findIndex(post => post.postId === action.postId);
            const availablePostIndex_like = state.availablePosts.findIndex(post => post.postId === action.postId);

            const updatedPosts_like = new Post(
                action.postId,
                state.posts[userPostIndex_like].ownerId,
                state.posts[userPostIndex_like].postImage,
                state.posts[userPostIndex_like].date,
                state.posts[userPostIndex_like].description,
                state.posts[userPostIndex_like].checkin_location,
                {
                    like_count: action.like_count,
                    user_likes: action.type_of_like == LIKE ? state.posts[userPostIndex_like].likeInfo.user_likes.concat(action.user_likes) : action.user_likes
                },
                state.posts[userPostIndex_like].commentInfo,
                state.posts[userPostIndex_like].shareInfo
            );

            const updatedUserPosts_like = [...state.posts];
            const updatedAvailabePosts_like = [...state.availablePosts];

            updatedUserPosts_like[userPostIndex_like] = updatedPosts_like;
            updatedAvailabePosts_like[availablePostIndex_like] = updatedPosts_like;
            
            return {
                ...state,
                posts: updatedUserPosts_like,
                availablePosts: updatedAvailabePosts_like
            }

        case COMMENT_UNCOMMENT:
            
            const userPostIndex_comment = state.posts.findIndex(post => post.postId === action.postId);
            const availablePostIndex_comment = state.availablePosts.findIndex(post => post.postId === action.postId);
            const updatedPosts_comment = new Post(
                action.postId,
                state.posts[userPostIndex_comment].ownerId,
                state.posts[userPostIndex_comment].postImage,
                state.posts[userPostIndex_comment].date,
                state.posts[userPostIndex_comment].description,
                state.posts[userPostIndex_comment].checkin_location,
                state.posts[userPostIndex_comment].likeInfo,
                action.commentInfo,
                state.posts[userPostIndex].shareInfo
            );

            const updatedUserPosts_comment = [...state.posts];
            const updatedAvailabePosts_comment = [...state.availablePosts];

            updatedUserPosts_comment[userPostIndex_comment] = updatedPosts_comment;
            updatedAvailabePosts_comment[availablePostIndex_comment] = updatedPosts_comment;

            return {
                ...state,
                posts: updatedUserPosts_comment,
                availablePosts: updatedAvailabePosts_comment
            }

        case DELETE_POST:
            return{
                posts: state.posts.filter(id => id !== action.postId),
                availablePosts: state.availablePosts.filter(id => id !== action.postId)
            }
        default: return state;
    }
}
