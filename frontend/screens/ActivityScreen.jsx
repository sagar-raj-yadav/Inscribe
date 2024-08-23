import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from 'jwt-decode'; //note->  {jtwDecode} ko curly braces me hi rakhna nii to error aa jayega 
import axios from 'axios';
import { UserType } from '../UserContext'; // Ensure this path is correct
import User from './User';

const ActivityScreen = () => {
  const [selectedButton, setSelectedButton] = useState("All");
  
  const [alluser, setalluser] = useState([]);
  const [allfollowing,setallfollowing]=useState([]);

  const { userId, setUserId } = useContext(UserType);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  

const fetchUsers = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setUserId(userId);

    const response = await axios.get(`http://192.168.29.100:5000/user/${userId}`);
    setalluser(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

useEffect(() => {
  fetchUsers();
}, []);



//following
const fetchFollowing = async () => {
  try {
    const response = await axios.get(`http://192.168.29.100:5000/user/${userId}/following`);
    setallfollowing(response.data);
  } catch (error) {
    console.error("Error fetching following users:", error);
  }
};

useEffect(() => {
  fetchFollowing();
}, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Activity</Text>

      <View style={styles.buttonContainer}>
        {["All", "Followers", "Following"].map(button => (
          <TouchableOpacity
            key={button}
            onPress={() => handleButtonClick(button)}
            style={[
              styles.button,
              selectedButton === button ? styles.selectedButton : null,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === button ? styles.selectedButtonText : styles.buttonText,
              ]}
            >
              {button.charAt(0).toUpperCase() + button.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        {selectedButton === 'All' && (
          <View style={{marginTop:20}}>
            {alluser.map((item, index) => (
              <User key={index} item={item} />
            ))}
          </View>
         

        )}
      </View>

      <View>
        {selectedButton === 'Following' && (
          {/* <View style={{marginTop:20}}>
            {allfollowing.map((item, index) => (
              <User key={index} item={item} />
            ))}
          </View> */}
        )}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "white",
    borderColor: "#D0D0D0",
    borderRadius: 6,
    borderWidth: 0.7,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: "black",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default ActivityScreen;
