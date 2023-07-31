export type Slot<R = any> = (...args: any[]) => R;

export type Slots<R, K extends string | symbol | number> = Record<K, Slot<R> | undefined>;

export function renderSlot<R, F = R>(slots: Slots<R, string>, name: string, props?: any, fallback?: () => F) {
  const slot = slots[name];
  if (slot) {
    return slot(props);
  }
  if (fallback) {
    return fallback();
  }
  return undefined;
}
