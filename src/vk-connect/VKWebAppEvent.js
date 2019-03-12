/* global window, CustomEvent */

export default (data) => {
  const evt = new CustomEvent('VKWebAppEvent', {
    detail: data
  });
  return evt;
};
