import * as React from 'react';
import { View, Text, Image } from 'react-native';

export default function Comic({ name, image }) {
  let imagen =  image.slice(0, 4) + 's' + image.slice(4)
console.log(imagen, 'imagen')
  return (
    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center', paddingTop: 30}}>
			<Image
        style={{width: 250, height: 250, borderRadius: 10, marginBottom: 10}}
				source={{uri: imagen}}
			/>
			<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>{name}</Text>
    </View>
  )
}