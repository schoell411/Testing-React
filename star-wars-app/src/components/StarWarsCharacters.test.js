import React from "react";
import { render, fireEvent, wait, findByText } from "@testing-library/react";
import { getData as mockGetData } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";
import App from "../App";
import { act } from "react-dom/test-utils";

// AAA Arrange, Act, Assert <- the flow for writing tests

jest.mock("../api");

test("render App", () => {
	render(<App />);
});

test("renders previous/next buttons", () => {
	const { getByText } = render(<StarWarsCharacters />);
	const previousButton = getByText(/previous/i);
	const nextButton = getByText(/next/i);

	act(() => {
		fireEvent.click(previousButton, nextButton);
		// fireEvent.click(nextButton);
	});
	// act(() => {
	// });
	findByText(/success/i);
});

const fakeData = {
	next: "https://swapi.co/api/people/?page=2",
	previous: null,
	results: [
		{ name: "Bob", url: "1" },
		{ name: "2", url: "2" }
	]
};

mockGetData.mockResolvedValue(fakeData);

test("api test", async () => {
	const { getByText } = render(<StarWarsCharacters />);

	await wait(() => expect(getByText(/bob/i)));
	getByText(/Bob/i);

	expect(mockGetData).toHaveBeenCalledWith("https://swapi.co/api/people");
});

test("renders success text from fakeApiCall", () => {
	const { getByText, findByText } = render(<App />);
	act(() => {
		fireEvent.click(getByText("Next"));
	});
	findByText(/Success/i);
});
