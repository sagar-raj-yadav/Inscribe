import React, { useEffect, useContext, useState } from 'react';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import { UserType } from '../UserContext'; 

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [Requestsent, setRequestsent] = useState(false);

  const handlePress = () => {
    setRequestsent(!Requestsent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://media.istockphoto.com/id/2155405825/photo/lonely-sad-girl-sad-teen-girl-on-a-bench-in-the-park-single-girl-outdoor.webp?b=1&s=612x612&w=0&k=20&c=Ql2OoUNjBr4JluDLWLmfAPY6bT2FOkebP_Xe18xQ5yU=',
          }}
        />

        <Text style={styles.name}>{item?.name}</Text>

        {Requestsent ? (
          <Pressable style={styles.followingButton} onPress={handlePress}>
            <Text style={styles.followingText}>Following</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.followButton} onPress={handlePress}>
            <Text style={styles.followText}>Follow</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  followButton: {
    borderColor: '#DD0D0D',
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  followText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#DD0D0D',
  },
  followingButton: {
    borderColor: '#DD0D0D',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  followingText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#DD0D0D',
  },
});

export default User;
