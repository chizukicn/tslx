import { isIterable, isNumber, isObject, isString } from "./shared";

/**
 *
 */
export function classnames(...literals: ClassName[]): string {
  return literals
    .reduce<string>((prev, cur) => {
    if (cur) {
      if (isString(cur) || isNumber(cur)) {
        prev = prev && `${prev} `;
        prev = prev.concat(String(cur));
      } else if (isIterable(cur)) {
        prev = prev && `${prev} `;
        prev = prev.concat(classnames(...cur));
      } else if (isObject(cur)) {
        for (const key in cur) {
          if (cur[key]) {
            prev = prev && `${prev} `;
            prev = prev.concat(key);
          }
        }
      }
    }
    return prev;
  }, "");
}

/**
 *  @alias classnames
 */
export const cls = classnames;

export type ClassName =
  | Record<string, any>
  | string
  | number
  | undefined
  | null
  | Iterable<ClassName>;
