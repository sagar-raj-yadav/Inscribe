import { StyleSheet, Text, Pressable, View, Image, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setTimeout(() => {
            navigation.replace("main");
          }, 400);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = () => {
    const user = { email, password };
    
    if (!email || !password) {
      Alert.alert("Missing Fields", "Email and password not match..Try again");
      return;
    }

    axios.post('http://192.168.29.100:5000/login', user)
      .then((response) => {
        console.log(response);
        Alert.alert("Login Successful");
        setEmail("");
        setPassword("");
        AsyncStorage.setItem("authToken", response.data.token); 
        navigation.navigate("main"); 
      })
      .catch((error) => {
        console.error("Login error:", error);

        if (error.response && error.response.status === 400) {
          Alert.alert("Login Failed", "Invalid credentials. Please try again.");
        } else {
          Alert.alert("Login Failed", "An error occurred. Please try again later.");
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/logo.png')} />
        </View>

        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Login to your Account</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" style={styles.icon} size={24} color="gray" />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder='Enter your Email'
                placeholderTextColor="gray"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Entypo name="lock" style={styles.icon} size={24} color="gray" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder='Enter your Password'
                placeholderTextColor="gray"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.footer}>
              <Text>Keep me logged In</Text>
              <TouchableOpacity>
                <Text style={styles.forgetPasswordText}>Forget Password</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 45 }}>
            <Pressable onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>SignUp</Text></Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 130,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 40,
    width: '90%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D0D0D0',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: 'gray',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgetPasswordText: {
    fontWeight: '500',
    color: '#007fff',
  },
  loginButton: {
    width: 200,
    backgroundColor: "black",
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
  },
  loginButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
  signupText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  signupLink: {
    color: "#007fff",
    fontWeight: "500",
  },
});


export default LoginScreen;
