const Painting = require('./models/Painting');
const routes = [
    {
      method: 'GET',
      path: '/',
      handler: () => {
          return `<h1>My modern api`;
      }
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      config: {
        description: 'Get all paitings',
        tags: ['api', 'v1', 'painting']
      },
      handler: (req, reply) => {
        return Painting.find();
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      config: {
        description: 'Get a specific painting by ID',
        tags: ['api', 'v1', 'painting']
      },
      handler: (req, reply) => {
        const { name, url, technique } = req.payload;
        const painting = new Painting({
          name,
          url,
          technique
        });
        return painting.save();
      }
    }
  ];

  module.exports = routes;