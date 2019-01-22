const Hapi = require('hapi');
const mongoose =  require('mongoose');

const routes = require('./routes');

const server = Hapi.server({
  port: 4000,
  host: 'localhost'
});

mongoose.connect('mongodb://hapi-api:wQqwt84#p@ds163254.mlab.com:63254/powerful-api', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const init = async () => {
  routes.forEach(route => {
    console.log(`attaching ${route.path}`);
    server.route(route);
  });
  await server.start();
  console.log(`Server starting at ${server.info.uri}`);
}

init();