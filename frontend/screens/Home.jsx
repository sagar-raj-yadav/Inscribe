import { StyleSheet, Text, Image, View, Alert,ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useContext, useState, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from 'jwt-decode';
import { UserType } from '../UserContext';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation();

  const { userId, setUserId } = useContext(UserType);
  const [post, setPost] = useState([]);

  const fetchUsers = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setUserId(userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://192.168.29.100:5000/getpost`);
      setPost(response.data);
    } catch (error) {
      console.log("error fetching post", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPost();
    }, [])
  );

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(`http://192.168.29.100:5000/post/${postId}/${userId}/like`);
      const updatedPost = response.data;

      const updatedLikePosts = post.map((item) =>
        item._id === updatedPost._id ? updatedPost : item
      );

      setPost(updatedLikePosts);
    } catch (error) {
      console.log("error liking post", error);
    }
  };

  const handleUnLike = async (postId) => {
    try {
      const response = await axios.put(`http://192.168.29.100:5000/post/${postId}/${userId}/unlike`);
      const updatedPost = response.data;

      const updatedLikePosts = post.map((item) =>
        item._id === updatedPost._id ? updatedPost : item
      );

      setPost(updatedLikePosts);
    } catch (error) {
      console.log("error unliking post", error);
    }
  };

  const handleAction = (postId, isLiked) => {
    if (isLiked) {
      handleUnLike(postId);
    } else {
      handleLike(postId);
    }
  };
  
  
//delete post
  const handleDelete = (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.29.100:5000/post/${postId}/${userId}/delete`);
              const updatedPosts = post.filter((item) => item._id !== postId);
              setPost(updatedPosts);
              console.log("Post deleted successfully");
            } catch (error) {
              console.log("Error deleting post", error);
            }
          },
          style: "destructive", // Optional: Adds a red color to the "Yes" button on iOS
        },
      ],
      { cancelable: false }
    );
  };

  const imageSources = [
    require('../assets/nature1.jpeg'),
    require('../assets/nature2.jpeg'),
    require('../assets/nature3.jpeg'),
    require('../assets/nature4.jpeg'),
    require('../assets/nature5.jpeg'),
    require('../assets/nature6.jpeg'),
    require('../assets/nature7.jpeg'),
    require('../assets/nature8.jpeg'),
    require('../assets/nature9.jpeg'),
    require('../assets/nature10.jpeg'),
  ];

  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
      </View>

      <View style={styles.postContainer}>
        {post.map((post, index) => (
          <View key={index} style={styles.post}>
            <View style={styles.postHeader}>
              <Image 
                style={styles.userImage}
                source={require('../assets/man.png')}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{post.user.name}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
              </View>
              {post.user._id === userId &&(
              <MaterialIcons onPress={()=>handleDelete(post._id)} style={styles.cancelIcon}  name="cancel" size={20} color="red" />
            )}
            </View>

        <View>
           <Image
            style={styles.contentImage}
            source={imageSources[Math.floor(Math.random() * 10)]}
            resizeMode="strech"
             />
        </View>
        
            <View style={styles.postFooter}>
              <View style={styles.actionIcons}>
                <AntDesign 
                  onPress={() => handleAction(post._id, post.likes.includes(userId))}
                  name="hearto" 
                  size={24} 
                  color={post.likes.includes(userId) ? "red" : "black"} 
                />
            <TouchableOpacity onPress={()=>{navigation.navigate("comment")}}><Text> <EvilIcons name="comment" size={30} color="black" /> </Text></TouchableOpacity>
            <AntDesign name="sharealt" size={22} color="black" />
              </View>
              <Text style={styles.postStats}>
                {post.likes.length} likes · {post.replies.length} reply
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
  postContainer: {
    paddingHorizontal: 10,
  },
  contentImage:{
    height:200,
    width:330
  },
  post: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#495057',
  },
  postFooter: {
    marginTop: 4,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 1,
    gap: 10,
  },
  postStats: {
    fontSize: 13,
    color: 'grey',
  },
  cancelIcon: {
    position: 'absolute', // Add this
    top: 1, // Adjust as needed
    right: 1, // Adjust as needed
  },

});

export default Home;
