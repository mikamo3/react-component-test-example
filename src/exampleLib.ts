export const asyncProc = async (str: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      str === "foo" ? resolve(`${str} resolve`) : reject(`${str} reject`);
    }, 1000);
  });
};
