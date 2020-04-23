import Glue from '@hapi/glue';
import manifest from './manifest';

const startServer = async function () {
  try {
    const server = await Glue.compose(manifest, {relativeTo: __dirname});
    server.log(['startup'], 'The server has been created.');

    await server.start();
    server.log(['startup'], `Server started at http://${server.info.address}:${server.info.port}`);

    return server;
  } catch (err) {
    console.error(err);       // eslint-disable-line no-console
    console.trace();          // eslint-disable-line no-console
    process.exitCode = 1;

    return undefined;
  }
};

export default startServer();
