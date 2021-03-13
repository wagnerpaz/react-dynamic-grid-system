import React from 'react';
import { Direction } from './Direction';
// eslint-disable-next-line no-unused-vars
import { State } from './State';
import Divider from './Divider';

type Props = {
  top?: React.ReactElement;
  topRatio?: number;
  topOnRatioChanged?: (ratio: number) => void;
  topOnOpen?: (state?: State) => void;
  right?: React.ReactElement;
  rightRatio?: number;
  rightOnRatioChanged?: (ratio: number) => void;
  rightOnOpen?: (state?: State) => void;
  bottom?: React.ReactElement;
  bottomRatio?: number;
  bottomOnRatioChanged?: (ratio: number) => void;
  bottomOnOpen?: (state?: State) => void;
  left?: React.ReactElement;
  leftRatio?: number;
  leftOnRatioChanged?: (ratio: number) => void;
  leftOnOpen?: (state?: State) => void;
  children: React.ReactElement;
};

const MultiDivider = ({
  top,
  topRatio,
  topOnRatioChanged,
  topOnOpen,
  right,
  rightRatio,
  rightOnRatioChanged,
  rightOnOpen,
  bottom,
  bottomRatio,
  bottomOnRatioChanged,
  bottomOnOpen,
  left,
  leftRatio,
  leftOnRatioChanged,
  leftOnOpen,
  children
}: Props) => {
  let child: React.ReactElement = children;

  if (bottom) {
    const bottomWrapper = (
      children: React.ReactElement
    ): React.ReactElement => (
      <Divider
        direction={Direction.BOTTOM}
        secondChildren={bottom}
        ratio={bottomRatio}
        onRatioChanged={bottomOnRatioChanged}
        onOpen={bottomOnOpen}
      >
        {children}
      </Divider>
    );
    child = bottomWrapper(child);
  }
  if (top) {
    const topWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        direction={Direction.TOP}
        secondChildren={top}
        ratio={topRatio}
        onRatioChanged={topOnRatioChanged}
        onOpen={topOnOpen}
      >
        {children}
      </Divider>
    );
    child = topWrapper(child);
  }

  if (left) {
    const leftWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        direction={Direction.LEFT}
        secondChildren={left}
        ratio={leftRatio}
        onRatioChanged={leftOnRatioChanged}
        onOpen={leftOnOpen}
      >
        {children}
      </Divider>
    );
    child = leftWrapper(child);
  }
  if (right) {
    const rightWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        direction={Direction.RIGHT}
        secondChildren={right}
        ratio={rightRatio}
        onRatioChanged={rightOnRatioChanged}
        onOpen={rightOnOpen}
      >
        {children}
      </Divider>
    );
    child = rightWrapper(child);
  }

  return child;
};

export default MultiDivider;
