import { StyleSheet, Text, Image, View, SafeAreaView, TextInput, Button, Alert } from 'react-native';
import { useState, useContext } from 'react';
import { UserType } from '../UserContext'; 
import axios from 'axios';

const ThreadsScreen = () => {
  const [content, setContent] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const handlePostSubmit = () => {
    if(content){
    const postData = { userId };

    if (content) {
      postData.content = content;
    }

    axios.post(`http://192.168.29.100:5000/createpost`, postData)
      .then((response) => {
        setContent("");
        Alert.alert("Success", "Post created successfully");
      })
      .catch((error) => {
        Alert.alert("Error", "Error creating post: " + error.message);
      });
    }
    else{
      Alert.alert("please,write something");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={styles.avatar}
          source={require('../assets/man.png')}
        />
        <Text style={styles.username}>Sagar Raj</Text>
      </View>

      <TextInput 
        value={content} 
        onChangeText={(text) => setContent(text)}
        multiline
        placeholderTextColor={"#6c757d"} 
        placeholder="Type your message..."
        style={styles.textInput}
      />

      <View style={styles.buttonContainer}>
        <Button title="Share Post" onPress={handlePostSubmit} color="#007bff" />
      </View>
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 40,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#495057',
    minHeight: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
