import sleep from "../utils/sleep";

export default (ms = 1000) => async (req, res, next) => {
  await sleep(ms);
  next();
};
