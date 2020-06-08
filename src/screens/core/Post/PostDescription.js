'use strict'

import React , {useState} from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    StyleSheet,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Switch,
    Keyboard,

} from 'react-native';
import {
    Layout, Button
} from '@ui-kitten/components';
import 'react-native-get-random-values';
import {v4 as uuid_v4, v1 as uuid_v1} from 'uuid';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import moment from 'moment'
import * as postActions from '../../../../store/actions/post/post';
import Colors from '../../../constants/Colors'

const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678,
};

const NAME_SPACE = '6e62ad3e-9440-11ea-bb37-0242ac130002';

const PostDescription = (props) => {
    
    const [facebook_toggleState, set_facebook_toggleState] = useState(false);
    const [instagram_toggleState, set_instagram_toggleState] = useState(false);
    const [twitter_toggleState, set_twitter_toggleState] = useState(false);
    const [checkInLocation, setCheckInLocation] = useState('');
    const [postDescription, setPostDescription] = useState('');

    const {postImageUri} = props.route.params;
    const {postEditId} = props.route.params;
    const {postEditImage} = props.route.params;
    const dispatch = useDispatch();

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }

    const _onSharingPost = () => {
        postEditId
            ? dispatch(postActions.updatePostInfo(postEditId, postDescription,checkInLocation))
            : dispatch(postActions.addPost(uuid_v4(),postImageUri,new Date(),postDescription,checkInLocation));
        props.navigation.setParams({
            postEditId: null,
            postEditImage: null
        })
        props.navigation.navigate('Profile', {
            isFetchPost: true
        });
    }
    return(
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <Layout style={modal_styles.modalContainer}>
                <Layout style={modal_styles.modalHeader}>
                    <Layout style={modal_styles.title}>
                        <Icon3 onPress={() => props.navigation.goBack()} name='ios-arrow-round-back' size={40} style={{marginLeft: 10}}/>
                        <Text style={{fontSize: 19, marginLeft: 20}}>New post!</Text>
                    </Layout>
                    <TouchableOpacity style={modal_styles.shareButton} onPress={_onSharingPost} >
                        <Text style={{fontSize: 19, color: Colors.third, marginRight: 10}}>{postEditId ? 'Update' : 'Share'}</Text>
                    </TouchableOpacity>
                    
                </Layout>
                <Layout style={modal_styles.descriptionInput}>
                    <Image source={{uri: postEditId ? postEditImage : postImageUri}} style={modal_styles.image} />
                    <TextInput
                        value={postDescription}
                        onChangeText={(text) => setPostDescription(text)}
                        placeholder='Describe your post...'
                        style={{flex: 1,marginLeft: 10, fontSize: 16, color: 'grey'}}
                        multiline={true}
                        textAlignVertical= 'center'
                    />
                </Layout>
                <TouchableNativeFeedback onPress={() => postActions.getPathForImageFile(postImageUri)}>
                    <Layout style={modal_styles.tagBox}>
                        <Text style={{fontSize: 17, marginLeft: 20}}>Tag somebody</Text>
                    </Layout>
                </TouchableNativeFeedback>
                <Layout style={modal_styles.tagBox}>
                    <Text style={{fontSize: 17, marginLeft: 20}}>Add a location</Text>
                </Layout>
                <Layout style={modal_styles.shareToBox}>
                    <Text style={{fontSize: 17, marginLeft: 20, marginTop: 10}}>Share to</Text>
                </Layout>
                <Layout style={modal_styles.multiMediaBox}>
                    <Text style={{flex: 4,fontSize: 17, marginLeft: 20}}>Facebook</Text>
                    <View style={modal_styles.shareToggle}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={facebook_toggleState ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => set_facebook_toggleState(prev => !prev)}
                            value={facebook_toggleState}
                        />
                    </View>
                </Layout>
                <Layout style={modal_styles.multiMediaBox}>
                    <Text style={{flex: 4,fontSize: 17, marginLeft: 20}}>Instagram</Text>
                    <View style={modal_styles.shareToggle}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={instagram_toggleState ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => set_instagram_toggleState(prev => !prev)}
                            value={instagram_toggleState}
                        />
                    </View>
                </Layout>
                <Layout style={{
                    height: 60,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 1, 
                    borderBottomColor: Colors.borderLine,
                }}>
                    <Text style={{flex: 4,fontSize: 17, marginLeft: 20, marginBottom: 10}}>Twitter</Text>
                    <View style={modal_styles.shareToggle}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={twitter_toggleState ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => set_twitter_toggleState(prev => !prev)}
                            value={twitter_toggleState}
                        />
                    </View>
                </Layout>
            </Layout>
        </TouchableWithoutFeedback>
    )
}

const modal_styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    modalHeader:{
        borderBottomColor: Colors.borderLine, borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    title:{
        // borderColor: 'black', borderWidth: 1,
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    shareButton:{
        // borderColor: 'black', borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    descriptionInput:{
        borderBottomColor: Colors.borderLine, borderBottomWidth: 1,
        flexDirection: 'row',
    },
    image:{
        height: 60,
        width: 60,
        marginVertical: 10,
        marginLeft: 20
    },
    tagBox:{
        borderBottomColor: Colors.borderLine, borderBottomWidth: 1,
        height: 50,
        justifyContent: 'center',
    },
    shareToBox:{
        height: 60,
        justifyContent: 'center',
    },
    multiMediaBox:{
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    shareToggle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})

export default PostDescription;