import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default class AnalogClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
      hourDeg: new Animated.Value(0),
      minuteDeg: new Animated.Value(0),
      secondDeg: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.updateClock();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date(),
    });
  }

  updateClock() {
    const { currentTime, hourDeg, minuteDeg, secondDeg } = this.state;
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const hourRotation = hours * 30 + minutes * 0.5; // 30 degrees per hour, 0.5 degrees per minute
    const minuteRotation = minutes * 6 + seconds * 0.1; // 6 degrees per minute, 0.1 degrees per second
    const secondRotation = seconds * 6; // 6 degrees per second

    Animated.timing(hourDeg, {
      toValue: hourRotation,
      duration: 0,
      useNativeDriver: true,
    }).start();
    Animated.timing(minuteDeg, {
      toValue: minuteRotation,
      duration: 0,
      useNativeDriver: true,
    }).start();
    Animated.timing(secondDeg, {
      toValue: secondRotation,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      this.updateClock();
    });
  }

  render() {
    const { hourDeg, minuteDeg, secondDeg } = this.state;

    const hourRotate = hourDeg.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    const minuteRotate = minuteDeg.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    const secondRotate = secondDeg.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
      extrapolate: 'extend'
    });

    return (
      <View style={styles.container}>
        <View style={styles.clock}>
          <Animated.View style={[styles.hour, { transform: [{ rotate: hourRotate }] }]} />
          <Animated.View style={[styles.minute, { transform: [{ rotate: minuteRotate }] }]} />
          <Animated.View style={[styles.second, { transform: [{ rotate: secondRotate }] }]} />
          <View style={styles.centerPoint} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  clock: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 5,
    borderColor: '#f2a62c',
    position: 'relative',
  },
  hour: {
    position: 'absolute',
    backgroundColor: '#f2a62c',
    height: 60,
    width: 8,
    top: 40,
    borderRadius: 4,
    left: 98,
    transformOrigin: 'bottom center',
  },
  minute: {
    position: 'absolute',
    backgroundColor: '#fcdeae',
    height: 90,
    width: 4,
    top: 10,
    left: 99,
    borderRadius: 4,
    transformOrigin: 'bottom center',
  },
  second: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 90,
    width: 4,
    top: 8,
    left: 99,
    borderRadius: 4,
    transformOrigin: 'bottom center',
  },
  centerPoint: {
    position: 'absolute',
    backgroundColor: 'yellow',
    height: 12,
    width: 12,
    borderRadius: 6,
    top: 94,
    left: 94,
  },
});
