import Successful, { SUCCESSFUL_TEST_ID } from "./Successful";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Successful", () => {
    it("renders successful component", () => {
      render(<Successful />);
      expect(screen.getByTestId(SUCCESSFUL_TEST_ID)).toBeInTheDocument();
    });
});