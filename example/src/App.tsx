import React, { useState } from 'react';
import 'react-dynamic-grid-system/dist/index.css';
import sample from './sample.json';
import Component from './Component';

import {
  DynamicGridSystem,
  Cell,
  Direction9,
  State
} from 'react-dynamic-grid-system';

// type ItemProps = {
//   children?: React.ReactElement;
//   color?: string;
// };
// const Item = ({ children, color }: ItemProps) => (
//   <div
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: '100%',
//       height: '100%',
//       backgroundColor: color
//     }}
//   >
//     {children}
//   </div>
// );

// const App = () => {
//   return (
//     <DynamicGridSystem>
//       <MultiDivider
//         top={<div />}
//         right={<div />}
//         bottom={<div />}
//         left={
//           <MultiDivider
//             top={
//               <MultiDivider top={<div />} left={<div />}>
//                 <Item color='green'>
//                   <div>Third</div>
//                 </Item>
//               </MultiDivider>
//             }
//             topRatio={0.25}
//             bottom={
//               <MultiDivider bottom={<div />} left={<div />}>
//                 <Item color='green'>
//                   <div>Forth</div>
//                 </Item>
//               </MultiDivider>
//             }
//             bottomRatio={0.25}
//             left={<div></div>}
//           >
//             <MultiDivider left={<div />}>
//               <Item color='blue'>
//                 <div>Second</div>
//               </Item>
//             </MultiDivider>
//           </MultiDivider>
//         }
//         leftRatio={0.25}
//       >
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1
//           }}
//         >
//           <div>MAIN CONTENT</div>
//         </div>
//       </MultiDivider>
//     </DynamicGridSystem>
//   );
// };

const App = () => {
  const [state, setState] = useState<State | undefined>(sample as State);
  console.log('state', state);
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
          <Cell
            color='#000'
            hideDivider={false}
            Component={Component}
            direction={Direction9.CENTER}
            state={state}
            onStateChanged={(state: State | undefined) => console.log(state)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}
            >
              <div>CANVAS</div>
            </div>
          </Cell>
        </DynamicGridSystem>
      </div>
    </>
  );
};

export default App;
