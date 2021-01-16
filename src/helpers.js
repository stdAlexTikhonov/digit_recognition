export const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    const timeout = setTimeout(function () {
      resolve();
      clearTimeout(timeout);
    }, delay);
  });
};

export const isMobile = // will be true if running on a mobile device
  navigator.userAgent.indexOf("Mobile") !== -1 ||
  navigator.userAgent.indexOf("iPhone") !== -1 ||
  navigator.userAgent.indexOf("Android") !== -1 ||
  navigator.userAgent.indexOf("Windows Phone") !== -1;