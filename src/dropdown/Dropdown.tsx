/* eslint-disable max-lines */
import CaretDownIcon from "../ui/icons/caret-down.svg";

import "./_dropdown.scss";

import React, {Fragment, useState, useRef, useEffect} from "react";
import classNames from "classnames";

import Button from "../button/Button";
import DropdownList from "./list/DropdownList";
import {KEYBOARD_EVENT_KEY} from "../core/utils/keyboardEventConstants";
import {
  DropdownOption,
  TDropdownOptionSelectHandler,
  TDropdownSelectedOption
} from "./list/item/DropdownListItem";
import {
  generateInitialFocusedDropdownOptionIndex,
  findIndexForClosestMatch
} from "./util/dropdownUtils";
import {
  DropdownPosition,
  DROPDOWN_DESELECT_OPTION,
  DESELECT_OPTION,
  DROPDOWN_SEARCH_QUERY_TIMEOUT_IN_MS
} from "./util/dropdownConstants";
import Spinner from "../spinner/Spinner";
import {SINGLE_ALPHANUMERIC_CHARACTER_REGEX} from "../core/utils/stringConstants";
import useOnClickOutside from "../core/utils/hooks/onClickOutside";

export type MenuVisibilityChangeHandlerTypeArgument = "open" | "closed";

export interface DropdownProps<OptionIdShape> {
  testid?: string;
  header?: React.ReactNode;
  placeholder?: string;
  options: DropdownOption<OptionIdShape>[];
  selectedOption: TDropdownSelectedOption<OptionIdShape>;
  onSelect: TDropdownOptionSelectHandler<OptionIdShape>;
  role: "listbox" | "menu" | "combobox";
  position?: DropdownPosition;
  customClassName?: string;
  isMultiSelect?: boolean;
  canSelectAlreadySelected?: boolean;
  hasError?: boolean;
  hasHeaderBoxShadow?: boolean;
  hasDeselectOption?: boolean;
  isDisabled?: boolean;
  errorMessages?: string[];
  isMenuOpenHook?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  headerWithoutButton?: React.ReactNode;
  shouldCloseOnSelect?: boolean;
  onMenuVisibilityChange?: (type: MenuVisibilityChangeHandlerTypeArgument) => void;
  areOptionsFetching?: boolean;
  deselectOptionTitle?: string;
  noOptionsMessage?: string;
  headerButtonClassName?: string;
  shouldJumpToQuery?: boolean;
  shouldShowEmptyOptions?: boolean;
  canOpenDropdownMenu?: boolean;
}

