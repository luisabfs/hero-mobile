import React from 'react';
import { StatusBar, SafeAreaView, Text, TextInput, FlatList, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFetchHeroes } from './hooks/useFetchHeroes';
import { treatThumbnailUri } from './utils';

function App(): JSX.Element {
  const { heroes } = useFetchHeroes();

  return (
    <NavigationContainer>
      <StatusBar />
      <SafeAreaView>
        <Text>Busca Marvel Teste Mobile</Text>

        <Text style={{ marginTop: 10 }}>Nome do Personagem</Text>
        <TextInput style={{ borderWidth: 1 }} />

        <Text style={{ marginTop: 10 }}>Nome</Text>

        <FlatList data={heroes} renderItem={
          ({ item })=> (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
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
