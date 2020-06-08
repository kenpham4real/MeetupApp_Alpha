'use strict'

import React, {useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    Text
} from 'react-native';
import {v4 as uuid_v4} from 'uuid';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import * as postActions from '../../../../store/actions/post/post'
import Colors from '../../../constants/Colors';
import PostItem from '../../../components/post/PostItem';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const HEADER_HEIGHT = WIDTH/7;
const ITEM_HEIGHT = HEADER_HEIGHT+WIDTH;

const PostView = props => {
    
    // const {posts} = props.route.params;
    const [commentInput, setCommentInput] = useState('')
    const [isLike, setIsLike] = useState(null)
    const posts = useSelector(state => state.posts.availablePosts);
    const profile = useSelector(state => state.profile.userProfile );
    const profile_uid = useSelector(state => state.auth.user);

    // const [isLike, setIsLike] = useState(false);
    const scrollIndex = props.scrollIndex;
    const dispatch = useDispatch();

    const _onPostLike = (post, like_count, user_liker_uid) => {
        // Check if user_liker_uid had liked the post
        // YES => remove the user_liker_uid off the like list
        // NO => add the user_liker_uid to the like list
        const userLikes = post.likeInfo.user_likes;
        const user_liker_uid_index = userLikes.findIndex(user => Object.keys(user) == user_liker_uid);
        user_liker_uid_index !== -1
            ? dispatch(postActions.like_unlike_post(post.postId, postActions.UNLIKE, like_count-1,user_liker_uid,user_liker_uid_index, new Date()))
            : dispatch(postActions.like_unlike_post(post.postId, postActions.LIKE, like_count+1, user_liker_uid,user_liker_uid_index, new Date()))

    }

    const _onPostComment = (postId, comment_count, user_commenter_uid, comment) => {
        dispatch(postActions.comment_uncomment_post(postId,uuid_v4(),postActions.COMMENT,comment_count+1,user_commenter_uid,comment))
    }



    const _onPostEdit = (postEditId, postEditImage) => {
        console.log('postEditId', postEditId)
        props.navigation.navigate('PostDescriptionStack', {
            postEditId: postEditId,
            postEditImage: postEditImage
        })
    }

    const _onDeletePost = (postId) => {
        dispatch(postActions.deletePost(postId))
    }

    const _onCheckLike = (postId, userId) => {
        const postToCheckIndex = posts.findIndex(post => post.postId === postId);
        const userLikeIndex = posts[postToCheckIndex].likeInfo.user_likes.findIndex(user => Object.keys(user) === userId);
        userLikeIndex !== -1 ? setIsLike(false) : setIsLike(true)

    }
    
    return(
        <View style={styles.container}>
            <View style={styles.modalHeader}>
                <Icon3 onPress={() => {props.navigation.goBack(); console.log(posts)}} name='ios-arrow-round-back' size={40} style={{marginLeft: 10}}/>
            </View>
            <FlatList
                // showsVerticalScrollIndicator={false}
                // getItemLayout={(data, index) => ({
                //     length: ITEM_HEIGHT, 
                //     offset: ITEM_HEIGHT * index, 
                //     index,
                // })}
                // initialScrollIndex={scrollIndex}
                data={posts}
                keyExtractor={(item) => item.postId}
                renderItem={itemData => {
                    const postItem = itemData.item;
                    return(
                        <PostItem
                            userName={profile.userName}
                            userAvatar={profile.userAvatar}
                            postImage={postItem.postImage}
                            description={postItem.description}
                            like_count={postItem.likeInfo.like_count}
                            postId={postItem.postId}
                            userId={profile_uid.uid}
                            isLike={isLike}
                            _onCheckLike={() => _onCheckLike(postItem.postId, profile.uid)}
                            _setIsLike={() => setIsLike(prev => !prev)}
                            comment_count={postItem.commentInfo.comment_count}
                            commentList={postItem.commentInfo.user_comments}
                            commentInput={commentInput}
                            _setCommentInput={setCommentInput}
                            _onPostLike={() => _onPostLike(postItem,postItem.likeInfo.like_count, profile_uid.uid)}
                            _onPostComment={() => _onPostComment(postItem.postId,postItem.commentInfo.comment_count, profile_uid.uid,commentInput)}
                            _onPostEdit={() => _onPostEdit(postItem.postId,postItem.image)}
                            _onDeletePost={() => _onDeletePost(postItem.postId)}
                        />
                    )
                }}
            />
        </View>
    )
}

export default PostView;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white'
    },
    modalHeader:{
        borderBottomColor: Colors.borderLine, borderBottomWidth: 1,
        height: WIDTH/7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    
})