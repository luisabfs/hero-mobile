import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, FlatList, KeyboardAvoidingView, View } from 'react-native';
import { useFetchHeroes, usePagination } from './hooks';
import Paginate from './components/Paginate';
import HeroItem from './components/HeroItem';
import { HeaderContainer, Font, NameBanner, Input, Divider, Footer } from './styles';

function App(): JSX.Element {
  const { heroes, fetchHeroes, responseData } = useFetchHeroes();
  const pagination = usePagination({ fetchHeroes, responseData });
  const [heroName, setHeroName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setHeroName('');
  }, []);

  useEffect(() => {
    if(!heroName) return;
    pagination.setCurrentPageIndex(1);
    fetchHeroes(0, heroName);
  }, [heroName]);

  useEffect(() => {
    if(responseData?.total === 0) setErrorMessage('Não há heróis a exibir.');
  }, [responseData])

  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={-200} behavior="height">
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <HeaderContainer>
          <Font type='black' size={16}>BUSCA MARVEL <Font type="light" size={16}>TESTE MOBILE</Font></Font>
          <Divider />
          <Font size={16} type="regular">Nome do Personagem</Font>
          <Input accessibilityLabel="input" value={heroName} onChangeText={setHeroName} />
        </HeaderContainer>

        <NameBanner>Nome</NameBanner>

        {heroes ? (
          <FlatList contentContainerStyle={{flex: 1}} data={heroes} renderItem={({ item })=> {
            return <HeroItem item={item} />
          }} /> 
        ) : (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!!errorMessage ? 
              <Font accessibilityHint="errorMessage" size={24} color="#4e4e4e">{errorMessage}</Font> 
            : null}
          </View>
        )}        

        <Paginate
          pagination={pagination} 
          heroName={heroName}
          heroes={heroes}
        />
      </SafeAreaView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

export default App;
