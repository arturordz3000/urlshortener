import Redirect, { REDIRECT_TEST_ID } from "./page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

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

    it("renders home component", () => {
        render(<Redirect params={input}/>);
        expect(screen.getByTestId(REDIRECT_TEST_ID)).toBeInTheDocument();
    });
});