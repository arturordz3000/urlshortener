import LoadingSpinner, { LOADING_SPINNER_TEST_ID } from "./LoadingSpinner";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("LoadingSpinner", () => {
    it("renders loading spinner component", () => {
      render(<LoadingSpinner />);
      expect(screen.getByTestId(LOADING_SPINNER_TEST_ID)).toBeInTheDocument();
    });
});