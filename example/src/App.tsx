import React, { useState } from 'react';
import 'react-dynamic-grid-system/dist/index.css';
import sample from './sample.json';
import Component from './Component';

import { DynamicGridSystem, Cell2, State } from 'react-dynamic-grid-system';

const App = () => {
  const [state, setState] = useState<State>(sample as State);
  return (
    <>
      <div>
        <button
          onClick={() =>
            setState((state) => ({
              ...state,
              left: { ...state?.left, ratio: (state?.left?.ratio || 0) + 0.1 }
            }))
          }
        >
          Change left raatio state + 100
        </button>
      </div>
      <div
        style={{ position: 'absolute', top: 40, bottom: 0, left: 0, right: 0 }}
      >
        <DynamicGridSystem backgroundColor='#FFF'>
          <Cell2
            color='#000'
            hideDivider={false}
            Component={Component}
            state={state}
            dividerWidth={4}
            onStateChanged={(state, id, localState) => {
              setState(state);
              console.log('state', state, 'id', id, 'localState', localState);
            }}
            onOpen={(id) => {
              console.log('onOpen', id);
            }}
            onClose={(id) => {
              console.log('onClose', id);
            }}
            onMove={(fromId, toId) => {
              console.log('onMove', fromId, toId);
            }}
            onInteracting={(id, interacting) => {
              console.log('interacting', id, interacting);
            }}
          />
        </DynamicGridSystem>
      </div>
    </>
  );
};

export default App;
