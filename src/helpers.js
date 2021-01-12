export const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    const timeout = setTimeout(function () {
      resolve();
      clearTimeout(timeout);
    }, delay);
  });
};