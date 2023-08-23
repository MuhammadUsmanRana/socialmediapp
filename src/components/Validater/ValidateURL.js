export function ValidateURL(string) {
  if (string) {
    let url;
    try {
      url = new URL(string);
    } catch (error) {
      return false;
    }
    return url.protocol === "https:" || url.protocol === "https:";
  } else {
    return false;
  }
}
