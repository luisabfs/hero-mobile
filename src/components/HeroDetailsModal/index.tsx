import React from 'react';
import { Modal } from 'react-native';
import { HeroData } from '../../hooks/useFetchHeroes';
import { Font } from '../../styles';
import { OuterContainer, Container } from './styles';

interface Props {
    modalVisible: boolean;
    setModalVisible: any;
    item: HeroData;
}

const HeroDetailsModal: React.FC<Props> = ({ modalVisible, setModalVisible, item }) => {
  const comics = item.comics?.items;
  const events = item.events?.items;
  const stories = item.stories?.items;
  
  return (
    <Modal animationType='fade' transparent visible={modalVisible} style={{ flex: 1}}>
        <OuterContainer activeOpacity={1} onPress={() => setModalVisible(false)}>
            <Container>
                <Font type="black" size={21}>{item.name}</Font>
                <Font color='#414141'>{item.description}</Font>

                {comics?.length ? (
                  <>
                   <Font type='black'>Quadrinhos</Font>
                   {comics.map((item, index) => index < 3 && <Font key={item.name} color='#414141'>{`${item.name}\n`}</Font>)}
                  </>
                ) : null}

                {events?.length ? (
                  <>
                   <Font type='black'>Eventos</Font>
                   {events.map((item, index) => index < 3 && <Font key={item.name} color='#414141'>{`${item.name}\n`}</Font>)}
                  </>
                ) : null}
                
                {stories?.length ? (
                  <>
                    <Font type='black'>Histórias</Font>
                    {stories.map((item, index) => index < 3 && <Font key={item.name} color='#414141'>{`${item.name}\n`}</Font>)}
                  </>
                ) : null}
                
            </Container>
        </OuterContainer>
    </Modal>
  );
}

export default HeroDetailsModal;