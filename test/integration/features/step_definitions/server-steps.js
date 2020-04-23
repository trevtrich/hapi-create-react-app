import {NOT_FOUND} from 'http-status-codes';
import {AfterAll, BeforeAll, Then, When} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';

let server, serverResponse;

BeforeAll(async () => {
  process.env.PORT = any.integer({min: 1024, max: 49151});

  // this is the bundled version of the app, which is built after linting happens
  // eslint-disable-next-line  import/no-unresolved
  server = await require('../../../../lib/server').default;
});

When('the root route is loaded', async () => {
  serverResponse = await server.inject({
    method: 'GET',
    url: '/'
  });
});

Then('the server responds', async () => {
  assert.equal(serverResponse.statusCode, NOT_FOUND);
});

AfterAll(async () => {
  await server.stop();
});
