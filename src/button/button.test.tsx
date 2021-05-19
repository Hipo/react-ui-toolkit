import React from "react";
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import Button from "./Button";
import {testA11y} from "../core/utils/test/testUtils";
import {ButtonProps} from "..";

describe("<Button />", () => {
  afterEach(cleanup);

  const defaultButtonProps: ButtonProps = {
    testid: "button",
    children: "Test"
  };

  it("should render correctly", () => {
    render(<Button {...defaultButtonProps} />);
  });

  it("should render children correctly", () => {
    const {getByTestId} = render(<Button {...defaultButtonProps} />);

    expect(getByTestId("button")).toHaveTextContent("Test");
  });

  it("should matches snapshot", () => {
    const tree = create(<Button {...defaultButtonProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<Button {...defaultButtonProps} />);

    await testA11y(container);
  });

  it("disabled property should works correctly", () => {
    const {getByTestId} = render(<Button isDisabled={true} {...defaultButtonProps} />);

    expect(getByTestId("button")).toHaveAttribute("disabled");
    expect(getByTestId("button")).toBeDisabled();
    expect(getByTestId("button")).toHaveClass("button--is-inactive");
  });

  it("should display custom spinner correctly", () => {
    const customSpinnerContent = <p data-testid={"custom-spinner"}>{"Loading..."}</p>;

    const {rerender, getByTestId} = render(
      <Button
        shouldDisplaySpinner={true}
        customSpinner={customSpinnerContent}
        {...defaultButtonProps}
      />
    );

    const customSpinner = getByTestId("custom-spinner");

    expect(getByTestId("button")).toContainElement(customSpinner);

    rerender(
      <Button
        shouldDisplaySpinner={false}
        customSpinner={customSpinnerContent}
        {...defaultButtonProps}
      />
    );

    expect(getByTestId("button")).not.toContainElement(customSpinner);
  });

  it("should not call click event when button is disabled", () => {
    const handleClick = jest.fn();

    const {rerender, getByTestId} = render(
      <Button onClick={handleClick} shouldDisplaySpinner={true} {...defaultButtonProps} />
    );

    fireEvent.click(getByTestId("button"));
    expect(handleClick).not.toHaveBeenCalled();

    rerender(<Button onClick={handleClick} isDisabled={true} {...defaultButtonProps} />);

    fireEvent.click(getByTestId("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should call events correctly", () => {
    const handleClick = jest.fn();
    const handleMouseOver = jest.fn();
    const handleFocus = jest.fn();
    const handleMouseUp = jest.fn();
    const handleMouseDown = jest.fn();
    const handleBlur = jest.fn();

    const {rerender, getByTestId} = render(
      <Button onClick={handleClick} {...defaultButtonProps} />
    );

    fireEvent.click(getByTestId("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);

    rerender(
      <Button
        onFocus={handleFocus}
        onMouseOver={handleMouseOver}
        {...defaultButtonProps}
      />
    );

    fireEvent.mouseOver(getByTestId("button"));
    expect(handleMouseOver).toHaveBeenCalledTimes(1);

    rerender(<Button onMouseDown={handleMouseDown} {...defaultButtonProps} />);

    fireEvent.mouseDown(getByTestId("button"));
    expect(handleMouseDown).toHaveBeenCalledTimes(1);

    rerender(<Button onFocus={handleFocus} {...defaultButtonProps} />);

    fireEvent.focus(getByTestId("button"));
    expect(handleFocus).toHaveBeenCalledTimes(1);

    rerender(<Button onFocus={handleFocus} shouldFocus={true} {...defaultButtonProps} />);

    expect(handleFocus).toHaveBeenCalledTimes(1);

    rerender(<Button onMouseUp={handleMouseUp} {...defaultButtonProps} />);

    fireEvent.mouseUp(getByTestId("button"));
    expect(handleMouseUp).toHaveBeenCalledTimes(1);

    rerender(<Button onBlur={handleBlur} {...defaultButtonProps} />);

    fireEvent.blur(getByTestId("button"));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("should has the proper type attribute", () => {
    const {getByTestId, rerender} = render(<Button {...defaultButtonProps} />);

    expect(getByTestId("button")).toHaveAttribute("type", "button");

    rerender(<Button type={"submit"} {...defaultButtonProps} />);

    expect(getByTestId("button")).toHaveAttribute("type", "submit");

    rerender(<Button type={"reset"} {...defaultButtonProps} />);

    expect(getByTestId("button")).toHaveAttribute("type", "reset");
  });
});
