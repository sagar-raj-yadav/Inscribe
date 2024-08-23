import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';



const ExploreCard = ({ imageUri,name }) => {

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.images}
          resizeMode="cover"
        />
        <View style={styles.footer}>
          <Image
            style={styles.image}
            source={require("../assets/man.png")}
            resizeMode="cover"
          />
          <Text style={styles.profileName}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    position: 'relative',
  },
  images: {
    width: '100%',
    height: 205,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: '#d86719',
    borderWidth: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 6,
  },
  profileName: {
    color: 'white',
    paddingLeft:10,

    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ExploreCard;
