export type EventType = string | symbol;

// An event handler can take an optional event argument
// and should not return a value
export type Handler<T extends unknown[]> = (...event: T) => void;

// An array of all currently registered event handlers for a type
export type EventHandlerList<T extends unknown[]> = Array<Handler<T>>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown[]>> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]>
>;

export type ListenObject<Events extends Record<EventType, unknown[]>> = Record <keyof Events, Handler<Events[keyof Events]>>;

export interface Emitter<Events extends Record<EventType, unknown[]>> {
  all: EventHandlerMap<Events>

  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): () => void

  once<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): () => void

  listen<O extends ListenObject<Events>>(map: O): Record<keyof O, () => void>

  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): this

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
    on<Key extends keyof Events>(this: Emitter<Events>, type: Key, handler: Handler<Events[Key]>) {
      const handlers: Array<Handler<Events[Key]>> | undefined = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
      }
      return () => {
        this.off(type, handler);
      };
    },

    listen<O extends ListenObject<Events>>(this: Emitter<Events>, map: O) {
      const off = {} as Record<keyof O, () => void>;
      for (const [type, handler] of Object.entries(map)) {
        this.on(type as keyof Events, handler);
      }
      return off;
    },

    once<Key extends keyof Events>(this: Emitter<Events>, type: Key, handler: Handler<Events[Key]>) {
      const off = this.on(type, (...args) => {
        off();
        handler(...args);
      });
      return off;
    },

    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off<Key extends keyof Events>(this: Emitter<Events>, type: Key, handler?: Handler<Events[Key]>) {
      const handlers: Array<Handler<Events[Key]>> | undefined = all!.get(type);
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
          if (handlers.length === 0) {
            all.delete(type);
          }
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
      const handlers = all.get(type);
      if (handlers) {
        (handlers as EventHandlerList<Events[keyof Events]>).forEach(
          (handler) => {
            handler(...evt);
          }
        );
      }
      return this;
    }
  };
}
