import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import CharacterCard from './CharacterCard';
import axios from 'axios'
import {ts, publicKey, hash} from '@env'
import { Searchbar } from 'react-native-paper';

export default function Home(props) {
  const [search, setSearch] = React.useState('');
    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const apikey = publicKey;
    React.useEffect(() => {
      axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then(res => {
        let respuesta = []
        res.data.data.results.map(elem => {
         respuesta.push({ name: elem.name, image: elem.thumbnail.path, extension: elem.thumbnail.extension, id: elem.id})
        })
        setData([...respuesta])
      })
      .finally(() => setIsLoading(false));
    },[])

    function searchCharacter() {
      if(search) {
        setIsLoading(true);
        axios.get(`https://gateway.marvel.com/v1/public/characters`, {
          params: {
            ts,
            apikey,
            hash,
            nameStartsWith: search
          }
        })
          .then(response => {
            let respuesta = []
            response.data.data.results.map(elem => {
              console.log(elem.thumbnail, 'elem')
            respuesta.push({ name: elem.name, image: elem.thumbnail.path, extension: elem.thumbnail.extension, id: elem.id})
            })
           setData([...respuesta])
          })
          .catch(error => console.error(error))
          .finally(() => setIsLoading(false));
      }
    }

   // `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F618D' }}>
      <Searchbar
  placeholder="Search for character..."
  onChangeText={value => setSearch(value)}
  value={search}
  onIconPress={searchCharacter}
  onSubmitEditing={searchCharacter}
/>
      {isLoading 
        ? <ActivityIndicator size="large" color="#00ff00" /> 
        : (
          <FlatList
            data={data}
            // keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <CharacterCard 
                id={item.id}
                image={`${item?.image}.${item?.extension}`}  
                name={item.name} />
            )}
          />
        )
      }
    </View>
  );
}