import React from 'react';
import { Direction4 } from './Direction4';
// eslint-disable-next-line no-unused-vars
import { State } from './State';
import Divider from './Divider';

type Props = {
  color?: string;
  hideDividers?: boolean;
  top?: React.ReactElement;
  topRatio?: number;
  topOnRatioChanged?: (ratio: number) => void;
  topOnOpen?: (state?: State) => void;
  topOnClose?: (state?: State) => void;
  right?: React.ReactElement;
  rightRatio?: number;
  rightOnRatioChanged?: (ratio: number) => void;
  rightOnOpen?: (state?: State) => void;
  rightOnClose?: (state?: State) => void;
  bottom?: React.ReactElement;
  bottomRatio?: number;
  bottomOnRatioChanged?: (ratio: number) => void;
  bottomOnOpen?: (state?: State) => void;
  bottomOnClose?: (state?: State) => void;
  left?: React.ReactElement;
  leftRatio?: number;
  leftOnRatioChanged?: (ratio: number) => void;
  leftOnOpen?: (state?: State) => void;
  leftOnClose?: (state?: State) => void;
  children: React.ReactElement;
};

const MultiDivider = ({
  color,
  hideDividers,
  top,
  topRatio,
  topOnRatioChanged,
  topOnOpen,
  topOnClose,
  right,
  rightRatio,
  rightOnRatioChanged,
  rightOnOpen,
  rightOnClose,
  bottom,
  bottomRatio,
  bottomOnRatioChanged,
  bottomOnOpen,
  bottomOnClose,
  left,
  leftRatio,
  leftOnRatioChanged,
  leftOnOpen,
  leftOnClose,
  children
}: Props) => {
  let child: React.ReactElement = children;

  if (bottom) {
    const bottomWrapper = (
      children: React.ReactElement
    ): React.ReactElement => (
      <Divider
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.BOTTOM}
        secondChildren={bottom}
        ratio={bottomRatio}
        onRatioChanged={bottomOnRatioChanged}
        onOpen={bottomOnOpen}
        onClose={bottomOnClose}
      >
        {children}
      </Divider>
    );
    child = bottomWrapper(child);
  }
  if (top) {
    const topWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.TOP}
        secondChildren={top}
        ratio={topRatio}
        onRatioChanged={topOnRatioChanged}
        onOpen={topOnOpen}
        onClose={topOnClose}
      >
        {children}
      </Divider>
    );
    child = topWrapper(child);
  }

  if (left) {
    const leftWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.LEFT}
        secondChildren={left}
        ratio={leftRatio}
        onRatioChanged={leftOnRatioChanged}
        onOpen={leftOnOpen}
        onClose={leftOnClose}
      >
        {children}
      </Divider>
    );
    child = leftWrapper(child);
  }
  if (right) {
    const rightWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.RIGHT}
        secondChildren={right}
        ratio={rightRatio}
        onRatioChanged={rightOnRatioChanged}
        onOpen={rightOnOpen}
        onClose={rightOnClose}
      >
        {children}
      </Divider>
    );
    child = rightWrapper(child);
  }

  return child;
};

export default MultiDivider;
