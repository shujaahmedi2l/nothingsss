export function getCopiedValue(value: string) {
  return navigator.clipboard.writeText(value);
}
