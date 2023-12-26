import Successful, { SUCCESSFUL_COPIED_TEST_ID, SUCCESSFUL_COPY_BUTTON_TEST_ID, SUCCESSFUL_TEST_ID } from "./Successful";
import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";

const writeText = jest.fn()

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("Successful", () => {
    const link = 'https://google.com';

    it("renders successful component", () => {
      render(<Successful link={link} />);
      expect(screen.getByTestId(SUCCESSFUL_TEST_ID)).toBeInTheDocument();
    });

    it("copy link to clipboard", () => {
        render(<Successful link={link} />);
        const copyButton = screen.getByTestId(SUCCESSFUL_COPY_BUTTON_TEST_ID);
        
        act(() => {
            copyButton.click();
        });

        expect(writeText).toHaveBeenCalledWith<[string]>(link);
    });

    it("should show 'Copied!' text", async () => {
        render(<Successful link={link} />);
        const copyButton = screen.getByTestId(SUCCESSFUL_COPY_BUTTON_TEST_ID);
        
        act(() => {
            copyButton.click();
        });

        expect(screen.getByTestId(SUCCESSFUL_COPIED_TEST_ID)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId(SUCCESSFUL_COPIED_TEST_ID)).not.toBeInTheDocument()
        }, {timeout: 3000});
    });
});