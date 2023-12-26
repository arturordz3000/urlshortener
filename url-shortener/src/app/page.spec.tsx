import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home, { GO_BACK_TEST_ID, HOME_TEST_ID } from "./page";
import { LOADING_SPINNER_TEST_ID } from "./components/LoadingSpinner";

import * as UseShortenerHook from './hooks/useShortener'; 
import { URL_INPUT_TEST_ID } from "./components/UrlInput";
import { ERROR_ALERT_TEST_ID } from "./components/ErrorAlert";
import { act } from "react-dom/test-utils";

jest.mock('./hooks/useShortener', () => {
  return {
    __esModule: true,    //    <----- this __esModule: true is important
    ...jest.requireActual('./hooks/useShortener')
  };
});

describe("Home", () => {

    it("renders home component", () => {
        render(<Home />);
        expect(screen.getByTestId(HOME_TEST_ID)).toBeInTheDocument();
    });

    it("renders url input when not fetching data", () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: false,
            error: undefined,
            data: undefined,
            url: undefined,
            restart: () => {}
        });

        render(<Home />);
        expect(screen.getByTestId(URL_INPUT_TEST_ID)).toBeInTheDocument();
    });

    it("renders loading spinner when fetching data", () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: true,
            error: undefined,
            data: undefined,
            url: 'someUrl',
            restart: () => {}
        });

        render(<Home />);
        expect(screen.getByTestId(LOADING_SPINNER_TEST_ID)).toBeInTheDocument();
    });

    it("renders error component when fetching data is not successful", () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: false,
            error: { message: 'Some error' },
            data: undefined,
            url: 'someUrl',
            restart: () => {}
        });

        render(<Home />);
        expect(screen.getByTestId(ERROR_ALERT_TEST_ID)).toBeInTheDocument();
    });

    it("renders go back button on error", () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: false,
            error: { message: 'Some error' },
            data: undefined,
            url: 'someUrl',
            restart: () => {}
        });

        render(<Home />);
        expect(screen.getByTestId(GO_BACK_TEST_ID)).toBeInTheDocument();
    });

    it("renders go back button on data", () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: false,
            error: undefined,
            data: { some: 'data' },
            url: 'someUrl',
            restart: () => {}
        });

        render(<Home />);
        expect(screen.getByTestId(GO_BACK_TEST_ID)).toBeInTheDocument();
    });

    it("should not render go back button on loading", () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: true,
            error: undefined,
            data: undefined,
            url: 'someUrl',
            restart: () => {}
        });

        render(<Home />);
        expect(screen.queryByTestId(GO_BACK_TEST_ID)).not.toBeInTheDocument();
    });

    it("should not render go back button when showing url input component", () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: false,
            error: undefined,
            data: undefined,
            url: undefined,
            restart: () => {}
        });

        render(<Home />);
        expect(screen.queryByTestId(GO_BACK_TEST_ID)).not.toBeInTheDocument();
    });

    it("should show url input after clicking on go back button", async () => {
        jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
            shorten: () => {},
            isLoading: false,
            error: { message: 'Some error' },
            data: undefined,
            url: 'someUrl',
            restart: () => {
                jest.spyOn(UseShortenerHook, 'useShortener').mockReturnValue({
                    shorten: () => {},
                    isLoading: false,
                    error: undefined,
                    data: undefined,
                    url: 'someUrl',
                    restart: () => {}
                });
            }
        });

        const { rerender } = render(<Home />);

        const goBackButton = screen.getByTestId(GO_BACK_TEST_ID);
        act(() => {
            goBackButton.click();
        });

        rerender(<Home />);

        expect(await screen.findByTestId(URL_INPUT_TEST_ID)).toBeInTheDocument();
    });
});