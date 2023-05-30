export function isIterable<T>(obj: any): obj is Iterable<T> {
  return obj && typeof obj[Symbol.iterator] === "function";
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

export function isArray<T>(obj: any): obj is T[] {
  return Array.isArray(obj);
}

export function unique<S>(arr: Iterable<S>) {
  return Array.from(new Set(arr));
}

export function camelToSnakeCase(str: string, separator = "_") {
  return str.replace(/[A-Z]/g, (match) => `${separator}${match.toLowerCase()}`);
}
