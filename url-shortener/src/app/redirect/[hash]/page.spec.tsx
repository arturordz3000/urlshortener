import Redirect, { REDIRECT_TEST_ID } from "./page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as UseRedirectHook from '../../hooks/useRedirect'; 

jest.mock('../../hooks/useRedirect', () => {
    return {
        __esModule: true,    //    <----- this __esModule: true is important
        ...jest.requireActual('../../hooks/useRedirect')
    };
});

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
}));

describe("Redirect", () => {
    const input: { hash: string } = { hash: "12345abc" };

    jest.spyOn(UseRedirectHook, 'useRedirect').mockReturnValue({
        isLoading: true,
        error: undefined,
        data: undefined,
    });

    it("renders home component", () => {
        render(<Redirect params={input}/>);
        expect(screen.getByTestId(REDIRECT_TEST_ID)).toBeInTheDocument();
    });
});