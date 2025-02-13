export function paramToTitleCase(param: string): string {
  return param
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
