import LoadingSpinner from "./LoadingSpinner";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("UrlInput", () => {
    it("renders loading spinner component", () => {
      render(<LoadingSpinner />);
      expect(screen.getByTestId("LoadingSpinner")).toBeInTheDocument();
    });
});