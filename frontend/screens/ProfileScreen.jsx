import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState({});

  const userData = async () => {
    try {
      const response = await axios.get(`http://192.168.29.100:5000/getuser/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    userData();
  }, [userId]);

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Logout successful");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={require('../assets/man.png')}
      />
      <Text style={styles.userName}>UserName: {user.name}</Text>
      <Text style={styles.userEmail}>Email: {user.email}</Text>
      <Text style={styles.userStats}>Followers: {user.followers ? user.followers.length : 0}</Text>
      <Text style={styles.userStats}>Following: {user.sentFollowRequest ? user.sentFollowRequest.length : 0}</Text>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Light background color
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: 24,
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  userStats: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff6347', // Stylish color for the button
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
