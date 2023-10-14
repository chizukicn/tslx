import type * as CSS from "csstype";
import { isNumber, isString, kebabCase } from "./shared";

export function unitFormat<U extends string = StyleUnit, V extends string | number = string | number>(value: V, unit: U = "px" as U) {
  const strValue = String(value);
  if (/^\d+(\.\d+)?$/.test(strValue)) {
    return `${strValue}${unit}`;
  }
  return strValue;
}

// eslint-disable-next-line camelcase
export const unit_f = unitFormat;

export const createUnitFormat = <U extends string = StyleUnit, V extends string | number = string | number >(unit: U) => (value: V) => unitFormat(value, unit);

export const px = createUnitFormat("px");

export const rem = createUnitFormat("rem");

export const em = createUnitFormat("em");

export const vw = createUnitFormat("vw");

export const vh = createUnitFormat("vh");

export const percent = createUnitFormat("%");

export function style(stylesheet: CSSProperties) {
  return Object.keys(stylesheet).reduce<string[]>((prev, cur) => {
    const value = stylesheet[cur as keyof CSSProperties];
    if (isNumber(value) || isString(value)) {
      prev.push(`${kebabCase(cur)}: ${value};`);
    }
    return prev;
  }, []).join(" ");
}

export function cssvar(name: string, value: string | number) {
  return `--${name}: ${value};`;
}

export interface CSSProperties extends CSS.Properties<string | number>, CSS.PropertiesHyphen<string | number> {
  [v: `--${string}`]: string | number | undefined
}

export type StyleUnit = "px" | "rem" | "em" | "vw" | "vh" | "vmin" | "vmax" | "%" | "cm" | "mm" | "in" | "pt" | "pc";
