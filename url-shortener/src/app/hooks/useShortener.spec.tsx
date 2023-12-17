import { useShortener } from "./useShortener";
import "@testing-library/jest-dom";
import { act, renderHook, waitFor } from "@testing-library/react";

describe("useShortener", () => {
    const mockData = { test: 1234 };

    it("should not fetch by default ", () => {
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                json: () => mockData
            })
        );

        const { result } = renderHook(() => useShortener());

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeUndefined();
        expect(result.current.data).toBeUndefined();
        expect(result.current.url).toBeUndefined();
        expect(fetch).not.toHaveBeenCalled();
    });

    it("should fetch when shorten function is called", async () => {    
        const url = 'http://google.com';
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                json: () => mockData
            })
        );
        
        const { result } = renderHook(() => useShortener());

        act(() => { result.current.shorten(url) });
        
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        }); 
        expect(result.current.error).toBeUndefined();
        expect(result.current.data).toBe(mockData);
        expect(result.current.url).toBe(url);
        expect(fetch).toHaveBeenCalled();
    });

    it("should restart state", async () => {        
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                json: () => mockData
            })
        );
        
        const { result } = renderHook(() => useShortener());

        act(() => { result.current.restart() });
        
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        }); 
        expect(result.current.error).toBeUndefined();
        expect(result.current.data).toBeUndefined();
        expect(result.current.url).toBeUndefined();
        expect(fetch).not.toHaveBeenCalled();
    });
});