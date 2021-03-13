import React, { useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';
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
  const [childrenS, setChildrenS] = useState<React.ReactElement>(children);
  const [stateS, setStateS] = useState<State | undefined>(state);

  useEffect(() => {
    if (!isEqual(state, stateS)) {
      setStateS(state);
    }
  }, [state]);

  useEffect(() => {
    onStateChanged && onStateChanged(stateS);
  }, [stateS]);

  useEffect(() => {
    if (stateS?.left) {
      openLeft(stateS.left);
    }
    if (stateS?.right) {
      openRight(stateS.right);
    }
    if (stateS?.top) {
      if (direction === Direction9.LEFT) {
        openTopLeft(stateS.top);
      } else if (direction === Direction9.RIGHT) {
        openTopRight(stateS.top);
      }
    }
    if (stateS?.bottom) {
      if (direction === Direction9.LEFT) {
        openBottomLeft(stateS.top);
      } else if (direction === Direction9.RIGHT) {
        openBottomRight(stateS.top);
      }
    }
  }, [stateS]);

  const openLeft = (state: State | undefined) => {
    setLeft(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.LEFT}
        state={state}
        onStateChanged={(state) => {
          setStateS((stateS) => ({
            ...stateS,
            left: { ...stateS?.left, ...state }
          }));
        }}
      >
        <Component
          {...stateS?.left?.props}
          onPropsChanged={(props: any) => {
            setStateS((stateS) => ({
              ...stateS,
              left: { ...stateS?.left, props }
            }));
          }}
        />
      </Cell>
    );
  };

  const openTopLeft = (state: State | undefined) => {
    const ph = (
      <Component
        {...stateS?.top?.props}
        onPropsChanged={(props: any) => {
          setStateS((stateS) => ({
            ...stateS,
            top: { ...stateS?.top, props }
          }));
        }}
      />
    );
    setTop(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.TOP_LEFT}
        state={state}
        onStateChanged={(state) => {
          setStateS((stateS) => ({
            ...stateS,
            top: { ...stateS?.top, ...state }
          }));
        }}
      >
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  const openBottomLeft = (state: State | undefined) => {
    const ph = (
      <Component
        {...stateS?.bottom?.props}
        onPropsChanged={(props: any) => {
          setStateS((stateS) => ({
            ...stateS,
            bottom: { ...stateS?.bottom, props }
          }));
        }}
      />
    );
    setBottom(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.BOTTOM_LEFT}
        state={state}
        onStateChanged={(state) => {
          setStateS((stateS) => ({
            ...stateS,
            bottom: { ...stateS?.bottom, ...state }
          }));
        }}
      >
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  const openRight = (state: State | undefined) => {
    setRight(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.RIGHT}
        state={state}
        onStateChanged={(state) => {
          setStateS((stateS) => ({
            ...stateS,
            right: { ...stateS?.right, ...state }
          }));
        }}
      >
        <Component
          {...stateS?.right?.props}
          onPropsChanged={(props: any) => {
            setStateS((stateS) => ({
              ...stateS,
              right: { ...stateS?.right, props }
            }));
          }}
        />
      </Cell>
    );
  };

  const openTopRight = (state: State | undefined) => {
    const ph = (
      <Component
        {...stateS?.top?.props}
        onPropsChanged={(props: any) => {
          setStateS((stateS) => ({
            ...stateS,
            top: { ...stateS?.top, props }
          }));
        }}
      />
    );
    setTop(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.TOP_RIGHT}
        state={state}
        onStateChanged={(state) => {
          setStateS((stateS) => ({
            ...stateS,
            top: { ...stateS?.top, ...state }
          }));
        }}
      >
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  const openBottomRight = (state: State | undefined) => {
    const ph = (
      <Component
        {...stateS?.bottom?.props}
        onPropsChanged={(props: any) => {
          setStateS((stateS) => ({
            ...stateS,
            bottom: { ...stateS?.bottom, props }
          }));
        }}
      />
    );
    setBottom(
      <Cell
        color={color}
        hideDivider={hideDivider}
        Component={Component}
        direction={Direction9.BOTTOM_RIGHT}
        state={state}
        onStateChanged={(state) => {
          setStateS((stateS) => ({
            ...stateS,
            bottom: { ...stateS?.bottom, ...state }
          }));
        }}
      >
        {ph}
      </Cell>
    );
    setChildrenS(ph);
  };

  const topOnRatioChanged = (ratio: number) => {
    setStateS((stateS) => ({
      ...stateS,
      top: { ...stateS?.top, ratio }
    }));
  };

  const rightOnRatioChanged = (ratio: number) => {
    setStateS((stateS) => ({
      ...stateS,
      right: { ...stateS?.right, ratio }
    }));
  };

  const bottomOnRatioChanged = (ratio: number) => {
    setStateS((stateS) => ({
      ...stateS,
      bottom: { ...stateS?.bottom, ratio }
    }));
  };

  const leftOnRatioChanged = (ratio: number) => {
    setStateS((stateS) => ({
      ...stateS,
      left: { ...stateS?.left, ratio }
    }));
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
          {childrenS}
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
          {childrenS}
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
          {childrenS}
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
          {childrenS}
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
          {childrenS}
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
          {childrenS}
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
          {childrenS}
        </MultiDivider>
      );
  }
  return null;
};

export default Cell;
