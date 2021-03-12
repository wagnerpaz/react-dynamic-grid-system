import React from 'react';
import { Direction } from './Direction';
import Divider from './Divider';

type Props = {
  top?: React.ReactElement;
  topRatio?: number;
  topOnOpen?: (direction: Direction) => void;
  right?: React.ReactElement;
  rightRatio?: number;
  rightOnOpen?: (direction: Direction) => void;
  bottom?: React.ReactElement;
  bottomRatio?: number;
  bottomOnOpen?: (direction: Direction) => void;
  left?: React.ReactElement;
  leftRatio?: number;
  leftOnOpen?: (direction: Direction) => void;
  children: React.ReactElement;
};

const MultiDivider = ({
  top,
  topRatio,
  topOnOpen,
  right,
  rightRatio,
  rightOnOpen,
  bottom,
  bottomRatio,
  bottomOnOpen,
  left,
  leftRatio,
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
