import path from 'path';

export const plugin = {
  name: 'view',
  async register(server) {
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: {
        directory: {
          path: path.join(process.cwd(), 'client', 'build'),
          listing: false,
          index: true
        }
      }
    });
  }
};
