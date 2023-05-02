import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { results as mockedResults } from '../../../utils/responseData.json'
import { HeroData } from '../../../hooks';
import HeroItem from '..';

describe('<HeroItem />', () => {
    it('should render hero name and thumbnail correctly', () => {
        const { getByText, getByTestId } = render(<HeroItem item={mockedResults[0] as HeroData} />)

        expect(getByText(mockedResults[0].name)).toBeTruthy();
        expect(getByTestId('heroThumbnail')).toBeTruthy();
    });
    
    it('should show modal on press', () => {
        const { getByTestId } = render(<HeroItem item={mockedResults[0] as HeroData} />)
        
        expect(getByTestId('heroModal').props["visible"]).toBe(false)
        fireEvent.press(getByTestId('heroTouchable'));
        expect(getByTestId('heroModal').props["visible"]).toBe(true)
    });
});