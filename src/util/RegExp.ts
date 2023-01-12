export const RegExp = {
  // not each String
  pattern: (data: string) => {
    return /([^가-힣a-z\x20])/i.test(data);
  },
  // not only blank
  blankPattern: (data: string) => {
    return /^\s+|\s+$/g.test(data);
  },
};
