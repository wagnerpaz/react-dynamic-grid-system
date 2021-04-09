import React from 'react';
import { Direction4 } from './Direction4';
// eslint-disable-next-line no-unused-vars
import { State } from './State';
import Divider from './Divider';

type Props = {
  color?: string;
  hideDividers?: boolean;
  top?: React.ReactElement | boolean;
  topId?: string;
  topRatio?: number;
  topOnOpenState?: State;
  topOnRatioChanged?: (ratio: number) => void;
  topOnOpen?: (id: string, state?: State) => void;
  topOnClose?: (id: string, state?: State) => void;
  topOnInteracting?: (id: string, interacting: boolean) => void;
  right?: React.ReactElement | boolean;
  rightId?: string;
  rightRatio?: number;
  rightOnOpenState?: State;
  rightOnRatioChanged?: (ratio: number) => void;
  rightOnOpen?: (id: string, state?: State) => void;
  rightOnClose?: (id: string, state?: State) => void;
  rightOnInteracting?: (id: string, interacting: boolean) => void;
  bottom?: React.ReactElement | boolean;
  bottomId?: string;
  bottomRatio?: number;
  bottomOnOpenState?: State;
  bottomOnRatioChanged?: (ratio: number) => void;
  bottomOnOpen?: (id: string, state?: State) => void;
  bottomOnClose?: (id: string, state?: State) => void;
  bottomOnInteracting?: (id: string, interacting: boolean) => void;
  left?: React.ReactElement | boolean;
  leftId?: string;
  leftRatio?: number;
  leftOnOpenState?: State;
  leftOnRatioChanged?: (ratio: number) => void;
  leftOnOpen?: (id: string, state?: State) => void;
  leftOnClose?: (id: string, state?: State) => void;
  leftOnInteracting?: (id: string, interacting: boolean) => void;
  children: React.ReactElement;
};

const MultiDivider = ({
  color,
  hideDividers,
  top,
  topId,
  topRatio,
  topOnOpenState,
  topOnRatioChanged,
  topOnOpen,
  topOnClose,
  topOnInteracting,
  right,
  rightId,
  rightRatio,
  rightOnOpenState,
  rightOnRatioChanged,
  rightOnOpen,
  rightOnClose,
  rightOnInteracting,
  bottom,
  bottomId,
  bottomRatio,
  bottomOnOpenState,
  bottomOnRatioChanged,
  bottomOnOpen,
  bottomOnClose,
  bottomOnInteracting,
  left,
  leftId,
  leftRatio,
  leftOnOpenState,
  leftOnRatioChanged,
  leftOnOpen,
  leftOnClose,
  leftOnInteracting,
  children
}: Props) => {
  let child: React.ReactElement = children;

  if (bottom && bottomId) {
    const bottomWrapper = (
      children: React.ReactElement
    ): React.ReactElement => (
      <Divider
        id={bottomId}
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.BOTTOM}
        secondChildren={bottom}
        ratio={bottomRatio}
        onRatioChanged={bottomOnRatioChanged}
        onOpen={bottomOnOpen}
        onOpenState={bottomOnOpenState}
        onClose={bottomOnClose}
        onInteracting={bottomOnInteracting}
      >
        {children}
      </Divider>
    );
    child = bottomWrapper(child);
  }
  if (top && topId) {
    const topWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        id={topId}
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.TOP}
        secondChildren={top}
        ratio={topRatio}
        onRatioChanged={topOnRatioChanged}
        onOpen={topOnOpen}
        onOpenState={topOnOpenState}
        onClose={topOnClose}
        onInteracting={topOnInteracting}
      >
        {children}
      </Divider>
    );
    child = topWrapper(child);
  }

  if (left && leftId) {
    const leftWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        id={leftId}
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.LEFT}
        secondChildren={left}
        ratio={leftRatio}
        onRatioChanged={leftOnRatioChanged}
        onOpen={leftOnOpen}
        onOpenState={leftOnOpenState}
        onClose={leftOnClose}
        onInteracting={leftOnInteracting}
      >
        {children}
      </Divider>
    );
    child = leftWrapper(child);
  }
  if (right && rightId) {
    const rightWrapper = (children: React.ReactElement): React.ReactElement => (
      <Divider
        id={rightId}
        color={color}
        hideDivider={hideDividers}
        direction={Direction4.RIGHT}
        secondChildren={right}
        ratio={rightRatio}
        onRatioChanged={rightOnRatioChanged}
        onOpen={rightOnOpen}
        onOpenState={rightOnOpenState}
        onClose={rightOnClose}
        onInteracting={rightOnInteracting}
      >
        {children}
      </Divider>
    );
    child = rightWrapper(child);
  }

  return child;
};

export default MultiDivider;
