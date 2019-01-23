const Hapi = require('hapi');
const mongoose =  require('mongoose');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Package = require('Package');
const routes = require('./routes');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');

const server = Hapi.server({
  port: 4000,
  host: 'localhost'
});

mongoose.connect('mongodb://hapi-api:wQqwt84#p@ds163254.mlab.com:63254/powerful-api', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const init = async () => {
  await server.register([
    {
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: {
          schema
        },
        route: {
          cors: true,
        },
      },
  },
  {
    plugin: graphiqlHapi,
    register : graphiqlHapi,
    options: {
        path: '/graphiql',
        graphiqlOptions: {
            endpointURL: 'graphql'
        },
        route: {
            cors: true
        },
    }
  },
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Paintings API Documentation',
        version: Package.version
      }
    }
  }
])
  routes.forEach(route => {
    console.log(`attaching ${route.path}`);
    server.route(route);
  });
  try {
    await server.start();
  } catch(err) {
    console.log(`Error starting server ${err.message}`);
  }
  console.log(`Server starting at ${server.info.uri}`);
}

init();