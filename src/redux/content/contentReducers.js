import { Type } from './contentActions';

export const content = (prevState = 0, { type, payload }) => {
  switch (type) {
    case Type.CONTENT:
      return payload;

    default:
      return prevState;
  }
};

export default content;
