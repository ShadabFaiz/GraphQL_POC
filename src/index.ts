import * as debug from 'debug';
import * as http from 'http';

import App from './App';

debug("ts-express:server");

const normalizePort = (val: number | string): number | string | boolean => {
  let normalizedPort: number =
    typeof val === "string" ? parseInt(val, 10) : val;
  return isNaN(normalizedPort) ? val : normalizedPort;
};

const onListening = () => {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`\x1b[32mServer started: ${bind} \x1b[0m`);
};
const onException = (error: NodeJS.ErrnoException) => {
  console.error(`Got Error ${error}`);
  process.exit(1);
};
const onClosing = () => {
  console.log("Server closing");
};

const port = normalizePort(process.env.PORT || 3000);

/*************************** Instantiate Server *****************************/
App.set("port", port);
const server = http.createServer(App);
server.listen(port);
server.on("listening", onListening);
server.on("error", onException);
server.on("close", onClosing);
