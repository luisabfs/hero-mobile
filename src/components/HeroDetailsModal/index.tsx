import React, { Fragment } from 'react';
import { Image, Modal, View } from 'react-native';
import { HeroData } from '../../hooks/useFetchHeroes';
import { Font } from '../../styles';
import { OuterContainer, Container, CloseButton } from './styles';
import { treatThumbnailUri } from '../../utils';

interface Props {
    modalVisible: boolean;
    setModalVisible: any;
    item: HeroData;
    testID: string;
}

const HeroDetailsModal: React.FC<Props> = ({ modalVisible, setModalVisible, item, testID }) => {
  const { path, extension } = item.thumbnail;
  const details = [
     { label: 'Eventos', items: item.events?.items},
     { label: 'Séries', items: item.series?.items},
  ];
  
  return (
    <Modal testID={testID} statusBarTranslucent animationType='fade' transparent visible={modalVisible} style={{ flex: 1}}>
        <OuterContainer activeOpacity={1} onPress={() => setModalVisible(false)}>
            <Container>
                <CloseButton>
                  <Font type="black" color="#414141">X</Font>
                </CloseButton> 
                <Image style={{ width: '115%', height: 260, marginTop: -20, marginLeft: -20, marginBottom: 10, borderRadius: 10}} source={{uri: treatThumbnailUri({ path, extension })}} />
                <Font type="black" size={21}>{item.name}</Font>
                {item.description ? <Font color='#414141'>{item.description}</Font> : null}

                {details.map(detail => (
                  detail.items?.length ? (
                    <Fragment key={detail.label}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Font type='black'>{detail.label}</Font>
                      </View>
                     {detail.items.map((item, index) => index < 3 && <Font key={item.name} color='#414141'>{`• ${item.name}`}</Font>)}
                    </Fragment>
                  ) : null
                ))}

                {!details[0].items?.length && !details[1].items?.length ? (
                  <>
                    <Font color='#414141'>{`Detalhes indisponíveis :(`}</Font>
                  </>
                ) : null}
            </Container>
        </OuterContainer>
    </Modal>
  );
}

export default HeroDetailsModal;