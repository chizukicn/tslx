export function isIterable<T = any>(obj: any): obj is Iterable<T> {
  return !!obj && typeof obj[Symbol.iterator] === "function";
}

export function isObject(obj: any): obj is Record<string, any> {
  return typeof obj === "object" && obj !== null;
}

export function isString(obj: any): obj is string {
  return typeof obj === "string";
}

export function isNumber(obj: any): obj is number {
  return typeof obj === "number";
}

export function isArray(obj: any): obj is any[] {
  return Array.isArray(obj);
}

export function unique<S>(arr: Iterable<S>) {
  return Array.from(new Set(arr));
}

export function decamelize(str: string, separator: string) {
  return str.replace(/[A-Z]/g, (match) => `${separator}${match.toLowerCase()}`);
}

export function snakeCase(str: string) {
  return decamelize(str, "_");
}

export function kebabCase(str: string) {
  return decamelize(str, "-");
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
