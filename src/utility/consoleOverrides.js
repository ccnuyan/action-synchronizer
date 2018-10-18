const consolelog = console.log;
const consoleerror = console.error;

console.log = msg => {
  consolelog(msg);
  postMessage(JSON.stringify({ type: 'console.log', message: msg }));
};
console.error = msg => {
  consoleerror(msg);
  postMessage(JSON.stringify({ type: 'console.error', message: msg }));
};
