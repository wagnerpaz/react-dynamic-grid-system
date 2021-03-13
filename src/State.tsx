export type State = {
  left?: State;
  right?: State;
  top?: State;
  bottom?: State;
  ratio?: number;
  props?: any;
};
