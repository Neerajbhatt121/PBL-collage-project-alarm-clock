import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const StopWatch = () => {
  const [timer, setTimer] = useState(0);
  const [IsActive, setIsActive] = useState(false);
  const [IsPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  const [lapTime, setLapTime] = useState([]);

  // Start Button
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 100);
  };
  // Pause Button
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };
  // continue Button
  const handleContinue = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 100);
  };
  // Reset
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
    setLapTime([]);
  };
  // Lap
  const handleLap = () => {
    setLapTime([...lapTime, timer]);
  };
  // Time value for display
  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 10); // Convert milliseconds to tenths of a second
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const milliseconds = Math.floor(time % 10);
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")} : ${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.png")}
      style={styles.background}
      blurRadius={80}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>

        {lapTime.length > 0 && (
          <View style={styles.scrollview}>
            <Text style={styles.lapText}> Lap    :    min    :    sec    :   milli</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {lapTime.map((lapTime, index) => (
                <Text key={index} style={styles.lapText}>{`Lap   ${
                  index + 1
                }   :    ${formatTime(lapTime)}`}</Text>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {!IsActive && !IsPaused ? (
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Feather name="power" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <>
              {!IsPaused ? (
                <TouchableOpacity style={styles.button} onPress={handleLap}>
                  <FontAwesome name="pencil-square-o" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                  <Ionicons name="reload" size={24} color="black" />
                </TouchableOpacity>
              )}

              {IsPaused ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleContinue}
                >
                  <Feather name="play" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handlePause}>
                  <AntDesign name="pause" size={24} color="black" />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#2b2823",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    borderWidth:2,
    borderColor: "#f2a62c",
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    alignItems: "center",
    justifyContent: "center",
    top: -100,
  },
  timer: {
    fontSize: 45,
    fontWeight: "400",
    color: "#e8b564",
  },
  buttonContainer: {
    flexDirection: "row",
    position: "relative",
  },
  button: {
    width: 80,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#fcdeae",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  scrollview: {
    height: 200,
    width: 350,
    top: -60,
  },
  lapText: {
    fontSize: 20,
    margin: 5,
    color: "#e8b564",
    textAlign: "center",
    fontWeight: "200",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch', 'contain'
    justifyContent: "center",
  },
});

export default StopWatch;
