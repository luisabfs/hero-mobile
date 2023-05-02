import '../../../utils/__mocks__';

import React from 'react';
import { render, renderHook, waitFor, act, screen, fireEvent } from '@testing-library/react-native';
import { usePagination, useFetchHeroes} from '../../../hooks';
import Paginate from '..';

describe('<Paginate />', () => {
    const init = async () => {
        const { result: fetchHeroesResult } = renderHook(() => useFetchHeroes());
        act(() => {
            fetchHeroesResult.current.fetchHeroes(0);
        });
         await waitFor(() => {
            expect(fetchHeroesResult.current.heroes?.length).toBeGreaterThan(0);
        });

        const { result: paginationResult } = renderHook(() => usePagination({ 
            fetchHeroes: fetchHeroesResult.current.fetchHeroes, 
            responseData: fetchHeroesResult.current.responseData 
        }));

        const nextPageSpy = jest.spyOn(paginationResult.current, 'handleNextPage');
        render(<Paginate pagination={paginationResult.current} heroes={fetchHeroesResult.current.heroes} />);
        
        return {
            fetchHeroesResult,
            paginationResult,
            nextPageSpy
        };
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.only('should display a loading spinner while waiting for the API response', async () => {
        const { result: fetchHeroesResult } = renderHook(() => useFetchHeroes());
        const { result: paginationResult } = renderHook(() => usePagination({ 
            fetchHeroes: fetchHeroesResult.current.fetchHeroes, 
            responseData: fetchHeroesResult.current.responseData 
        }));

        const { update } = render(<Paginate pagination={paginationResult.current} heroes={fetchHeroesResult.current.heroes} />);

        expect(await screen.findByAccessibilityHint('loading')).toBeTruthy();

        act(() => {
            fetchHeroesResult.current.fetchHeroes(0);
        });
        
        await waitFor(() => {
            expect(fetchHeroesResult.current.heroes?.length).toBeGreaterThan(0);
        });

        update(<Paginate pagination={paginationResult.current} heroes={fetchHeroesResult.current.heroes} />);

        expect(await screen.queryByAccessibilityHint('loading')).toBeFalsy();
    });
    
    it('should disable previous button on first page', async () => {
        await init();
        const disabledButton = await screen.findByRole('button', { disabled: true });
        expect(disabledButton.props["testID"]).toBe("arrowLeft");
    });
    
    it('should call handleNextPage function on arrowRight press', async () => {
        const { paginationResult, nextPageSpy } = await init();

        fireEvent.press(screen.getByTestId('arrowRight'));
        fireEvent.press(screen.getByTestId('arrowRight'));
        
        await waitFor(() => {
            expect(nextPageSpy).toHaveBeenCalledTimes(2);
            expect(paginationResult.current.currentPageIndex).toBe(3)
        })
    });
    
    it('should change active index color on page change', async () => {
        const { paginationResult, fetchHeroesResult } = await init();
        
        const b4indexText = await screen.findByText('2');
        const b4indexBackground = (await screen.findAllByTestId('index-button'))[1];

        expect(b4indexText.props["color"]).toBe('#D42026')
        expect(b4indexBackground.props["style"].backgroundColor).toBe('#FFFFFF')

        fireEvent.press(screen.getByTestId('arrowRight'));

        screen.update(<Paginate pagination={paginationResult.current} heroes={fetchHeroesResult.current.heroes} />)
        
        const indexText = await screen.findByText('2');
        const indexBackground = (await screen.findAllByTestId('index-button'))[1];
    
        expect(indexText.props["color"]).toBe('#FFFFFF')
        expect(indexBackground.props["style"].backgroundColor).toBe('#D42026')

    });
    
    it('should fetch new heroes on page change', async () => {
        const { fetchHeroesResult } = await init();

        fireEvent.press(screen.getByTestId('arrowRight'));
        
        await waitFor(() => {
            const heroes = fetchHeroesResult.current.heroes;
            heroes && expect(heroes[0].name).toEqual('Page 2 Hero');    
        });
    });
});