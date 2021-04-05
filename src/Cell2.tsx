import get from 'lodash.get';
import set from 'lodash.set';
import React from 'react';
import { Direction9 } from './Direction9';
import MultiDivider from './MultiDivider';
// eslint-disable-next-line no-unused-vars
import { State } from './State';

type Props = {
  color?: string;
  hideDivider?: boolean;
  state: State;
  onStateChanged?: (state: State) => void;
  Component: React.FunctionComponent<any>;
  children: React.ReactElement;
  onOpen?: (id: string, state: State) => void;
  onClose?: (id: string, state: State) => void;
};

const Cell2 = ({
  color,
  hideDivider,
  state,
  Component,
  onStateChanged,
  children,
  onOpen,
  onClose
}: Props) => {
  const renderState = (
    direction: Direction9,
    id?: string
  ): React.ReactElement => {
    const newId = `${
      direction !== Direction9.CENTER
        ? (id !== '' ? id + '.' : '') +
          `${
            direction === Direction9.TOP_LEFT ||
            direction === Direction9.TOP_RIGHT
              ? Direction9.TOP
              : direction === Direction9.BOTTOM_LEFT ||
                direction === Direction9.BOTTOM_RIGHT
              ? Direction9.BOTTOM
              : direction
          }`
        : ''
    }`;
    const cellState = newId ? get(state, newId) : state;

    const onRatioChanged = (direction: Direction9) => (ratio: number) => {
      let newState;
      if (ratio > 0) {
        newState = {
          ...set(state, `${newId ? newId + '.' : ''}${direction}.ratio`, ratio)
        };
      } else {
        newState = {
          ...set(state, `${newId ? newId + '.' : ''}${direction}`, undefined)
        };
      }
      onStateChanged && onStateChanged(newState);
    };

    const onPropsChanged = (props: any) => {
      const newState = {
        ...set(state, `${newId ? newId + '.' : ''}props`, props)
      };
      onStateChanged && onStateChanged(newState);
    };

    if (direction === Direction9.CENTER) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          right={cellState.right ? renderState(Direction9.RIGHT, newId) : true}
          rightId={`${newId ? newId + '.' : ''}${Direction9.RIGHT}`}
          rightRatio={cellState?.right?.ratio}
          rightOnRatioChanged={onRatioChanged(Direction9.RIGHT)}
          rightOnOpen={onOpen}
          rightOnClose={onClose}
          left={cellState.left ? renderState(Direction9.LEFT, newId) : true}
          leftId={`${newId ? newId + '.' : ''}${Direction9.LEFT}`}
          leftRatio={cellState?.left?.ratio}
          leftOnRatioChanged={onRatioChanged(Direction9.LEFT)}
          leftOnOpen={onOpen}
          leftOnClose={onClose}
        >
          {children}
        </MultiDivider>
      );
    }

    if (direction === Direction9.LEFT) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={cellState.top ? renderState(Direction9.TOP_LEFT, newId) : true}
          topId={`${newId ? newId + '.' : ''}${Direction9.TOP}`}
          topRatio={cellState.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          left={cellState.left ? renderState(Direction9.LEFT, newId) : true}
          leftId={`${newId ? newId + '.' : ''}${Direction9.LEFT}`}
          leftRatio={cellState.left?.ratio}
          leftOnRatioChanged={onRatioChanged(Direction9.LEFT)}
          leftOnOpen={onOpen}
          leftOnClose={onClose}
          bottom={
            cellState.bottom ? renderState(Direction9.BOTTOM_LEFT, newId) : true
          }
          bottomId={`${newId ? newId + '.' : ''}${Direction9.BOTTOM}`}
          bottomRatio={cellState.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    if (direction === Direction9.TOP_LEFT) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={cellState.top ? renderState(Direction9.TOP_LEFT, newId) : true}
          topId={`${newId ? newId + '.' : ''}${Direction9.TOP}`}
          topRatio={cellState?.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    if (direction === Direction9.BOTTOM_LEFT) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          bottom={
            cellState.bottom ? renderState(Direction9.BOTTOM_LEFT, newId) : true
          }
          bottomId={`${newId ? newId + '.' : ''}${Direction9.BOTTOM}`}
          bottomRatio={cellState?.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    if (direction === Direction9.RIGHT) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={cellState.top ? renderState(Direction9.TOP_RIGHT, newId) : true}
          topId={`${newId ? newId + '.' : ''}${Direction9.TOP}`}
          topRatio={cellState.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          right={cellState.right ? renderState(Direction9.RIGHT, newId) : true}
          rightId={`${newId ? newId + '.' : ''}${Direction9.RIGHT}`}
          rightRatio={cellState.right?.ratio}
          rightOnRatioChanged={onRatioChanged(Direction9.RIGHT)}
          rightOnOpen={onOpen}
          rightOnClose={onClose}
          bottom={
            cellState.bottom
              ? renderState(Direction9.BOTTOM_RIGHT, newId)
              : true
          }
          bottomId={`${newId ? newId + '.' : ''}${Direction9.BOTTOM}`}
          bottomRatio={cellState.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    if (direction === Direction9.TOP_RIGHT) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={cellState.top ? renderState(Direction9.TOP_RIGHT, newId) : true}
          topId={`${newId ? newId + '.' : ''}${Direction9.TOP}`}
          topRatio={cellState?.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    if (direction === Direction9.BOTTOM_RIGHT) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          bottom={
            cellState.bottom
              ? renderState(Direction9.BOTTOM_RIGHT, newId)
              : true
          }
          bottomId={`${newId ? newId + '.' : ''}${Direction9.BOTTOM}`}
          bottomRatio={cellState?.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    return <div />;
  };

  return renderState(Direction9.CENTER);
};

export default Cell2;
