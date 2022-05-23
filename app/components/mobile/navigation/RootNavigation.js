import react from "react";

export const navigationRef = react.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
