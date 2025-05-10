import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  it("increments the count value when increment is clicked", () => {
    const { getByRole, getByTestId } = render(<Counter />);
    const incrementButton = getByRole("button", { name: "increase" }); //the name is the text content of the button

    fireEvent.click(incrementButton);
    const countValue = Number(getByTestId("count-value").textContent);
    expect(countValue).toBe(1);
  });

  it("decreases the count value when clicked", () => {
    const { getByRole, getByTestId } = render(<Counter />);
    const decrementButton = getByRole("button", { name: "Decrease" });

    fireEvent.click(decrementButton);
    const countValue = Number(getByTestId("count-value").textContent);

    expect(countValue).toEqual(-1);
  });
});
