import '../../../../mocks';

import React from 'react';
import { render, fireEvent, renderHook, act, waitFor, screen } from '@testing-library/react-native';
import { useFetchHeroes } from '../../../hooks';
import HeroItem from '..';

describe('<HeroItem />', () => {
    beforeEach(async () => {
        const { result } = renderHook(() => useFetchHeroes());
        act(() => {
            result.current.fetchHeroes(0);
        });
        
        await waitFor(() => {
            expect(result.current.heroes?.length).toBeGreaterThan(0);
        });

        result.current.heroes && render(<HeroItem item={result.current.heroes[0]} />);
    });

    it('should render hero name and thumbnail correctly', () => {
        expect(screen.getByText("Thor")).toBeTruthy();
        expect(screen.getByTestId('heroThumbnail')).toBeTruthy();
    });
    
    it('should show modal on press', () => {        
        expect(screen.getByTestId('heroModal').props["visible"]).toBe(false)
        fireEvent.press(screen.getByTestId('heroTouchable'));
        expect(screen.getByTestId('heroModal').props["visible"]).toBe(true)
    });
});