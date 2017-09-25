export const versionString = (...parts: string[]): string => {
  return parts.filter(s => { return s && s.length > 0 }).join('.');
}
