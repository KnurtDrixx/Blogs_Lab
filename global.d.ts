export {};

declare global {
  interface LocalHTMLMarqueeElement extends HTMLElement {
    behavior: string;
    bgColor: string;
    direction: string;
    height: string;
    hspace: number;
    loop: number;
    scrollAmount: number;
    scrollDelay: number;
    trueSpeed: boolean;
    vspace: number;
    width: string;
    start(): void;
    stop(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: LocalHTMLMarqueeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: LocalHTMLMarqueeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }
  interface HTMLMarqueeElement extends LocalHTMLMarqueeElement {}

  interface HTMLElementDeprecatedTagNameMapTemp extends Omit<HTMLElementDeprecatedTagNameMap, "HTMLMarqueeElement"> {}
  interface HTMLElementTagNameMap {
    marquee: LocalHTMLMarqueeElement;
  }

  interface HTMLMarqueeElementGlobalReference extends LocalHTMLMarqueeElement {}

  namespace React {
    interface HTMLMarqueeElement extends HTMLElement {}

    interface MarqueeHTMLAttributes extends HTMLAttributes<HTMLMarqueeElementGlobalReference> {}

    interface ReactHTML {
      marquee: React.DetailedHTMLFactory<React.MarqueeHTMLAttributes, LocalHTMLMarqueeElement>;
    }

    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<React.MarqueeHTMLAttributes, LocalHTMLMarqueeElement>;
    }

    interface HTMLElementTagNameMap {
      marquee: LocalHTMLMarqueeElement;
    }
  }
}
