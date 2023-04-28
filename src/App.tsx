import React, {useEffect, useState} from 'react';
import { StatusBar, SafeAreaView,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFetchHeroes, usePagination } from './hooks';
import Paginate from './components/Paginate';
import HeroItem from './components/HeroItem';
import { HeaderContainer, Font, NameBanner, Input, Divider, Footer } from './styles';

function App(): JSX.Element {
  const { heroes, fetchHeroes, responseData } = useFetchHeroes();
  const pagination = usePagination({ fetchHeroes, responseData });
  const [heroName, setHeroName] = useState('');

  useEffect(() => {
    setHeroName('');
  }, []);

  useEffect(() => {
    if(!heroName) return;
    pagination.setCurrentPageIndex(1);
    fetchHeroes(0, heroName);
  }, [heroName]);

  return (
    <NavigationContainer>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <HeaderContainer>
          <Font type='black' size={16}>BUSCA MARVEL <Font type="light" size={16}>TESTE MOBILE</Font></Font>
          <Divider />
          <Font size={16} type="regular">Nome do Personagem</Font>
          <Input value={heroName} onChangeText={setHeroName} />
        </HeaderContainer>

        <NameBanner>Nome</NameBanner>

        <FlatList contentContainerStyle={{flex: 1, justifyContent: 'space-evenly'}} data={heroes} renderItem={({ item })=> {
          return <HeroItem item={item} />
        }} />
        
        <Paginate
          pagination={pagination} 
          heroName={heroName}
          heroes={heroes}
        />
      </SafeAreaView>
      <Footer />
    </NavigationContainer>
  );
}

export default App;
