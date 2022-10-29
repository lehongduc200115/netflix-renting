import { ServerRoute } from '@hapi/hapi';
// import { Method, StatusCode } from '@swat/hapi-common';
const Joi = require('@hapi/joi');

const ping: ServerRoute = {
  method: 'GET',
  path: `/ping`,
  options: {
    auth: false,
    description: 'Pongs back',
    notes: 'To check is service pongs on a ping',
    tags: ['api'],
    // response: {
    //   status: {
    //     [StatusCode.OK]: Joi.string()
    //   }
    // },
    handler: async (_, h) => {
      return h.response('pong').code(200);
    }
  }
};
const healthController: ServerRoute[] = [ping];
export default healthController;
