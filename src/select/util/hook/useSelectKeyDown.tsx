import React, {useCallback} from "react";

import {KEYBOARD_EVENT_KEY} from "../../../core/utils/keyboard/keyboardEventConstants";
import {SelectContextValue, SelectStateAction} from "../selectTypes";

/**
 * A hook for handle select key down event.
 * @param state - Select state
 * @param dispatch - Select state dispatch function
 * @returns {Object} - An object that contains select key down handler
 * @example
 * const {handleSelectKeyDown} = useSelectKeyDown(state, dispatch);
 * <div
 *  onKeyDown={handleSelectKeyDown}
 *  ...
 * />
 */
function useSelectKeyDown(
  state: SelectContextValue,
  dispatch: React.Dispatch<SelectStateAction>
) {
  const {isMenuOpen, focusedOptionIndex, onSelect, shouldCloseOnSelect, options} = state;

  const handleSelectKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const {key} = event;

      switch (key) {
        case KEYBOARD_EVENT_KEY.TAB: {
          if (isMenuOpen) {
            event.preventDefault();

            dispatch({type: "TOGGLE_MENU_VISIBILITY"});
          }

          break;
        }

        case KEYBOARD_EVENT_KEY.ESCAPE: {
          if (isMenuOpen) {
            dispatch({type: "TOGGLE_MENU_VISIBILITY"});
          }

          break;
        }

        case KEYBOARD_EVENT_KEY.ENTER:
        case KEYBOARD_EVENT_KEY.SPACE: {
          if (isMenuOpen) {
            event.stopPropagation();
            event.preventDefault();

            if (
              Boolean(options[focusedOptionIndex]) &&
              !options[focusedOptionIndex]?.isDisabled
            ) {
              onSelect(options[focusedOptionIndex]);

              if (shouldCloseOnSelect) {
                dispatch({type: "TOGGLE_MENU_VISIBILITY"});
              } else {
                dispatch({
                  type: "SET_FOCUSED_OPTION_INDEX",
                  payload: -1
                });
              }
            }
          }

          break;
        }

        case KEYBOARD_EVENT_KEY.ARROW_DOWN: {
          event.stopPropagation();
          event.preventDefault();

          dispatch({
            type: "SET_FOCUSED_OPTION_INDEX",
            payload: (focusedOptionIndex + 1) % options.length
          });

          break;
        }

        case KEYBOARD_EVENT_KEY.ARROW_UP: {
          event.stopPropagation();
          event.preventDefault();

          dispatch({
            type: "SET_FOCUSED_OPTION_INDEX",
            payload: (focusedOptionIndex || options.length) - 1
          });

          break;
        }

        case KEYBOARD_EVENT_KEY.HOME: {
          event.stopPropagation();
          event.preventDefault();

          dispatch({
            type: "SET_FOCUSED_OPTION_INDEX",
            payload: 0
          });

          break;
        }

        case KEYBOARD_EVENT_KEY.END: {
          event.stopPropagation();
          event.preventDefault();

          dispatch({
            type: "SET_FOCUSED_OPTION_INDEX",
            payload: options.length - 1
          });

          break;
        }

        default:
          break;
      }
    },
    [dispatch, focusedOptionIndex, isMenuOpen, options, onSelect, shouldCloseOnSelect]
  );

  return {handleSelectKeyDown};
}

export default useSelectKeyDown;
