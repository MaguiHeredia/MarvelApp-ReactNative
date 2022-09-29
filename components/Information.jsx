import * as React from 'react';
import { Text, View,  Image, TouchableOpacity  } from 'react-native';

export default function Information({ image, name, description }) {
    console.log(image, name, description)
    let imagen =  image.slice(0, 4) + 's' + image.slice(4)

    return (
      <View style={{backgroundColor: '#C0392B', width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{backgroundColor: '#C0392B', width: '100%', height: '100%', marginTop: '10%', padding: 45}}>
        <Image 
        style={{width: 250, height: 250, borderRadius: 5, marginBottom: '10%', marginLeft: 40}}
        source={{uri: imagen}}
        />
        <View style={{ backgroundColor:'rgba(156, 183, 203, 0.40)', padding:  20, borderRadius: 10}}>
        <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>{name}</Text>
        <Text style={{color: 'white', fontSize: 15}}>{description}</Text>
        </View>
        </View>
      </View>
    )
  }
  