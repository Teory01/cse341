const johnRoute = (req, res) => {
  res.json([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      favoriteColor: 'Blue',
      birthday: '1990-05-15'
    }
  ]);
};

const janeRoute = (req, res) => {
  res.json([
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@email.com',
      favoriteColor: 'Purple',
      birthday: '1992-08-21'
    }
  ]);
};

const mikeRoute = (req, res) => {
  res.json([
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@email.com',
      favoriteColor: 'Green',
      birthday: '1988-11-03'
    }
  ]);
};

const sarahRoute = (req, res) => {
  res.json([
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah@email.com',
      favoriteColor: 'Red',
      birthday: '1995-02-14'
    }
  ]);
};

const davidRoute = (req, res) => {
  res.json([
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david@email.com',
      favoriteColor: 'Orange',
      birthday: '1991-09-30'
    }
  ]);
};

module.exports = {
  johnRoute,
  janeRoute,
  mikeRoute,
  sarahRoute,
  davidRoute
};

