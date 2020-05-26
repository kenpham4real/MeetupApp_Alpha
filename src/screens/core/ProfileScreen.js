"use strict"
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Image,
    View,
    StyleSheet,
    Alert,
    Dimensions,
    Button,
    Animated,
    Text,
    Modal,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';

import * as postActions from '../../../store/actions/post/post';
import Colors from '../../constants/Colors';
import InfoDisplay from '../../components/profile/InfoDisplay';
import PostView from './Post/PostView'
import {findMidOfThree} from '../../helper/ArrayFunctions'

const WIDTH = Dimensions.get('window').width;
const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 100;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
const HYPOTENUSE = Math.sqrt((WIDTH**2) + (HEADER_MAX_HEIGHT**2));
const INITIAL_PROFILE_IMAGE_MARGIN_LEFT = Math.sqrt((HYPOTENUSE/2)**2 - (HEADER_MAX_HEIGHT/2)**2);
const NUM_COLUMNS = 3;
const POST_IMAGE_MARGIN_HORIZONTAL = 5;

// TODO: 1. Image picker for background image
// TODO: 2. Add image picker for profile image
const imgData = [
    {id: 1, postImage: '../../../assets/images/beach.jpg'},
    {id: 2, postImage: '../../../assets/images/beach.jpg'},
    {id: 3, postImage: '../../../assets/images/beach.jpg'},
    {id: 4, postImage: '../../../assets/images/beach.jpg'},
    {id: 5, postImage: '../../../assets/images/beach.jpg'},
    {id: 6, postImage: '../../../assets/images/beach.jpg'},
    {id: 7, postImage: '../../../assets/images/beach.jpg'},
    {id: 8, postImage: '../../../assets/images/beach.jpg'},
    {id: 9, postImage: '../../../assets/images/beach.jpg'},

];
const testArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const ProfileScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const [isFollowed, setIsFollowed] = useState(false);
    const [firstFollow, setFirstFollow] = useState(false);
    const [isOpenPostViewModal, setIsOpenPostViewModal] = useState(false);
    const [postImageUri, setPostImageUri] = useState('');
    const [scrollIndex, setScrollIndex] = useState(0);

    const trips = useSelector(state => state.trips.availableTrips);
    const posts = useSelector(state => state.posts.availablePosts);
    const profile = useSelector(state => state.profile.userProfile );
    const dispatch = useDispatch();
    const scrollY = useRef(new Animated.Value(0)).current;
    
    
    // Fetching posts from Firebase server
    const loadPosts = useCallback(async() => {
        setError(null);
        setIsRefreshing(true);
        try {
            dispatch(postActions.fetchPost());
        } catch (err) {
            console.log(error);
            setError(error.message);
        }
        setIsRefreshing(false);
        
    },[dispatch, setIsRefreshing, setError])

    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus',() => loadPosts());
    //     return unsubscribe; 
    // },[loadPosts])


    useFocusEffect(useCallback (() => {
        console.log('focus effect in ProfileScreen');
        loadPosts();
    },[dispatch,setIsRefreshing,setError]))

    useEffect(() => {
        setIsLoading(true);
        loadPosts().then(
            setIsLoading(false),

        );
    }, [dispatch, loadPosts]);

    // Option configuration for the camera picker
    const options = {
        title: 'Select your photo from',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

    /*******************************************************
     Animating functions: */
    
    // Animation for the HEIGHT of the background cover
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT], // [0, 50]
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], // [120,70]
        extrapolate: 'clamp'
    });

    // Animation for the Z_INDEX of the bacground cover
    const headerZindex = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
        outputRange: [0, 0, 1000],
        extrapolate: 'clamp'
    });
    
    // Animation for the HEIGHT (and WIDTH) of the profile avatar
    const profileImageHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT-10],
        outputRange: [PROFILE_IMAGE_MAX_HEIGHT,PROFILE_IMAGE_MIN_HEIGHT],
        extrapolate: 'clamp'
    });
  
    // Animation for the MARGIN_TOP of the profile avatar
    const profileImageMarginTop = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [
          HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
          HEADER_MIN_HEIGHT /2 - PROFILE_IMAGE_MIN_HEIGHT/2
        ],
        extrapolate: 'clamp'
    });

    // Animation for the MARGIN_LEFT of the profile avatar
    const profileImageMarginLeft = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [
            WIDTH/2 - PROFILE_IMAGE_MAX_HEIGHT/2,
            10
        ],
        extrapolate: 'clamp'
    })

    // Animation for the COLOR of the title (user name)
    const headerTitleColor = scrollY.interpolate({
        inputRange: [0, 50, 70, 80, 90, 100],
        outputRange: ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'white'],
        extrapolate: 'extend'
    });

    const tabBarPosition = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [(HEADER_MAX_HEIGHT+PROFILE_IMAGE_MAX_HEIGHT/2+5)*2-10, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    })

    const infoHeight = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [HEADER_MAX_HEIGHT+PROFILE_IMAGE_MAX_HEIGHT/2+5, -80],
        extrapolate: 'clamp'
    })

    /********************************************************/

    // Handle image picker
    const imagePickerHandler = () => {
        console.log('posts', posts)
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // We can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPostImageUri(response.uri);
                console.log('response.uri', response.uri);
                props.navigation.navigate('PostDescriptionStack', {
                    postImageUri: response.uri,
                    
                });
            }
        });
    }

    // Handle user follow
    const onFollow = () => {
        if(!isFollowed){
            setIsFollowed(true);
            setFirstFollow(true);
        }else{
            if(firstFollow){
                Alert.alert(
                    'Are you sure you want to unfollow this person?',
                    null,
                    [
                        {text: 'OK', onPress: () => setIsFollowed(false)},
                        {text: 'Cancel'}
                    ]
                )
            }
        }
    };

    // The first component in the list, containing user name, bio, follow + share buttons, follow numbers
    const _render_Sitcky_Info_View = () => {
        return(
            <Animated.View style={{
                position: 'absolute',
                top: infoHeight,
                backgroundColor: 'white'
            }}>
                <InfoDisplay
                    isFollowed={isFollowed}
                    onFollow={onFollow}
                    userName={profile.userName}
                    tripsNumber={trips.length}
                    pickImage={imagePickerHandler}
                    navigateToTripsListScreen={() => props.navigation.navigate('TripsListScreen')}
                />

                <Animated.View style={[styles.followDisplay,{
                    backgroundColor: 'white'
                }]}
                >
                    <TouchableOpacity style={styles.followNum}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>100</Text>
                        <Text style={{color: 'grey',fontSize: 17,}}> Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.followNum}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>1000</Text>
                        <Text style={{color: 'grey',fontSize: 17}}> Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tripButton} onPress={props.navigateToTripsListScreen}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{props.tripsNumber}</Text>
                        <Text style={{ fontSize: 17, marginBottom: 5, color: 'grey'}}>Trips</Text>
                    </TouchableOpacity>
                    
                </Animated.View>
                
            </Animated.View>
        )
    }

    return(
        <View 
            style={styles.container}
            // onStartShouldSetResponderCapture={() => setEnableScrollViewScroll(true)}
        >
            <Animated.View style={[styles.backgroundImage, {
                height: headerHeight,
                zIndex: headerZindex,
                elevation: 3,
                justifyContent: 'center',
            }]}>
                
                <Image 
                    source={require('../../../assets/images/beach.jpg')} 
                    style={{
                        flex: 1,
                        
                    }}
                />
                <View style={{
                    position: 'absolute',
                    left: 60,
                }}>
                    <Animated.Text style={{color: headerTitleColor, fontSize: 20, fontWeight: 'bold'}}>{profile.userName}</Animated.Text>
                </View>                
                <Animated.View style={[styles.profileImgContainer,{
                    height: profileImageHeight,
                    width: profileImageHeight,
                    borderRadius: PROFILE_IMAGE_MAX_HEIGHT/2,
                    position: 'absolute',
                    top: profileImageMarginTop,
                    left: profileImageMarginLeft,
                    alignSelf: 'center'
                }]}>                         
                    <Image source={{uri: profile.userAvatar}} style={styles.profileImg} />
                </Animated.View>
                
            </Animated.View>
                    
            <Animated.FlatList
                style={StyleSheet.absoluteFill}
                contentContainerStyle={{
                    paddingLeft: parseInt(WIDTH - ((WIDTH/3.5)*3) - 4*POST_IMAGE_MARGIN_HORIZONTAL ) / 2 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    
                )}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                bounces={true}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={posts}
                numColumns={NUM_COLUMNS}
                keyExtractor={item => item.postId}
                renderItem={(itemData) => {
                    return(
                        <TouchableOpacity 
                            onPress={() => {
                                setScrollIndex(itemData.index);
                                // setIsOpenPostViewModal(true);
                                props.navigation.navigate('PostView', {
                                    posts: posts
                                })
                        }} 
                            style={{
                                marginHorizontal: findMidOfThree(posts, itemData.index) ? 0 : POST_IMAGE_MARGIN_HORIZONTAL ,
                                marginVertical: 3,
                                shadowColor: 'black',
                                shadowOpacity: 0.26,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 8,
                                elevation: 7,
                        }}>
                            <Image source={{uri: itemData.item.postImage}} style={{
                                height: WIDTH/3.5, 
                                width: WIDTH/3.5,
                                borderColor: 'white',
                                borderWidth: 2,
                                borderRadius: 7,
                            }} />
                        </TouchableOpacity>
                    )
                }}
                ListHeaderComponent={() => (
                    <View style={{height: HEADER_MAX_HEIGHT*4-70}} />
                )}
                
                {...props}
            />
            {_render_Sitcky_Info_View()}
            
            {
                isLoading && 
                    <View style={styles.loadingStyle}>
                        <ActivityIndicator size='large' color={Colors.primary} />
                    </View>
            }
            {
                !isLoading  && posts.length < 1 &&
                    <View style={styles.loadingStyle}>
                        <Text style={{marginBottom: 10, fontSize: 17}}>No posts created. Let's make some!</Text>
                        <TouchableNativeFeedback onPress={imagePickerHandler}><Icon style={{alignSelf: 'center'}} name='camera-retro' size={40} /></TouchableNativeFeedback>
                    </View>
            }
            {
                error && 
                    <View style={styles.loadingStyle}>
                        <Text>An error occurred!</Text>
                        <Button
                        title="Try again"
                        onPress={loadPosts}
                        color={Colors.primary}
                        />
                    </View>
            }

            {/* <Modal
                visible={isOpenPostViewModal}
            >
                    <View style={styles.modalHeader}>
                        <Icon3 onPress={() => setIsOpenPostViewModal(false)} name='ios-arrow-round-back' size={40} style={{marginLeft: 10}}/>
                    </View>
                    <PostView
                        posts={posts}
                        postUserName={profile.userName}
                        postOwnerAvatar={profile.userAvatar}
                        postDescription={posts.description}
                        scrollIndex={scrollIndex}
                    />
            </Modal> */}
            
        </View>
    );
};

export default ProfileScreen;


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1
    },
    backgroundImage: {
        // borderColor: 'black', borderWidth: 4,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImgContainer:{
        borderWidth: 2,
        borderColor: 'white',
        overflow: 'hidden',
        
    },
    profileImg:{
        height: null,
        width: null,
        flex: 1,
    },
    followDisplay:{
        // borderColor: 'black', borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    followNum:{
        // borderColor: 'black', borderWidth: 2,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },
    tripButton:{
        // borderColor: 'black', borderWidth: 2,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },
    loadingStyle:{
        // overflow: 'hidden', 
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        top: HEADER_MAX_HEIGHT*4,
        alignSelf: 'center'
    },
    modalHeader:{
        borderBottomColor: Colors.borderLine, borderBottomWidth: 1,
        height: WIDTH/7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }

})
