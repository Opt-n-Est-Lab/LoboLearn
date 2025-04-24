export interface FocusTrap {
    deactivate(): void;
}
export declare function trapFocus(element: Element): FocusTrap;
export declare function focusFirstFocusableChild(el: HTMLElement): void;
