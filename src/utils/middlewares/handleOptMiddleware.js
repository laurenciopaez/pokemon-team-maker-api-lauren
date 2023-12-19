
const handleOptions = async(req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Max-Age', '86400');
      res.sendStatus(200);
    } else {
      next();
    }
  };

module.exports = {
    handleOptions,
}