import React from "react";
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../../../core/utils/test/testUtils";
import FileInput from "./FileInput";

describe("<FileInput />", () => {
  afterEach(cleanup);

  const defaultFileInputProps = {
    testid: "file-input",
    name: "file-input",
    htmlFor: "file-input",
    onChange: jest.fn(),
    children: "Upload File"
  };

  it("should render correctly", () => {
    render(<FileInput {...defaultFileInputProps} />);
  });

  it("should matches snapshot", () => {
    const tree = create(<FileInput {...defaultFileInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<FileInput {...defaultFileInputProps} />);

    await testA11y(container);
  });

  it("should render children correctly", () => {
    const {getByTestId} = render(<FileInput {...defaultFileInputProps} />);

    expect(getByTestId("file-input.label")).toHaveTextContent("Upload File");
  });

  it("should upload file correctly", () => {
    const file = new File(["hipo"], "hipo.png", {type: "image/png"});

    render(<FileInput {...defaultFileInputProps} />);
    const fileInput = document.getElementsByTagName("input")[0]!;

    fireEvent.change(fileInput, {target: {files: [file]}});

    expect(fileInput.files![0]).toEqual(file);
    expect(defaultFileInputProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("should upload multiple files correctly", () => {
    const files = [
      new File(["hipo"], "hipo.png", {type: "image/png"}),
      new File(["labs"], "labs.png", {type: "image/png"})
    ];

    render(<FileInput {...defaultFileInputProps} />);

    const fileInput = document.getElementsByTagName("input")[0]!;

    fireEvent.change(fileInput, {target: {files}});

    expect(fileInput.files).toHaveLength(files.length);
    expect(fileInput.files![0]).toStrictEqual(files[0]);
    expect(fileInput.files![1]).toStrictEqual(files[1]);
    expect(defaultFileInputProps.onChange).toHaveBeenCalledTimes(files.length);
  });

  it("should display custom spinner correctly", () => {
    const customSpinnerContent = <p data-testid={"custom-spinner"}>{"Loading..."}</p>;

    const {getByTestId} = render(
      <FileInput
        isPending={true}
        customSpinner={customSpinnerContent}
        {...defaultFileInputProps}
      />
    );

    const customSpinner = getByTestId("custom-spinner");

    expect(getByTestId("file-input.label")).toContainElement(customSpinner);
  });

  it("disabled property should works correctly", () => {
    const {rerender, getByTestId} = render(
      <FileInput isDisabled={true} {...defaultFileInputProps} />
    );

    expect(getByTestId("file-input")).toHaveAttribute("disabled");
    expect(getByTestId("file-input")).toBeDisabled();
    expect(getByTestId("file-input.label")).toHaveClass("file-input__label--is-disabled");

    rerender(<FileInput isPending={true} {...defaultFileInputProps} />);

    expect(getByTestId("file-input")).toHaveAttribute("disabled");
    expect(getByTestId("file-input")).toBeDisabled();
    expect(getByTestId("file-input.label")).toHaveClass("file-input__label--is-disabled");
  });
});
