import bunyan from 'bunyan';

require('dotenv-safe').config();

const logger = bunyan.createLogger({
  name: 'hapi-create-react-app'
});

export default {
  server: {port: process.env.PORT, routes: {security: true}},
  register: {
    plugins: [
      {
        plugin: require('hapi-graceful-shutdown-plugin'),
        options: {
          sigtermTimeout: 10,
          sigintTimeout: 1
        }
      },
      {
        plugin: require('@hapi/good'),
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            bunyan: [
              {
                module: require('good-bunyan'),
                args: [
                  {log: '*', request: '*', response: '*', error: '*'},
                  {logger, levels: {response: 'info', request: 'info'}}
                ]
              }
            ]
          }
        }
      }
    ]
  }
};
