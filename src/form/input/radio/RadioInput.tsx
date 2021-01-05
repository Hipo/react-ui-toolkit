import "./_radio-input.scss";

import React from "react";
import classNames from "classnames";

export interface RadioInputItem<Id = string, Context = any> {
  id: Id;
  content: React.ReactNode;
  inputProps: {
    htmlFor: string;
    value: string;
    name: string;
  };
  context?: Context;
  customClassName?: string;
}

export type RadioInputSelectHandler<Id = string, Context = any> = (
  item: RadioInputItem<Id, Context>,
  event?: React.SyntheticEvent<HTMLInputElement>
) => void;

export interface RadioInputProps {
  item: RadioInputItem;
  onSelect: RadioInputSelectHandler;
  isSelected: boolean;
  testid?: string;
  isDisabled?: boolean;
}

function RadioInput({testid, item, onSelect, isSelected, isDisabled}: RadioInputProps) {
  const {
    inputProps: {name, value, htmlFor},
    customClassName,
    content
  } = item;
  const containerClassName = classNames("radio-input-label", customClassName, {
    "radio-input-label--is-selected": isSelected,
    "radio-input-label--is-disabled": isDisabled
  });

  return (
    <label data-testid={testid} htmlFor={htmlFor} className={containerClassName}>
      <input
        type={"radio"}
        id={htmlFor}
        name={name}
        value={value}
        className={"radio-input"}
        onChange={handleRadioButtonChange}
        checked={isSelected}
        disabled={isDisabled}
      />

      <span className={"radio-input-label__icon"} />

      {content}
    </label>
  );

  function handleRadioButtonChange(event: React.SyntheticEvent<HTMLInputElement>) {
    onSelect(item, event);
  }
}

export default RadioInput;
