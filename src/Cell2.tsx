import get from 'lodash.get';
import set from 'lodash.set';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import { Direction9 } from './Direction9';
import MultiDivider from './MultiDivider';
// eslint-disable-next-line no-unused-vars
import { State } from './State';

type Props = {
  color?: string;
  hideDivider?: boolean;
  state: State;
  onStateChanged?: (state: State, id: string, localState: State) => void;
  Component: React.FunctionComponent<any>;
  children?: React.ReactElement;
  onOpen?: (id: string, state: State) => void;
  onClose?: (id: string, state: State) => void;
  onMove?: (fromId: string, toId: string) => void;
  onInteracting?: (id: string, interacting: boolean) => void;
};

const Cell2 = ({
  color,
  hideDivider,
  state,
  Component,
  onStateChanged,
  children,
  onOpen,
  onClose,
  onMove,
  onInteracting
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
      const id = `${newId ? newId + '.' : ''}${direction}`;

      let newState;
      if (ratio > 0) {
        newState = {
          ...set(state, `${id}.ratio`, ratio)
        };
      } else {
        newState = {
          ...set(state, `${id}`, undefined)
        };
      }
      onStateChanged &&
        onStateChanged(newState, id, get(newState, id) as State);
    };

    const onPropsChanged = (props: any) => {
      const newState = {
        ...set(state, `${newId ? newId + '.' : ''}props`, props)
      };
      onStateChanged &&
        onStateChanged(newState, newId, get(newState, newId) as State);
    };

    const onCloseSecond = (id: string, idSecond: string) => {
      const idProps = cloneDeep(get(state, `${id}.props`));

      const newState = cloneDeep(state);

      set(newState, `${idSecond}.props`, idProps);
      set(newState, id, undefined);
      onStateChanged &&
        onStateChanged(newState, idSecond, get(newState, idSecond));

      onMove && onMove(id, idSecond);
    };

    const topId = `${newId ? newId + '.' : ''}${Direction9.TOP}`;
    const rightId = `${newId ? newId + '.' : ''}${Direction9.RIGHT}`;
    const bottomId = `${newId ? newId + '.' : ''}${Direction9.BOTTOM}`;
    const leftId = `${newId ? newId + '.' : ''}${Direction9.LEFT}`;

    if (direction === Direction9.CENTER) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={cellState.top ? renderState(Direction9.TOP, newId) : true}
          topId={topId}
          topRatio={cellState.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          topOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          topOnInteracting={onInteracting}
          right={cellState.right ? renderState(Direction9.RIGHT, newId) : true}
          rightId={rightId}
          rightRatio={cellState?.right?.ratio}
          rightOnRatioChanged={onRatioChanged(Direction9.RIGHT)}
          rightOnOpen={onOpen}
          rightOnClose={onClose}
          rightOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          rightOnInteracting={onInteracting}
          bottom={
            cellState.bottom ? renderState(Direction9.BOTTOM, newId) : true
          }
          bottomId={bottomId}
          bottomRatio={cellState.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
          bottomOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          bottomOnInteracting={onInteracting}
          left={cellState.left ? renderState(Direction9.LEFT, newId) : true}
          leftId={leftId}
          leftRatio={cellState?.left?.ratio}
          leftOnRatioChanged={onRatioChanged(Direction9.LEFT)}
          leftOnOpen={onOpen}
          leftOnClose={onClose}
          leftOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          leftOnInteracting={onInteracting}
        >
          {children ? (
            children
          ) : (
            <Component
              {...cellState.props}
              id={newId}
              onPropsChanged={onPropsChanged}
            />
          )}
        </MultiDivider>
      );
    }

    if (direction === Direction9.TOP) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={cellState.top ? renderState(Direction9.TOP, newId) : true}
          topId={topId}
          topRatio={cellState?.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          topOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          topOnInteracting={onInteracting}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    if (direction === Direction9.BOTTOM) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          bottom={
            cellState.bottom ? renderState(Direction9.BOTTOM, newId) : true
          }
          bottomId={bottomId}
          bottomRatio={cellState?.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
          bottomOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          bottomOnInteracting={onInteracting}
        >
          <Component
            {...cellState.props}
            id={newId}
            onPropsChanged={onPropsChanged}
          />
        </MultiDivider>
      );
    }

    if (direction === Direction9.LEFT) {
      return (
        <MultiDivider
          color={color}
          hideDividers={hideDivider}
          top={cellState.top ? renderState(Direction9.TOP_LEFT, newId) : true}
          topId={topId}
          topRatio={cellState.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          topOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          topOnInteracting={onInteracting}
          left={cellState.left ? renderState(Direction9.LEFT, newId) : true}
          leftId={leftId}
          leftRatio={cellState.left?.ratio}
          leftOnRatioChanged={onRatioChanged(Direction9.LEFT)}
          leftOnOpen={onOpen}
          leftOnClose={onClose}
          leftOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          leftOnInteracting={onInteracting}
          bottom={
            cellState.bottom ? renderState(Direction9.BOTTOM_LEFT, newId) : true
          }
          bottomId={bottomId}
          bottomRatio={cellState.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
          bottomOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          bottomOnInteracting={onInteracting}
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
          topId={topId}
          topRatio={cellState?.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          topOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          topOnInteracting={onInteracting}
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
          bottomId={bottomId}
          bottomRatio={cellState?.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
          bottomOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          bottomOnInteracting={onInteracting}
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
          topId={topId}
          topRatio={cellState.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          topOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          topOnInteracting={onInteracting}
          right={cellState.right ? renderState(Direction9.RIGHT, newId) : true}
          rightId={rightId}
          rightRatio={cellState.right?.ratio}
          rightOnRatioChanged={onRatioChanged(Direction9.RIGHT)}
          rightOnOpen={onOpen}
          rightOnClose={onClose}
          rightOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          rightOnInteracting={onInteracting}
          bottom={
            cellState.bottom
              ? renderState(Direction9.BOTTOM_RIGHT, newId)
              : true
          }
          bottomId={bottomId}
          bottomRatio={cellState.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
          bottomOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          bottomOnInteracting={onInteracting}
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
          topId={topId}
          topRatio={cellState?.top?.ratio}
          topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          topOnOpen={onOpen}
          topOnClose={onClose}
          topOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          topOnInteracting={onInteracting}
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
          bottomId={bottomId}
          bottomRatio={cellState?.bottom?.ratio}
          bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          bottomOnOpen={onOpen}
          bottomOnClose={onClose}
          bottomOnCloseSecond={(id) => {
            onCloseSecond(id, newId);
          }}
          bottomOnInteracting={onInteracting}
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
