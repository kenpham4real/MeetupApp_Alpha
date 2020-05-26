'use strict'

import React from 'react';
import {
    View,
    Text, 
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import Colors from '../../constants/Colors';

const CommentItem = (props) => {
    return(
        <View style={comment_modal_styles.commentUserInfo}>
            <View style={comment_modal_styles.comment_person_avatar_container}>
                <TouchableOpacity style={comment_modal_styles.comment_person_avatar}>
                    <Image style={{flex: 1, height: null, width: null}} source={{uri: props.userAvatar}} />
                </TouchableOpacity>
            </View>
            <View style={comment_modal_styles.commenterContainer}>
                <View style={comment_modal_styles.commentContent}>
                    <TouchableOpacity style={comment_modal_styles.commenterName}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Mogzzer</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 17}}>This is so interesting!</Text>
                </View>
                <View style={comment_modal_styles.commentInteraction}>
                    <TouchableOpacity style={comment_modal_styles.interactionInfo}>
                        <Text>14 hours ago</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={comment_modal_styles.interactionInfo}>
                        <Text>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={comment_modal_styles.interactionInfo}>
                        <Text>Comment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CommentItem;

const comment_modal_styles = StyleSheet.create({
    commentUserInfo:{
        // borderColor: 'black', borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    comment_person_avatar_container:{
        // borderColor: 'black', borderWidth: 1,
        alignSelf: 'stretch'
    },
    comment_person_avatar:{
        // borderColor: 'black', borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 10
    },
    commenterContainer:{
        // borderColor: 'black', borderWidth: 1,
        marginLeft: 5,
        flexDirection: 'column',
        display: 'flex'
    },
    commentContent:{
        // borderColor: 'black', borderWidth: 1,
        backgroundColor: Colors.commentBox,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    commenterName:{
        // borderColor: 'black', borderWidth: 1,
    },
    commentInteraction:{
        // borderColor: 'black', borderWidth: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 15,
    },
    interactionInfo:{
        // borderColor: 'black', borderWidth: 1,
        marginRight: 20
    },
})
