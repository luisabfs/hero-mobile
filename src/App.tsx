import React, {useEffect, useState} from 'react';
import { StatusBar, SafeAreaView, Text, TextInput, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFetchHeroes } from './hooks/useFetchHeroes';
import { treatThumbnailUri } from './utils';

function App(): JSX.Element {
  const { heroes, fetchHeroes } = useFetchHeroes();
  const [heroName, setHeroName] = useState('');

  useEffect(() => {
    if(!heroName) return;
    fetchHeroes(heroName);
  }, [heroName]);

  return (
    <NavigationContainer>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <Text>Busca Marvel Teste Mobile</Text>

        <Text style={{ marginTop: 10 }}>Nome do Personagem</Text>
        <TextInput style={{ borderWidth: 1 }} value={heroName} onChangeText={setHeroName} />

        <Text style={{ marginTop: 10, paddingLeft: 55 }}>Nome</Text>

        <FlatList data={heroes} renderItem={
          ({ item })=> (
            <View style={{ flexDirection: 'row', margin: 5 }}>
              <Image style={{width: 50, height: 50}} source={{uri: treatThumbnailUri({path: item.thumbnail.path, extension: item.thumbnail.extension})}}  />
              <Text>{item.name}</Text>
            </View>
          )
        } />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
