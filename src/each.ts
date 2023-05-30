import { range } from "./range";
import { isArray, isIterable, isNumber, isObject } from "./shared";

export function renderList<U>(source: string, render: (item: string, index: number) => U): U[];

export function renderList<T, U>(source: T[], render: (item: T, index: number) => U): U[];

export function renderList<T, U>(source: Iterable<T>, render: (item: T, index: number) => U): U[];

export function renderList<U>(source: number, render: (item: number, index: number) => U): U[];

export function renderList<T, U>(source: T, render: <K extends keyof T>(item: T[K], key: T[K], index: number) => U): U[];

export function renderList(source: any, render: (...args: any[]) => any) {
  if (isArray(source)) {
    return source.map(render);
  } else if (isNumber(source)) {
    return range(1, source + 1).map(render);
  } else if (isIterable(source)) {
    return Array.from(source).map(render);
  }
  if (isObject(source)) {
    return Object.keys(source).map((key, index) => render(source[key], key, index));
  }
  return [];
}

/**
 * @alias renderList
 */
export const each = renderList;
