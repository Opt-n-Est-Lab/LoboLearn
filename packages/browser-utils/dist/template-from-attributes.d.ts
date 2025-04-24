type AttributeMap = Record<string, string>;
/**
 * For each key in `attributes`, copies that attribute's value from `source`
 * into all elements within `target` that match the corresponding value in
 * `attributes`.
 *
 * For `<input type="checkbox">` elements it interprets the attribute as JSON
 * and uses the truthiness of it to set `checked`. For other `<input>` elements,
 * it sets the `value` attribute. For all others, it sets the `textContent`
 * attribute.
 *
 * @param source The element to copy attributes from
 * @param target The element to copy attributes into
 * @param attributes A map of attributes to copy from `source` to `target`
 * @param param.debug If true, logs debug information to the console
 */
export declare function templateFromAttributes(source: HTMLElement, target: HTMLElement, attributes: AttributeMap): void;
export {};
