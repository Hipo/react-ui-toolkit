import {ToastContextState} from "./toastTypes";

const DEFAULT_TOAST_TIMEOUT = 4000;

const initialToastState: ToastContextState = {
  toastStack: [],
  autoCloseToasts: true
};

export {DEFAULT_TOAST_TIMEOUT, initialToastState};
