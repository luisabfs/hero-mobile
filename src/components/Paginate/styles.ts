import styled from 'styled-components/native';

interface Props {
    activeIndex?: boolean;
    disabled?: boolean;
}

export const Container = styled.View`
    padding: 15px 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const PageIndexButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: ${({activeIndex}: Props) => activeIndex ? '#D42026' : '#FFFFFF'};
    border: 1.5px solid #D42026;
    width: 32px;
    height: 32px;
    border-radius: 100px;
    margin: 0 10px;
`;

export const ArrowLeft = styled.TouchableOpacity`
    border-top-width: 12px; 
    border-bottom-width: 12px; 
    border-right-width: 12px; 
    border-left-width: 0; 
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: ${({ disabled }: Props): string => disabled ? '#EBEBEB' : '#D42026'};
    border-left-color: transparent;

    margin-right: 60px;
`;

export const ArrowRight = styled.TouchableOpacity`
    border-top-width: 12px; 
    border-bottom-width: 12px; 
    border-right-width: 0; 
    border-left-width: 12px; 
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-left-color: ${({ disabled }: Props): string => disabled ? '#EBEBEB' : '#D42026'};

    margin-left: 60px;
`;
