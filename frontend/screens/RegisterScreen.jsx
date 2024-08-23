import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Image, SafeAreaView, KeyboardAvoidingView, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = () => {
        if (!name || !email || !password) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            return;
        }
        
        const user = { name, email, password };
        axios.post(`http://192.168.29.100:5000/signup`, user)
            .then((response) => {
                console.log(response);
                Alert.alert("Signup Successful");
                setName("");
                setEmail("");
                setPassword("");
                navigation.navigate("Login"); // Navigate to Login after successful signup
            })
            .catch((error) => {
                console.error("Signup error:", error);
                Alert.alert("Signup Failed", "Please try again.");
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
                        <Text style={styles.headerText}>Sign Up to Your Account</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <FontAwesome6 name="person" style={styles.icon} size={24} color="gray" />
                            <TextInput
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={styles.input}
                                placeholder='Enter your Full Name'
                                placeholderTextColor="gray"
                            />
                        </View>

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
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Pressable onPress={handleSignup} style={styles.signupButton}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
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
    signupButton: {
        width: 200,
        backgroundColor: "black",
        padding: 8,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
    },
    signupButtonText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        color: "white",
    },
    loginText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,
    },
    loginLink: {
        color: "#007fff",
        fontWeight: "500",
    },
});

export default RegisterScreen;
