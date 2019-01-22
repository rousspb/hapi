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
      handler: (req, reply) => {
        return Painting.find();
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (req, reply) => {
        const { name, url, techniques } = req.payload;
        const painting = new Painting({
          name,
          url,
          techniques
        });
        return painting.save();
      }
    }
  ];

  module.exports = routes;