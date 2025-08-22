const routers = require('express').Router();

routers.get('/health', (req, res) => {
  res.json({ message: "API is running!" });
});

routers.use('/auth', require('./auth.route'))
routers.use('/products', require('./product.route'));

module.exports = routers;