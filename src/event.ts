export type EventType = string | symbol;

// An event handler can take an optional event argument
// and should not return a value
export type Handler<T extends unknown[]> = (...event: T) => void;
export type WildcardHandler<T extends Record<EventType, unknown[]>> = (
  type: keyof T,
  ...event: T[keyof T]
) => void;

// An array of all currently registered event handlers for a type
export type EventHandlerList<T extends unknown[]> = Array<Handler<T>>;
export type WildCardEventHandlerList<T extends Record<EventType, unknown[]>> = Array<
  WildcardHandler<T>
>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown[]>> = Map<
  keyof Events | "*",
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;

export interface Emitter<Events extends Record<EventType, unknown[]>> {
  all: EventHandlerMap<Events>

  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): this
  on(type: "*", handler: WildcardHandler<Events>): this

  off<Key extends keyof Events>(
    type: Key,
    handler?: Handler<Events[Key]>
  ): this
  off(type: "*", handler: WildcardHandler<Events>): this

  emit<Key extends keyof Events>(type: Key, ...event: Events[Key]): this
}

/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * Forked from https://github.com/developit/mitt.git
 * @license MIT Jason Miller <https://jasonformat.com>
 * @name mitt
 * @returns {Emitter}
 */
export function mitt<Events extends Record<EventType, unknown[]>>(
  source?: EventHandlerMap<Events>
): Emitter<Events> {
  type GenericEventHandler =
    | Handler<Events[keyof Events]>
    | WildcardHandler<Events>;
  const all = source ?? new Map<EventType, EventHandlerList<Events[keyof Events]>>();

  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on<Key extends keyof Events>(this: Emitter<Events>, type: Key, handler: GenericEventHandler) {
      const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
      }
      return this;
    },

    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off<Key extends keyof Events>(this: Emitter<Events>, type: Key, handler?: GenericEventHandler) {
      const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        } else {
          all.delete(type);
        }
      }
      return this;
    },

    /**
     * Invoke all handlers for the given type.
     * If present, `'*'` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit<Key extends keyof Events>(this: Emitter<Events>, type: Key, ...evt: Events[Key]) {
      let handlers = all.get(type);
      if (handlers) {
        (handlers as EventHandlerList<Events[keyof Events]>).forEach(
          (handler) => {
            handler(...evt);
          }
        );
      }

      handlers = all.get("*");
      if (handlers) {
        (handlers as WildCardEventHandlerList<Events>).forEach((handler) => {
          handler(type, ...evt);
        });
      }
      return this;
    }
  };
}
