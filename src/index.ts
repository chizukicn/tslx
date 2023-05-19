type ClassName =
  | Record<string, boolean | undefined | null>
  | string
  | undefined
  | null
  | ClassName[];

function trimClassName(className: string) {
  return className.trim().split(/\s+/);
}

function unique<S>(arr: Iterable<S>) {
  return Array.from(new Set(arr));
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

type StyleUnit = "px" | "rem" | "em" | "vw" | "vh" | "vmin" | "vmax" | "%" | "cm" | "mm" | "in" | "pt" | "pc";

export function unit_f<U extends string = StyleUnit>(value: string | number, unit: U = "px" as U) {
  if (/^[0-9]+(\.[0-9]+)?$/.test(String(value))) {
    return `${value}${unit}`;
  }
  return value;
}

export const cls = classnames;
