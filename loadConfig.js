function loadConfig(callback) {
  const script = document.createElement('script');
  script.src = `config.js?v=${new Date().getTime()}`;
  script.onload = () => {
    callback(config);
  };
  document.head.appendChild(script);
}
