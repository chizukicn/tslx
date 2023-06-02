import type * as CSS from "csstype";
import { isNumber, isString, kebabCase } from "./shared";

export function unit_f<U extends string = StyleUnit>(value: string | number, unit: U = "px" as U) {
  if (/^[0-9]+(\.[0-9]+)?$/.test(String(value))) {
    return `${value}${unit}`;
  }
  return value;
}

export function style(stylesheet: CSSProperties) {
  return Object.keys(stylesheet).reduce<string[]>((prev, cur) => {
    const value = stylesheet[cur as keyof CSSProperties];
    if (isNumber(value) || isString(value)) {
      prev.push(`${kebabCase(cur)}: ${value};`);
    }
    return prev;
  }, []).join(" ");
}

export interface CSSProperties extends CSS.Properties<string | number>, CSS.PropertiesHyphen<string | number> {
  [v: `--${string}`]: string | number | undefined
}

export type StyleUnit = "px" | "rem" | "em" | "vw" | "vh" | "vmin" | "vmax" | "%" | "cm" | "mm" | "in" | "pt" | "pc";
