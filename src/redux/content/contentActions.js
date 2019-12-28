export const Type = {
  CONTENT: 'CONTENT',
};

export const content = value => ({
  type: Type.CONTENT,
  payload: value,
});
