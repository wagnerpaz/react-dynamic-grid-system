import React from 'react';
import 'react-dynamic-grid-system/dist/index.css';

import { DynamicGridSystem, Cell, Direction9 } from 'react-dynamic-grid-system';

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
  return (
    <DynamicGridSystem>
      <Cell direction={Direction9.CENTER}>
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
  );
};

export default App;
