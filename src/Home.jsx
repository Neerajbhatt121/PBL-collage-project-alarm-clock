import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Home = () => {

const [Data, setData] = useState(undefined);

const getApiData = async () => {
  
  try {
    const url = 'https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam';
    const result = await fetch(url);
    const jsonData = await result.json();
    setData(jsonData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

   useEffect(() => {
    getApiData();
  }, [])

  ///////////////////////////////////////

  return (
    <View style={{flex:1}}>
        <TextInput placeholder='Enter City Name' style={styles.input}/>
        {/* <Text>{Data.hour%12}</Text>
        <Text>{Data.minute}</Text> */}
        
    </View>
  )
}


const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    paddingLeft: 25,
    
    
  }
})

export default Home