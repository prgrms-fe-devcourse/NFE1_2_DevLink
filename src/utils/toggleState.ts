export const toggleState = <T>(state: T, option1: T, option2: T): T => {
  return state === option1 ? option2 : option1;
};
