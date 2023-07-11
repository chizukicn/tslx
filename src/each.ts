import { isIterable, isNumber, isObject } from "./shared";

export function renderList<U>(source: string, render: (item: string, index: number) => U): U[];

export function renderList<T, U>(source: T[], render: (item: T, index: number) => U): U[];

export function renderList<T, U>(source: Iterable<T>, render: (item: T, index: number) => U): U[];

export function renderList<U>(source: number, render: (item: number, index: number) => U): U[];

export function renderList<T, U>(source: T, render: <K extends keyof T>(item: T[K], key: T[K], index: number) => U): U[];

export function renderList(source: any, render: (...args: any[]) => any) {
  const result: any[] = [];

  if (isIterable(source)) {
    let index = 0;
    for (const item of source) {
      result.push(render(item, index++));
    }
  } else if (isNumber(source)) {
    for (let i = 0; i < source; i++) {
      result.push(render(i + 1, i));
    }
  } else if (isObject(source)) {
    let index = 0;
    for (const key in source) {
      result.push(render(source[key], key, index++));
    }
  }
  return result;
}

/**
 * @alias renderList
 */
export const each = renderList;

