import ErrorAlert, { ERROR_ALERT_TEST_ID } from "./ErrorAlert";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("ErrorAlert", () => {
    it("renders error alert component", () => {
      render(<ErrorAlert />);
      expect(screen.getByTestId(ERROR_ALERT_TEST_ID)).toBeInTheDocument();
    });
});