import React, { useEffect, useState } from 'react';
import MultiDivider from './MultiDivider';
import { Direction9 } from './Direction9';
import { State } from './State';

type Props = {
  direction: Direction9;
  state?: State;
  children: React.ReactElement;
};

const Cell = ({ children, direction, state }: Props) => {
  const [top, setTop] = useState<React.ReactElement>(<div />);
  const [right, setRight] = useState<React.ReactElement>(<div />);
  const [bottom, setBottom] = useState<React.ReactElement>(<div />);
  const [left, setLeft] = useState<React.ReactElement>(<div />);
  const [childrenS, setChildrenS] = useState<React.ReactElement>(children);

  console.log('state', state);

  const ph = (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue'
      }}
    >
      APP
    </div>
  );

  useEffect(() => {
    if (state?.left) {
      openLeft(state.left);
    }
    if (state?.right) {
      openRight(state.right);
    }
    if (state?.top) {
      if (direction === Direction9.LEFT) {
        openTopLeft(state.top);
      } else if (direction === Direction9.RIGHT) {
        openTopRight(state.top);
      }
    }
    if (state?.bottom) {
      if (direction === Direction9.LEFT) {
        openBottomLeft(state.top);
      } else if (direction === Direction9.RIGHT) {
        openBottomRight(state.top);
      }
    }
  }, [state]);

  const openLeft = (state: State | undefined) => {
    setLeft(
      <Cell direction={Direction9.LEFT} state={state}>
        {ph}
      </Cell>
    );
  };

  const openTopLeft = (state: State | undefined) => {
    setTop(
      <Cell direction={Direction9.TOP_LEFT} state={state}>
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  const openBottomLeft = (state: State | undefined) => {
    setBottom(
      <Cell direction={Direction9.BOTTOM_LEFT} state={state}>
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  const openRight = (state: State | undefined) => {
    setRight(
      <Cell direction={Direction9.RIGHT} state={state}>
        {ph}
      </Cell>
    );
  };

  const openTopRight = (state: State | undefined) => {
    setTop(
      <Cell direction={Direction9.TOP_RIGHT} state={state}>
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  const openBottomRight = (state: State | undefined) => {
    setBottom(
      <Cell direction={Direction9.BOTTOM_RIGHT} state={state}>
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  switch (direction) {
    case Direction9.CENTER:
      return (
        <MultiDivider
          right={right}
          rightOnOpen={openRight}
          rightRatio={state?.right?.ratio}
          left={left}
          leftRatio={state?.left?.ratio}
          leftOnOpen={openLeft}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.LEFT:
      return (
        <MultiDivider
          top={top}
          topOnOpen={openTopLeft}
          topRatio={state?.top?.ratio}
          bottom={bottom}
          bottomOnOpen={openBottomLeft}
          bottomRatio={state?.bottom?.ratio}
          left={left}
          leftOnOpen={openLeft}
          leftRatio={state?.left?.ratio}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.TOP_LEFT:
      return (
        <MultiDivider
          top={top}
          topOnOpen={openTopLeft}
          topRatio={state?.top?.ratio}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.BOTTOM_LEFT:
      return (
        <MultiDivider
          bottom={bottom}
          bottomOnOpen={openBottomLeft}
          bottomRatio={state?.bottom?.ratio}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.RIGHT:
      return (
        <MultiDivider
          top={top}
          topOnOpen={openTopRight}
          topRatio={state?.top?.ratio}
          bottom={bottom}
          bottomOnOpen={openBottomRight}
          bottomRatio={state?.bottom?.ratio}
          right={right}
          rightOnOpen={openRight}
          rightRatio={state?.right?.ratio}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.TOP_RIGHT:
      return (
        <MultiDivider
          top={top}
          topOnOpen={openTopRight}
          topRatio={state?.top?.ratio}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.BOTTOM_RIGHT:
      return (
        <MultiDivider
          bottom={bottom}
          bottomOnOpen={openBottomRight}
          bottomRatio={state?.bottom?.ratio}
        >
          {childrenS}
        </MultiDivider>
      );
  }
  return null;
};

export default Cell;
