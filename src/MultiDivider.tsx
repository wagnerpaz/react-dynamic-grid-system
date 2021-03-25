import React from 'react';
import { Direction4 } from './Direction4';
// eslint-disable-next-line no-unused-vars
import { State } from './State';
import Divider from './Divider';

type Props = {
  color?: string;
  hideDividers?: boolean;
  top?: React.ReactElement | boolean;
  topRatio?: number;
  topOnOpenState?: State;
  topOnRatioChanged?: (ratio: number) => void;
  topOnOpen?: (state?: State) => void;
  topOnClose?: (state?: State) => void;
  right?: React.ReactElement | boolean;
  rightRatio?: number;
  rightOnOpenState?: State;
  rightOnRatioChanged?: (ratio: number) => void;
  rightOnOpen?: (state?: State) => void;
  rightOnClose?: (state?: State) => void;
  bottom?: React.ReactElement | boolean;
  bottomRatio?: number;
  bottomOnOpenState?: State;
  bottomOnRatioChanged?: (ratio: number) => void;
  bottomOnOpen?: (state?: State) => void;
  bottomOnClose?: (state?: State) => void;
  left?: React.ReactElement | boolean;
  leftRatio?: number;
  leftOnOpenState?: State;
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
  topOnOpenState,
  topOnRatioChanged,
  topOnOpen,
  topOnClose,
  right,
  rightRatio,
  rightOnOpenState,
  rightOnRatioChanged,
  rightOnOpen,
  rightOnClose,
  bottom,
  bottomRatio,
  bottomOnOpenState,
  bottomOnRatioChanged,
  bottomOnOpen,
  bottomOnClose,
  left,
  leftRatio,
  leftOnOpenState,
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
        onOpenState={bottomOnOpenState}
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
        onOpenState={topOnOpenState}
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
        onOpenState={leftOnOpenState}
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
        onOpenState={rightOnOpenState}
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
