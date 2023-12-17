import UrlInput from "./UrlInput";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("UrlInput", () => {
    it("renders url input component", () => {
      render(<UrlInput />);
      expect(screen.getByTestId("UrlInput")).toBeInTheDocument();
    });

    it("should call onShortenButton event when button clicked", () => {
        const onShortenButtonClicked = jest.fn();
        const mockUrl = 'https://google.com';

        render(<UrlInput onShortenButtonClicked={onShortenButtonClicked}/>);

        const input = screen.getByRole('textbox');
        act(() => {
          fireEvent.change(input, { target: { value: mockUrl } });
        });

        const button = screen.getByRole('button');
        button.click();

        expect(onShortenButtonClicked).toHaveBeenCalledWith<[string]>(mockUrl);
    });
});