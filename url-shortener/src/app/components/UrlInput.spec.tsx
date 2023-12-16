import UrlInput from "./UrlInput";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("UrlInput", () => {
    it("renders url input component", () => {
      render(<UrlInput />);
      expect(screen.getByTestId("UrlInput")).toBeInTheDocument();
    });

    it("should call on shorten button event when button clicked", () => {
        const onShortenButtonClicked = jest.fn();
        render(<UrlInput onShortenButtonClicked={onShortenButtonClicked}/>);

        const button = screen.getByRole('button');
        button.click();

        expect(onShortenButtonClicked).toHaveBeenCalled();
    });
});