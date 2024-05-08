export function getTrimValue(value: string | null, defaultValue: string | null = null): string | null {
  return value?.trim() || defaultValue;
}
