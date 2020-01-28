import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";

test("renders previous/next buttons", () => {
	// AAA Arrange, Act, Assert
	const { getByText } = render(<StarWarsCharacters />);
	const previousButton = getByText(/Previous/i);
	const nextButton = getByText(/Next/i);

	fireEvent.click(previousButton);
	fireEvent.click(nextButton);
});
jest.mock("../api");

const fakeData = {
	next: "https://swapi.co/api/people/?page=2",
	previous: null,
	results: [
		{ name: "Boba", url: "1" },
		{ name: "2", url: "2" }
	]
};

mockGetData.mockResolvedValue(fakeData);
test("api test", async () => {
	const { getByText } = render(<StarWarsCharacters />);

	await wait(() => expect(getByText(/boba/i)));
	getByText(/Boba/i);

	expect(mockGetData).toHaveBeenCalledWith("https://swapi.co/api/people");
});
