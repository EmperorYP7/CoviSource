export function isMobile() {
  return window.innerWidth <= 768;
}

export function logoURL(theme) {
  // theme = oneOf["DARK", "LIGHT"]
  return theme === "DARK"
    ? "https://raw.githubusercontent.com/EricLiclair/imageHost/f71710239358a3f6d742b210590219f0f7665543/COVISOURCE-DARK.svg"
    : "https://raw.githubusercontent.com/EricLiclair/imageHost/e730d59edbca9d8992f90948ae91275e632b9e28/COVISOURCE.svg";
}
