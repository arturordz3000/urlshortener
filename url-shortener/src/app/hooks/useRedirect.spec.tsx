import { useRedirect } from "./useRedirect";
import "@testing-library/jest-dom";
import { act, renderHook, waitFor } from "@testing-library/react";



describe("useShortener", () => {
    const mockData = { test: 1234 };

    it("should fetch ", () => {
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                json: () => mockData
            })
        );

        const { result } = renderHook(() => useRedirect("abc1234"));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeUndefined();
        expect(result.current.data).toBeUndefined();
        expect(fetch).toHaveBeenCalled();
    });
});