/* eslint-disable complexity */
function Dropdown<OptionIdShape extends string>({
  testid,
  header,
  placeholder,
  customClassName,
  position = "bottom",
  role,
  isMultiSelect = false,
  options,
  selectedOption,
  onSelect,
  canSelectAlreadySelected = false,
  hasHeaderBoxShadow = false,
  hasDeselectOption = true,
  hasError,
  isDisabled,
  isMenuOpenHook,
  headerWithoutButton,
  shouldCloseOnSelect = true,
  onMenuVisibilityChange,
  areOptionsFetching = false,
  deselectOptionTitle = "",
  noOptionsMessage,
  headerButtonClassName = "white-button",
  shouldJumpToQuery = true,
  shouldShowEmptyOptions = true,
  canOpenDropdownMenu = true
}: DropdownProps<OptionIdShape>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [computedOptions, setComputedOptions] = useState<DropdownOption[]>([]);
  const defaultMenuOpenHook = useState(false);
  const [isMenuOpen, setMenuVisibility] = isMenuOpenHook || defaultMenuOpenHook;
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [keyQuery, setKeyQuery] = useState("");
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(
    generateInitialFocusedDropdownOptionIndex(position, computedOptions, selectedOption)
  );
  // Button will gain focus when shouldFocusOnButton is set to true
  const [shouldFocusOnHeaderButton, setShouldFocusOnHeaderButton] = useState(false);
  const containerClassName = classNames("dropdown-container", customClassName, {
    "dropdown-open": isMenuOpen,
    "option-selected": Boolean(selectedOption || deselectOptionTitle),
    "has-header-box-shadow": hasHeaderBoxShadow,
    "has-error": hasError,
    disabled: isDisabled || areOptionsFetching
  });
  const shouldShowMenu = isMenuOpen && (shouldShowEmptyOptions || options.length > 0);

  useEffect(() => {
    setComputedOptions(
      options.length && hasDeselectOption
        ? [{...DESELECT_OPTION, title: deselectOptionTitle}, ...options]
        : options
    );
  }, [options, deselectOptionTitle, hasDeselectOption]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (keyQuery && isMenuOpen) {
      const closestMatchingItemIndex = findIndexForClosestMatch(
        computedOptions,
        keyQuery
      );

      if (closestMatchingItemIndex > -1) {
        setFocusedOptionIndex(closestMatchingItemIndex);
      }

      timeoutId = setTimeout(() => {
        setKeyQuery("");
      }, DROPDOWN_SEARCH_QUERY_TIMEOUT_IN_MS);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [keyQuery, computedOptions, isMenuOpen]);

  const defaultDropdownHeader = (
    <div className={"dropdown-header-button-default-content"}>
      {selectedOption && selectedOption.icon}

      <span className={"dropdown-header-button-text"}>
        {selectedOption ? selectedOption.title : deselectOptionTitle || placeholder}
      </span>

      {areOptionsFetching ? (
        <Spinner spinnerColor={"black"} backgroundColor={"#EBEBEB"} />
      ) : (
        <CaretDownIcon aria-hidden={true} />
      )}
    </div>
  );

  let dropdownHeader = (
    <Button
      testid={`${testid}.header-button`}
      customClassName={classNames("dropdown-header-button", headerButtonClassName)}
      isDisabled={areOptionsFetching}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={toggleDropdown}
      tabIndex={-1}
      aria-haspopup={role}
      aria-expanded={isMenuOpen}
      shouldFocus={shouldFocusOnHeaderButton}>
      {header || defaultDropdownHeader}
    </Button>
  );

  if (headerWithoutButton) {
    dropdownHeader = <Fragment>{headerWithoutButton}</Fragment>;
  }

  useOnClickOutside(dropdownRef, closeDropdown);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add("dropdown-menu-open");
    } else {
      document.documentElement.classList.remove("dropdown-menu-open");
    }

    if (onMenuVisibilityChange) {
      onMenuVisibilityChange(isMenuOpen ? "open" : "closed");
    }
  }, [isMenuOpen, onMenuVisibilityChange]);

  return (
    <div
      ref={dropdownRef}
      role={role}
      className={containerClassName}
      tabIndex={isDisabled ? -1 : 0}
      onFocus={handleDropdownFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}>
      {dropdownHeader}

      {shouldShowMenu && (
        <DropdownList
          testid={testid}
          customClassName={position}
          role={role}
          options={computedOptions}
          selectedOption={selectedOption}
          focusedOption={computedOptions[focusedOptionIndex]}
          onSelect={handleOptionSelect}
          onFocus={handleOptionFocus}
          // Pass mouseDown and mouseUp handlers to catch clicks within an option element and prevent blur
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          ariaLabelledBy={`${testid}.header-button`}
          ariaHidden={!isMenuOpen}
          isMultiSelect={isMultiSelect}
          canSelectAlreadySelected={canSelectAlreadySelected}
          noOptionsMessage={noOptionsMessage}
        />
      )}
    </div>
  );

  function handleOptionSelect(
    option: Parameters<TDropdownOptionSelectHandler>[0],
    event?: React.SyntheticEvent<HTMLLIElement>
  ) {
    if (!isDisabled && option) {
      if (option.id === DROPDOWN_DESELECT_OPTION) {
        onSelect(null, event);
      } else {
        // @ts-ignore
        onSelect(option, event);
      }
    }

    if (shouldCloseOnSelect) {
      toggleDropdown();
    } else {
      // Make sure focus is on the dropdown button to prevent loss of blur functionality after selection
      setShouldFocusOnHeaderButton(true);
    }
  }

  function handleOptionFocus(option: Parameters<TDropdownOptionSelectHandler>[0]) {
    setFocusedOptionIndex(computedOptions.findIndex((item) => item.id === option!.id));
  }

  function closeDropdown() {
    setMenuVisibility(false);
  }

  function toggleDropdown() {
    setMenuVisibility(!isMenuOpen);
  }

  function handleDropdownFocus() {
    if (!isMouseDown && canOpenDropdownMenu) {
      setMenuVisibility(true);
    }
  }

  function handleBlur() {
    // Prevent blur on option clicks
    if (!isMouseDown && isMenuOpen) {
      toggleDropdown();
    }

    // Reset the button focus state after closing dropdown
    setShouldFocusOnHeaderButton(false);
  }

  function handleMouseDown() {
    setIsMouseDown(true);
  }

  function handleMouseUp() {
    setIsMouseDown(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const {key} = event;

    switch (key) {
      case KEYBOARD_EVENT_KEY.ESCAPE: {
        if (isMenuOpen) {
          event.stopPropagation();
          toggleDropdown();
        }
        break;
      }

      case KEYBOARD_EVENT_KEY.ENTER: {
        if (isMenuOpen) {
          event.stopPropagation();
          event.preventDefault();
          handleOptionSelect(computedOptions[focusedOptionIndex]);
        }
        break;
      }

      case KEYBOARD_EVENT_KEY.ARROW_DOWN: {
        event.stopPropagation();
        event.preventDefault();
        setFocusedOptionIndex((focusedOptionIndex + 1) % computedOptions.length);
        break;
      }

      case KEYBOARD_EVENT_KEY.ARROW_UP: {
        event.stopPropagation();
        event.preventDefault();
        setFocusedOptionIndex((focusedOptionIndex || computedOptions.length) - 1);
        break;
      }

      default: {
        // Ignore if the input key is not alphanumeric
        if (shouldJumpToQuery && key.match(SINGLE_ALPHANUMERIC_CHARACTER_REGEX)) {
          setKeyQuery(keyQuery + key);
        }
        break;
      }
    }
  }
}
/* eslint-enable complexity */

export default Dropdown;
/* eslint-enable max-lines */