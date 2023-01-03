import * as React from "react";

//@ts-ignore
const derivedAttrs = {} as React.MarqueeHTMLAttributes;

type MarqueeAttributes = keyof typeof derivedAttrs;
//@ts-ignore
type MarqueeVals = React.MarqueeHTMLAttributes[MarqueeAttributes];

//@ts-ignore
interface MqComponentProps extends React.MarqueeHTMLAttributes {
  // @ts-ignore
  children: React.ReactNode;
  behavior: "scroll" | "alternate" | "slide";
  scrollamount: number | `${number}`;
  //@ts-ignore
  [key in MarqueeAttributes]: MarqueeVals;
}

const Marquee = ({ children, ...props }: MqComponentProps) => {
  //@ts-ignore
  const mq = React.createElement<HTMLMarqueeElement>("marquee", props, children);
  return mq;
};

export default Marquee;
