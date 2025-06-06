const sleep = (sec) =>
  new Promise((resolve) => {
    if (sec === null || sec === undefined || isNaN(sec)) {
      resolve();
    } else {
      setTimeout(resolve, sec * 1000);
    }
  });

export default sleep;
