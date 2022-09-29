import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import Information from './Information';
import Comics from './Comics';
import Comic from './Comic';
import axios from 'axios';
import {ts, publicKey, hash} from '@env'


const Tab = createBottomTabNavigator();


export default function Detail({route}) {
    const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
      console.log(route.params.id)
    //https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}
    axios.get(`https://gateway.marvel.com/v1/public/characters/${route.params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then(response => {
          //console.log(response.data.data.results[0])
          setData(response.data.data.results[0])
        })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Information"
      tabBarOptions={{
        activeTintColor: "white",
        activeBackgroundColor: "#1F618D",
        inactiveTintColor: "black",
        inactiveBackgroundColor: "white"
      }}
    >
      <Tab.Screen 
        name="Information" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information-circle" color={color} size={size} />
          )
        }}
      >
        {() => 
          (isLoading
            ? <ActivityIndicator size="large" color="#00ff00" /> 
            : <Information 
                image={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
                name={data.name}
                description={data.description} 
              />
          )
        }
      </Tab.Screen>
      
      <Tab.Screen 
        name="Comics" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          )
        }}
      >
        {() => 
          (isLoading
            ? <ActivityIndicator size="large" color="#00ff00" /> 
            : <Comics
                listComics={data?.comics?.items} 
              />
          )
        }
      </Tab.Screen>
      
    </Tab.Navigator>
  );
}

