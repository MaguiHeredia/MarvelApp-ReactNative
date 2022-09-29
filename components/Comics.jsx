import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, Text } from 'react-native';
import Comic from './Comic';
import axios from 'axios';
import {ts, publicKey, hash} from '@env'

export default function Comics({listComics}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const promisesArray = listComics.map(c => (
     axios.get(`${c.resourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    ));
    
    Promise.all(promisesArray)
      .then(responses => setData(responses.map(r => (
        r?.data?.data?.results[0]
      ))))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

  }, []);

  return (
    <ScrollView style={{backgroundColor: '#C0392B',flex: 3, width:'100%'}}>
      {
        isLoading 
          ? <ActivityIndicator size="large" color="#00ff00" /> 
          : data?.map(c => (
            <Comic 
              key={c?.id}
              name={c?.title} 
              image={`${c?.thumbnail?.path}.${c?.thumbnail.extension}`}  
            />
          ))
      }
    </ScrollView>
  )
}
