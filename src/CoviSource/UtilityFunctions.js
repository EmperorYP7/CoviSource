import light from "assets/img/logo.svg";
import dark from "assets/img/dark.svg";

export function isMobile() {
  return window.innerWidth <= 768;
}

export function logoURL(theme) {
  // theme = oneOf["DARK", "LIGHT"]
  return theme === "DARK" ? dark : light;
}
