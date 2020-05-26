'use strict'

import React, {useState} from 'react';
import {
    View,
    Text, 
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import CommentItem from '../../components/post/CommentItem'

import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const HEADER_HEIGHT = WIDTH/7;
const ITEM_HEIGHT = HEADER_HEIGHT+WIDTH;

const PostItem = props => {

    const [isOpenComment, setIsOpentComment] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [commentInput, setCommentInput] = useState('')
    const profile = useSelector(state => state.profile.userProfile );
    const profile_uid = useSelector(state => state.auth.user);
    const commentList = props.commentList;
    
    return(
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <TouchableOpacity style={styles.postOwnerImage}>
                    <Image style={[styles.image, {borderRadius: 20}]} source={{uri: props.userAvatar}} />
                </TouchableOpacity>
                <View style={styles.postOwnerNameContainer}>
                    <Text style={styles.postOwnerName}>{props.userName}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.post_moreInfo} 
                    // onPress={() => console.log('like_count', !itemData.item.likeInfo.like_count)}
                >
                    <Feather name='trash' size={23} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.post_moreInfo} 
                    onPress={props._postEditHandler}
                >
                    <Feather name='edit-2' size={23} />
                </TouchableOpacity>
            </View>
            <View style={styles.postImage}>
                <Image 
                    style={styles.image} 
                    source={{uri: props.postImage }}
                />
            </View>
            <View style={styles.postInteractionContainer}>
                <View style={styles.interactionIcons}>
                    <TouchableOpacity style={styles.post_moreInfo} onPress={() => {
                        props._set_like_comment_share_handler();
                        setIsLike(prev => !prev);
                    }} >
                        {/* {!likeCount.like_count && <EvilIcons name='heart' size={40} /> } */}
                        <FontAwesome name='heart' size={27} style={{color: (isLike || props.like_count >= 1) ? 'red' : 'black', marginLeft: 5, marginRight: 8, marginTop: 2}} />
                        
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.post_moreInfo} onPress={() => setIsOpentComment(prev => !prev)} >
                        <EvilIcons name='comment' size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.post_moreInfo} >
                        <EvilIcons name='share-google' size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.likeCounter}>
                    {/* <Text style={{marginLeft: 10}}><Text style={{fontWeight: 'bold'}}>AlexDree</Text> and <Text style={{fontWeight: 'bold'}}>{itemData.item.likeInfo.like_count} others</Text> love this</Text> */}
                    <Text style={{marginLeft: 10}}><Text style={{fontWeight: 'bold'}}>{props.like_count} people</Text> love this</Text>
                </View>
                <View style={styles.postCaption}>
                    {
                    props.description &&
                        <Text style={{marginLeft: 10}}>
                            <Text style={styles.postOwnerName}>{props.userName} </Text>{props.description}
                        </Text>
                    }
                </View>
                <TouchableOpacity style={styles.commentCounter} onPress={() => {setIsOpentComment(prev => !prev); console.log(profile)}}>
                    <Text style={{color: 'grey', marginLeft: 10}}>See all {props.comment_count} comments</Text>
                </TouchableOpacity>

                <Modal
                    visible={isOpenComment}
                    animated={true}
                    animationType='slide'
                    presentationStyle='pageSheet'
                >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={{flex: 1}}>
                            <View style={comment_modal_styles.header}>
                                <TouchableOpacity style={{flex: 7, flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome name='heart' size={20} color='red' style={{marginLeft: 10,}} />
                                    <Text style={{marginLeft: 5, fontSize: 20}}>534</Text>
                                    <Ionicons name='ios-arrow-forward' size={27} style={{marginLeft: 10,}} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1,justifyContent: 'center', alignItems: 'center'}} onPress={() => setIsOpentComment(false)}>
                                    <MaterialIcons name='cancel' size={25} />
                                </TouchableOpacity>
                            </View> 
                            <View>
                                <FlatList 
                                    data={[1,2,3,4,5,6,7,8,9,10]}
                                    keyExtractor={item => item}
                                    renderItem={itemData => {
                                        return(
                                            <CommentItem
                                                userAvatar={profile.userAvatar}
                                            />
                                        )
                                    }}
                                />
                            </View>
                            <View style={comment_modal_styles.commentInputContainer}>
                                <TouchableOpacity style={{marginLeft: 15}}>
                                    <FontAwesome name='camera-retro' size={25} />
                                </TouchableOpacity>
                                <View style={comment_modal_styles.commentInput}>
                                    <TextInput
                                        placeholder='What are your thoughts?'
                                        value={commentInput}
                                        onChangeText={text => setCommentInput(text)}
                                        multiline={true}
                                        style={{flex: 1}}
                                    />
                                    <Ionicons name='md-paper-plane' size={23} onPress={() => props._sendCommentHandler()} 
                                        style={{marginRight: 20}} 
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </View>
    )
}

export default PostItem;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white'
    },
    modalHeader:{
        borderBottomColor: Colors.borderLine, borderBottomWidth: 1,
        // height: WIDTH/7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    postContainer:{
        // borderColor: 'black', borderWidth: 1,
        marginBottom: 15
    },
    postHeader:{
        // borderColor: 'black', borderWidth: 1,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postOwnerImage:{
        height: 40,
        width: 40,
        marginLeft: 10
    },
    postOwnerNameContainer:{
        // borderColor: 'black', borderWidth: 1,
        marginLeft: 10,
        flex: 5
    },
    postOwnerName:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    post_moreInfo:{
        // borderColor: 'black', borderWidth: 1,
        marginRight: 10,
        // flex: 1,
        
    },
    postImage:{
        // borderColor: 'black', borderWidth: 1,
        height: WIDTH,
        width: WIDTH,
    
    },
    image:{
        flex: 1,
        height: null,
        width: null
    },
    postInteractionContainer:{
        // borderColor: 'black', borderWidth: 1,
        width: WIDTH
    },
    interactionIcons:{
        // borderColor: 'black', borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingLeft: 5
    },
    likeCounter:{
        // borderColor: 'black', borderWidth: 1,
        marginBottom: 5
    },
    postCaption:{
        // borderColor: 'black', borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 5
    },
    commentCounter:{
        marginBottom: 5
    },
    commentSection:{
        // borderColor: 'black', borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    comment_person_avatar:{
        // borderColor: 'black', borderWidth: 1,
        height: 30,
        width: 30,
        borderRadius: 15,
        marginLeft: 10,
        // flex: 1
    },
    commentBox:{
        // flex: 8,
        // borderColor: 'black', borderWidth: 1,
        flex: 1,
        marginLeft: 10
    }
})
const comment_modal_styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        borderBottomColor: Colors.commentBox,
        borderBottomWidth: 0.5,
        paddingVertical: 10
    },
    commentInputContainer:{
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: WIDTH,
        borderTopColor: Colors.commentBox,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentInput:{
        marginHorizontal: 10,
        backgroundColor: '#F5F9F5',
        borderRadius: 20,
        marginVertical: 5,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
})