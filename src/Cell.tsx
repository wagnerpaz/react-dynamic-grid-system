import React, { useEffect, useState } from 'react';
// import isEqual from 'lodash.isequal';
import MultiDivider from './MultiDivider';
import { Direction9 } from './Direction9';
// eslint-disable-next-line no-unused-vars
import { State } from './State';

type Props = {
  color?: string;
  hideDivider?: boolean;
  direction: Direction9;
  state?: State;
  onStateChanged?: (state: State | undefined) => void;
  Component: React.FunctionComponent<any>;
  children: React.ReactElement;
};

const Cell = ({
  color,
  hideDivider,
  children,
  direction,
  state,
  Component,
  onStateChanged
}: Props) => {
  const [top, setTop] = useState<React.ReactElement>(<div />);
  const [right, setRight] = useState<React.ReactElement>(<div />);
  const [bottom, setBottom] = useState<React.ReactElement>(<div />);
  const [left, setLeft] = useState<React.ReactElement>(<div />);

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
        openBottomLeft(state.bottom);
      } else if (direction === Direction9.RIGHT) {
        openBottomRight(state.bottom);
      }
    }
  }, [state, hideDivider, color]);

  const openLeft = (s: State | undefined) => {
    // console.log('openLeft', s);

    setLeft(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.LEFT}
        state={s}
        onStateChanged={(s2) => {
          // console.log('onStateChanged left');
          onStateChanged &&
            onStateChanged({
              ...state,
              left: {
                ...state?.left,
                ...s2,
                props: state?.left?.ratio ? state.left.ratio : undefined
              }
            });
        }}
      >
        <Component
          {...s}
          onPropsChanged={(props: any) => {
            // console.log('onPropsChanged left');
            onStateChanged &&
              onStateChanged({
                ...state,
                left: { ...s, props }
              });
          }}
        />
      </Cell>
    );
  };

  const openTopLeft = (s: State | undefined) => {
    // console.log('openTopLeft', s);

    const ph = (
      <Component
        {...s}
        onPropsChanged={(props: any) => {
          // console.log('onPropsChanged topLeft');
          onStateChanged &&
            onStateChanged({
              ...state,
              top: { ...state?.top, props }
            });
        }}
      />
    );
    setTop(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.TOP_LEFT}
        state={s}
        onStateChanged={(s2) => {
          // console.log('onStateChanged topLeft');
          onStateChanged &&
            onStateChanged({
              ...state,
              top: {
                ...state?.top,
                ...s2,
                props: state?.top?.ratio ? state.top.ratio : undefined
              }
            });
        }}
      >
        {ph}
      </Cell>
    );
  };

  const openBottomLeft = (s: State | undefined) => {
    // console.log('openBottomLeft', s);
    const ph = (
      <Component
        {...s}
        onPropsChanged={(props: any) => {
          // console.log('onPropsChanged bottomLeft');
          onStateChanged &&
            onStateChanged({
              ...state,
              bottom: { ...state?.bottom, props }
            });
        }}
      />
    );
    setBottom(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.BOTTOM_LEFT}
        state={s}
        onStateChanged={(s2) => {
          // console.log('onStateChanged bottomLeft');
          onStateChanged &&
            onStateChanged({
              ...state,
              bottom: {
                ...state?.bottom,
                ...s2,
                props: state?.bottom?.ratio ? state.bottom.ratio : undefined
              }
            });
        }}
      >
        {ph}
      </Cell>
    );
  };

  const openRight = (s: State | undefined) => {
    setRight(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.RIGHT}
        state={s}
        onStateChanged={(s2) => {
          onStateChanged &&
            onStateChanged({
              ...state,
              right: {
                ...state?.right,
                ...s2,
                props: state?.right?.ratio ? state.right.ratio : undefined
              }
            });
        }}
      >
        <Component
          {...s}
          onPropsChanged={(props: any) => {
            onStateChanged &&
              onStateChanged({
                ...state,
                right: { ...state?.right, props }
              });
          }}
        />
      </Cell>
    );
  };

  const openTopRight = (s: State | undefined) => {
    const ph = (
      <Component
        {...s}
        onPropsChanged={(props: any) => {
          onStateChanged &&
            onStateChanged({
              ...state,
              top: { ...state?.top, props }
            });
        }}
      />
    );
    setTop(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.TOP_RIGHT}
        state={s}
        onStateChanged={(s2) => {
          onStateChanged &&
            onStateChanged({
              ...state,
              top: {
                ...state?.top,
                ...s2,
                props: state?.top?.ratio ? state.top.ratio : undefined
              }
            });
        }}
      >
        {ph}
      </Cell>
    );
  };

  const openBottomRight = (s: State | undefined) => {
    const ph = (
      <Component
        {...s}
        onPropsChanged={(props: any) => {
          onStateChanged &&
            onStateChanged({
              ...state,
              bottom: { ...state?.bottom, props }
            });
        }}
      />
    );
    setBottom(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.BOTTOM_RIGHT}
        state={s}
        onStateChanged={(s2) => {
          onStateChanged &&
            onStateChanged({
              ...state,
              bottom: {
                ...state?.bottom,
                ...s2,
                props: state?.top?.ratio ? state.top.ratio : undefined
              }
            });
        }}
      >
        {ph}
      </Cell>
    );
  };

  const topOnRatioChanged = (ratio: number) => {
    onStateChanged &&
      onStateChanged({
        ...state,
        top: { ...state?.top, ratio }
      });
  };

  const rightOnRatioChanged = (ratio: number) => {
    onStateChanged &&
      onStateChanged({
        ...state,
        right: { ...state?.right, ratio }
      });
  };

  const bottomOnRatioChanged = (ratio: number) => {
    onStateChanged &&
      onStateChanged({
        ...state,
        bottom: { ...state?.bottom, ratio }
      });
  };

  const leftOnRatioChanged = (ratio: number) => {
    onStateChanged &&
      onStateChanged({
        ...state,
        left: { ...state?.left, ratio }
      });
  };

  switch (direction) {
    case Direction9.CENTER:
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          right={right}
          rightOnOpen={openRight}
          rightRatio={state?.right?.ratio}
          rightOnRatioChanged={rightOnRatioChanged}
          left={left}
          leftRatio={state?.left?.ratio}
          leftOnRatioChanged={leftOnRatioChanged}
          leftOnOpen={openLeft}
        >
          {children}
        </MultiDivider>
      );

    case Direction9.LEFT:
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={top}
          topOnOpen={openTopLeft}
          topRatio={state?.top?.ratio}
          topOnRatioChanged={topOnRatioChanged}
          bottom={bottom}
          bottomOnOpen={openBottomLeft}
          bottomRatio={state?.bottom?.ratio}
          bottomOnRatioChanged={bottomOnRatioChanged}
          left={left}
          leftOnOpen={openLeft}
          leftRatio={state?.left?.ratio}
          leftOnRatioChanged={leftOnRatioChanged}
        >
          {children}
        </MultiDivider>
      );

    case Direction9.TOP_LEFT:
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={top}
          topOnOpen={openTopLeft}
          topRatio={state?.top?.ratio}
          topOnRatioChanged={topOnRatioChanged}
        >
          {children}
        </MultiDivider>
      );

    case Direction9.BOTTOM_LEFT:
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          bottom={bottom}
          bottomOnOpen={openBottomLeft}
          bottomRatio={state?.bottom?.ratio}
          bottomOnRatioChanged={bottomOnRatioChanged}
        >
          {children}
        </MultiDivider>
      );

    case Direction9.RIGHT:
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={top}
          topOnOpen={openTopRight}
          topRatio={state?.top?.ratio}
          topOnRatioChanged={topOnRatioChanged}
          bottom={bottom}
          bottomOnOpen={openBottomRight}
          bottomRatio={state?.bottom?.ratio}
          bottomOnRatioChanged={bottomOnRatioChanged}
          right={right}
          rightOnOpen={openRight}
          rightRatio={state?.right?.ratio}
          rightOnRatioChanged={rightOnRatioChanged}
        >
          {children}
        </MultiDivider>
      );

    case Direction9.TOP_RIGHT:
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={top}
          topOnOpen={openTopRight}
          topRatio={state?.top?.ratio}
          topOnRatioChanged={topOnRatioChanged}
        >
          {children}
        </MultiDivider>
      );

    case Direction9.BOTTOM_RIGHT:
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          bottom={bottom}
          bottomOnOpen={openBottomRight}
          bottomRatio={state?.bottom?.ratio}
          bottomOnRatioChanged={bottomOnRatioChanged}
        >
          {children}
        </MultiDivider>
      );
  }
  return null;
};

export default Cell;
