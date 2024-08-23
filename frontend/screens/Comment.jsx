import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from '@expo/vector-icons/AntDesign';

const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment(""); // Clear the input field after adding the comment
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comments:</Text>
      <ScrollView style={styles.commentList}>
        {comments.map((c, index) => {
          return (
            
            <View style={styles.commentlist}  key={index}>
              <Image
                style={styles.image}
                source={require("../assets/man.png")}
                resizeMode="cover"
              />
              <Text key={index} style={styles.comment}>
                {c}
              </Text>
              <AntDesign 
                  name="hearto" 
                  size={24} 
                  color="black"
                  
                />
            </View>
            
            
            
            
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Image
          style={styles.image}
          source={require("../assets/man.png")}
          resizeMode="cover"
        />
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={handleCommentChange}
          placeholder="Type your comment here..."
          multiline
        />
        <FontAwesome
          onPress={handleAddComment}
          style={styles.button}
          name="send"
          size={30}
          color="black"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginBottom:15,
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    fontSize: 15,
    height: 50,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 10,
    textAlignVertical: "top",
    flex: 1,
    borderRadius: 10,
  },
  button: {
    marginBottom: 20,
    paddingLeft: 10,
  },
  commentList: {
    flex: 1,
  },
  comment: {
    fontSize: 16,
    marginBottom: 5,
    padding: 10,
    width:"100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ddd",
  },
  
  footer: {
    flexDirection: "row",
    alignItems: "space-between",
    marginTop: 10,
  },
  commentlist:{
    flexDirection: "row",
    alignItems: "space-between",
    marginTop: 10,
  }
});

export default Comment;
