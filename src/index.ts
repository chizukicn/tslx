import type * as CSS from "csstype";

function trimClassName(className: string) {
  return className.trim().split(/\s+/);
}

function unique<S>(arr: Iterable<S>) {
  return Array.from(new Set(arr));
}

function toSnakeCase(str: string, separator = "_") {
  return str.replace(/[A-Z]/g, (match) => `${separator}${match.toLowerCase()}`);
}

export function classnames(...literals: ClassName[]) {
  return unique(literals
    .reduce<string[]>((prev, cur) => {
      if (Array.isArray(cur)) {
        prev.push(...classnames(...cur));
      } else if (typeof cur === "string") {
        prev.push(...trimClassName(cur));
      } else if (typeof cur === "object" && cur !== null) {
        prev.push(...Object.keys(cur).filter((key) => !!cur[key]));
      }
      return prev;
    }, [])).filter((item) => !!item);
}

export function unit_f<U extends string = StyleUnit>(value: string | number, unit: U = "px" as U) {
  if (/^[0-9]+(\.[0-9]+)?$/.test(String(value))) {
    return `${value}${unit}`;
  }
  return value;
}

export const cls = classnames;

export function style(stylesheet: CSSProperties) {
  return Object.keys(stylesheet).reduce<string[]>((prev, cur) => {
    const value = stylesheet[cur as keyof CSSProperties];
    if (typeof value === "string" || typeof value === "number") {
      prev.push(`${toSnakeCase(cur, "-")}: ${value};`);
    }
    return prev;
  }, []).join(" ");
}

export interface CSSProperties extends CSS.Properties<string | number>, CSS.PropertiesHyphen<string | number> {
}

export type ClassName =
  | Record<string, boolean | undefined | null>
  | string
  | undefined
  | null
  | ClassName[];

export type StyleUnit = "px" | "rem" | "em" | "vw" | "vh" | "vmin" | "vmax" | "%" | "cm" | "mm" | "in" | "pt" | "pc";

function isIterable<T>(obj: any): obj is Iterable<T> {
  return obj && typeof obj[Symbol.iterator] === "function";
}

export function range(source: string): string[];

export function range<T>(iterable: Iterable<T>): T[];

export function range(min: number, max: number): number[];

export function range(max: number): number[];

export function range<T>(min: number | Iterable<T>, max?: number): T[] | number[] | string[] {
  if (typeof min === "number") {
    if (typeof max === "number") {
      return Array.from({ length: max - min }, (_, index) => index + min);
    }
    return Array.from({ length: min }, (_, index) => index);
  }
  return Array.from(min);
}

export function renderList<T, U>(source: T, render: <K extends keyof T>(item: T[K], key: T[K], index: number) => U): U[];

export function renderList<U>(source: string, render: (item: string, index: number) => U): U[];

export function renderList<T, U>(source: T[], render: (item: T, index: number) => U): U[];

export function renderList<T, U>(source: Iterable<T>, render: (item: T, index: number) => U): U[];

export function renderList<U>(source: number, render: (item: number, index: number) => U): U[];

export function renderList(source: any, render: (...args: any[]) => any) {
  if (Array.isArray(source)) {
    return source.map(render);
  } else if (typeof source === "number") {
    return range(1, source + 1).map(render);
  } else if (isIterable(source)) {
    return Array.from(source).map(render);
  }
  return Object.keys(source).map((key, index) => render(source[key], key, index));
}

export const each = renderList;
