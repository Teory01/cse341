const johnRoute = (req, res) => {
  res.json([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      website: 'https://example.com',
      image: 'base64-image-string'
    }
  ]);
};

const janeRoute = (req, res) => {
  res.json([
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@email.com',  
      website: 'https://example.com',
      image: 'base64-image-string'
    }
  ]);
};

module.exports = {
  johnRoute,
  janeRoute
};