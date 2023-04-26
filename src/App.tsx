import React, {useEffect, useState} from 'react';
import { StatusBar, SafeAreaView, Text, TextInput, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFetchHeroes } from './hooks/useFetchHeroes';
import { treatThumbnailUri } from './utils';

function App(): JSX.Element {
  const { responseData, heroes, fetchHeroes } = useFetchHeroes();
  const [heroName, setHeroName] = useState('');

  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  useEffect(() => {
    setHeroName('');
  }, []);

  useEffect(() => {
    if(!heroName) return;
    setCurrentPageIndex(1);
    fetchHeroes(0, heroName);
  }, [heroName]);

  const handleNextPage = () => {
    const offset = 4 * (currentPageIndex);
    if(responseData?.total && offset >= responseData?.total) return;
    setCurrentPageIndex(prevState => prevState + 1);
    fetchHeroes(offset, heroName ? heroName : undefined);
  }

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

        <View style={{ flexDirection: 'row', marginTop: 5, alignSelf: 'center', width: 150, justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <Text>{'<   '}</Text>
          </TouchableOpacity>
          <Text>{currentPageIndex}</Text>
          <TouchableOpacity style={{backgroundColor: 'blue', padding: 5}} onPress={handleNextPage}>
            <Text>{'   >'}</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
