import { isArray, isObject, isString, unique } from "./shared";

/**
 *
 */
export function classnames(...literals: ClassName[]) {
  return unique(literals
    .reduce<string[]>((prev, cur) => {
      if (isArray(cur)) {
        prev.push(...classnames(...cur));
      } else if (isString(cur)) {
        prev.push(...cur.trim().split(/\s+/));
      } else if (isObject(cur)) {
        prev.push(...Object.keys(cur).filter((key) => !!cur[key]));
      }
      return prev;
    }, [])).filter((item) => !!item);
}

/**
 *  @alias classnames
 */
export const cls = classnames;

export type ClassName =
  | Record<string, boolean | undefined | null>
  | string
  | undefined
  | null
  | ClassName[];
