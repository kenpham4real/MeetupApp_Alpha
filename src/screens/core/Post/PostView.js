'use strict'

import React, {useState} from 'react';
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
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/Feather';
import InteractionIcon from 'react-native-vector-icons/EvilIcons';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
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
    const posts = useSelector(state => state.posts.availablePosts)
    const scrollIndex = props.scrollIndex;
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const profile = useSelector(state => state.profile.userProfile );
    const profile_uid = useSelector(state => state.auth.user)

    const _set_like_comment_share_handler = (item, type_of_interaction, sub_type_of_interaction) => {
        // setIsLike(prev => !prev); 
        // item.isLike = isLike;
        switch(type_of_interaction){
            case postActions.LIKE_UNLIKE:
                dispatch(postActions.updatePostInfo(
                    item.postId,
                    type_of_interaction,
                    item.description, 
                    item.checkin_location, 
                    sub_type_of_interaction === postActions.LIKE ? postActions.LIKE : postActions.UNLIKE, 
                    sub_type_of_interaction === postActions.LIKE ? item.likeInfo.like_count+1 : item.likeInfo.like_count-1,
                    profile_uid.uid,
                    null,
                    item.commentInfo.comment_count,
                    null,
                    item.commentInfo.comment,
                    item.shareInfo.share_count,
                    null
                ));
                break;
            case postActions.COMMENT_UNCOMMENT:
                dispatch(postActions.updatePostInfo(
                    item.postId,
                    type_of_interaction,
                    item.description, 
                    item.checkin_location, 
                    null, 
                    item.likeInfo.like_count,
                    null,
                    sub_type_of_interaction === postActions.COMMENT ? postActions.COMMENT : postActions.UNCOMMENT,
                    sub_type_of_interaction === postActions.COMMENT ? item.commentInfo.comment_count+1 : item.commentInfo.comment_count-1,
                    profile_uid.uid,
                    sub_type_of_interaction === postActions.COMMENT ? comment : null,
                    item.shareInfo.share_count,
                    null
                ));
                break;
            default: 
                dispatch(postActions.updatePostInfo(
                    item.postId,
                    postActions.SHARE_POST,
                    item.description, 
                    item.checkin_location, 
                    null, 
                    item.likeInfo.like_count,
                    null,
                    null,
                    item.commentInfo.comment_count,
                    null,
                    item.commentInfo.comment,
                    item.shareInfo.share_count+1,
                    profile_uid.uid
                ));
                break;
        }
        
    }

    const _postEditHandler = (postEditId, postEditImage) => {
        console.log('postEditId', postEditId)
        props.navigation.navigate('PostDescriptionStack', {
            postEditId: postEditId,
            postEditImage: postEditImage
        })
    }

    // const _openCommentHandler = () => {
    //     setIsOpentComment(prev => !prev);
    // }
    
    return(
        <View style={styles.container}>
            <View style={styles.modalHeader}>
                <Icon3 onPress={() => {props.navigation.goBack(); console.log(posts)}} name='ios-arrow-round-back' size={40} style={{marginLeft: 10}}/>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT, 
                    offset: ITEM_HEIGHT * index, 
                    index,
                })}
                initialScrollIndex={scrollIndex}
                data={posts}
                keyExtractor={(item) => item.postId}
                renderItem={itemData => {
                    let likeCount = itemData.item.likeInfo
                    return(
                        <PostItem
                            userName={profile.userName}
                            userAvatar={profile.userAvatar}
                            postImage={itemData.item.postImage}
                            description={itemData.item.description}
                            comment_count={itemData.item.commentInfo.comment_count}
                            like_count={itemData.item.likeInfo.like_count}
                            comment={comment}
                            commentList={itemData.item.commentInfo.user_comments}
                            _sendCommentHandler={() => _set_like_comment_share_handler(itemData.item, postActions.COMMENT_UNCOMMENT, postActions.COMMENT)}
                            // user_commenter_avatar={firestore().collection('users').doc(`${itemData.item.commentInfo.user_comments[`${profile_uid.uid}`]}`)}
                            _commentHandler={(text) => setComment(text)}
                            _postEditHandler={() => _postEditHandler(itemData.item.postId, itemData.item.postImage)}
                            _set_like_comment_share_handler={() => _set_like_comment_share_handler(itemData.item, postActions.LIKE_UNLIKE, postActions.LIKE)}
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