import { isNumber } from "./shared";

export function range(source: string): string[];

export function range<T>(iterable: Iterable<T>): T[];

export function range(min: number, max: number): number[];

export function range(max: number): number[];

export function range<T>(min: number | Iterable<T>, max?: number): T[] | number[] | string[] {
  if (isNumber(min)) {
    if (isNumber(max)) {
      return Array.from({ length: max - min }, (_, index) => index + min);
    }
    return Array.from({ length: min }, (_, index) => index);
  }
  return Array.from(min);
}
