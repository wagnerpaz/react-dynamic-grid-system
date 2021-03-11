import React from 'react';
import 'react-dynamic-grid-system/dist/index.css';

import { Divider, DynamicGridSystem } from 'react-dynamic-grid-system';

const App = () => {
  return (
    <DynamicGridSystem>
      <Divider
        secondChildren={
          <div style={{ backgroundColor: 'blue', flex: 1, height: '100%' }}>
            Second
          </div>
        }
        // top
        // right
        // bottom
        // left
      >
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}
        >
          MAIN CONTENT
        </span>
      </Divider>
    </DynamicGridSystem>
  );
};

export default App;
