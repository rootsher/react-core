import { render, screen } from "@testing-library/react";

import { add, Component } from "./index";

test("renders button", async () => {
    render(<Component />);

    const $button = await screen.findByTestId("button");

    expect($button).toHaveTextContent("button");
});

test("adds numbers", () => {
    expect(add(1, 2)).toBe(3);
});
