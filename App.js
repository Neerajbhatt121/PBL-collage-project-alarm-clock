import { AntDesign, Entypo, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Home from './src/Home';
import StopWatch from './src/StopWatch';
import Timer from './src/Timer';
import Alarm from './src/alarm';
import Game from './src/analog_clock';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator
        
        screenOptions={{
         headerShown: false,
         tabBarShowLabel: false,
         
         tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          backgroundColor: 'transparent',
          height: 60,
          left: 15,
          right: 15,
          borderRadius: 30,
          elevation: 0,
          borderColor: 'white',
          borderWidth: 0.5,
          
         }
        }} >
       <Tab.Screen name="Home" component={Home} 
       options={{
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <Fontisto name="world-o" size={24} color={focused ? "#FFAF45" : "#9e97a6"} />
            </View>
          )
        }
       }}
       />

      <Tab.Screen name="game" component={Game} 
       options={{
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <Ionicons name="timer-outline" size={25} color={focused ? "#FFAF45" : "#9e97a6"} />
            </View>
          )
        }
       }}
      />

      <Tab.Screen name="alarm" component={Alarm}
      options={{
        tabBarIcon: ({focused}) => {
          return (
            <View   style={{
              backgroundColor: '#fcdeae',
              top: -25,
              height: 60,
              width: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center' ,
              margin: 10,
            
              
            }} >
              <AntDesign  name="plus" size={35} color={focused ? "#FFAF45" : "#9e97a6"} />
             
            </View>
          )
        }
       }}
      />

      <Tab.Screen name="Timer" component={Timer}
       options={{
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <MaterialCommunityIcons  name="timer-sand-complete" size={24} color={focused ? "#FFAF45" : "#9e97a6"} />
            </View>
          )
        }
       }}
      />

      <Tab.Screen name="watch" component={StopWatch}
       options={{
        tabBarIcon: ({focused}) => {
          return (
            <View>
              < Entypo  name="stopwatch" size={24} color={focused ? "#FFAF45" : "#9e97a6"} />
            </View>
          )
        }
       }}
      />
          
    </Tab.Navigator>
    </NavigationContainer>
    
  );
}


 