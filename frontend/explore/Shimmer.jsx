import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Shimmer = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.8],
  });

  return (
    <>
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity,
          },
        ]}
      />
    </View>
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity,
          },
        ]}
      />
    </View>
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity,
          },
        ]}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 8,
  },
});

export default Shimmer;
