export const IS_TRUE = "IS_TRUE";
export const IS_FALSE = "IS_FALSE";

export const isTrue = () => {
  return { type: IS_TRUE };
};
export const isFalse = () => {
  return { type: IS_FALSE };
};
