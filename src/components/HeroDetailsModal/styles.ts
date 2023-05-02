import styled from "styled-components/native";

export const OuterContainer = styled.TouchableOpacity`
   flex: 1;
   align-items: center;
   justify-content: center;
   background-color: rgba(0,0,0,0.8);
`;

export const Container = styled.View`
    width: 80%;
    padding: 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
`;

export const CloseButton = styled.View`
    background-color: #FFFFFF;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;

    position: absolute;
    z-index: 1;
    top: -40px;
    right: 10px;
`;