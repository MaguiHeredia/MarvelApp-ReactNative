import * as React from 'react';
import { Text, View,  Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CharacterCard({image, name, id}) {
    const navigation = useNavigation();
    let imagen =  image.slice(0, 4) + 's' + image.slice(4)
    console.log(imagen)
  return (
    <TouchableOpacity 
			onPress={() => navigation.navigate('Detail', {id: id})}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'rgba(156, 183, 203, 0.40)', marginTop: 50, paddingTop: 30, paddingBottom: 20, borderRadius: 10}}
	>
			<Image 
           style={{width: 250, height: 250, borderRadius: 5, marginBottom: '7%'}}
				// style={styles.image}
				source={{uri: imagen}}
			/>
      <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>{name}</Text>
    </TouchableOpacity>
  );
}