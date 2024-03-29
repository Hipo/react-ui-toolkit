import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import ProgressBar, {ProgressBarProps} from "./ProgressBar";
import {testA11y} from "../core/utils/test/testUtils";

describe("<ProgressBar />", () => {
  const defaultProgressBarProps: ProgressBarProps = {
    testid: "progress-bar",
    percentage: 57,
    style: {backgroundColor: "blue", completedColor: "yellow", trackColor: "orange"},
    ariaLabel: "Progress bar"
  };

  it("should render correctly", () => {
    render(<ProgressBar {...defaultProgressBarProps} />);
  });

  it("should pass a11y test", async () => {
    const {container} = render(<ProgressBar {...defaultProgressBarProps} />);

    await testA11y(container);
  });

  it("should render children correctly", () => {
    const progressBarContent = <span data-testid={"progress-bar.content"}>{"Test"}</span>;

    render(<ProgressBar {...defaultProgressBarProps}>{progressBarContent}</ProgressBar>);

    expect(screen.getByRole("progressbar")).toContainElement(screen.getByText("Test"));
  });

  it("progress bar's background color should be backgroundColor", () => {
    render(<ProgressBar {...defaultProgressBarProps} />);

    expect(screen.getByRole("progressbar")).toHaveStyle(
      `background-color: ${defaultProgressBarProps.style?.backgroundColor}`
    );
  });

  it("Progress bar track has the right size", () => {
    const {rerender} = render(<ProgressBar {...defaultProgressBarProps} />);

    expect(screen.getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      `width: ${defaultProgressBarProps.percentage}%`
    );

    rerender(<ProgressBar {...defaultProgressBarProps} percentage={120} />);

    expect(screen.getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      "width: 100%"
    );
  });

  it("if the percentage is less than 100, background color of the progress bar track should be trackColor", () => {
    render(<ProgressBar {...defaultProgressBarProps} />);

    expect(screen.getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      `background-color: ${defaultProgressBarProps.style?.trackColor}`
    );
  });

  it("if the percentage is greater or equal to 100, background color of the progress bar track should be completedColor", () => {
    const {rerender} = render(
      <ProgressBar {...defaultProgressBarProps} percentage={100} />
    );

    expect(screen.getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      `background-color: ${defaultProgressBarProps.style?.completedColor}`
    );

    rerender(<ProgressBar {...defaultProgressBarProps} percentage={120} />);

    expect(screen.getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      `background-color: ${defaultProgressBarProps.style?.completedColor}`
    );
  });
});
