const User = require('./models/user');

class UserController {
  constructor () {
  }

  authenticate (req, res) {

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('No data were uploaded.');
    }

    User.getUserByParam('login', req.body.login, (err, user) => {
      if (err) {
        return res.status(400).send('Something got wrong');
      }

      return res.end(`${user.password === req.body.password}`);
    });
  }

  create (req, res) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('No data were uploaded.');
    }

    User.create(req.body, (err, user) => {
      if (err) {
        return res.status(400).send('Something got wrong');
      }
      res.send(`User ${user.login} was created`);
    });
  }

  update (req, res) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('No data were uploaded.');
    }

    User.modify(req.body, (err, updatedUser) => {
      if (err) {
        return res.status(400).send('Something got wrong');
      }
      res.send(`User ${updatedUser.login} was updated`);
    });
  }

  remove (req, res) {
    User.remove(req.params.id, (err, removedUser) => {
      res.end(`User ${removedUser.login} was removed`);
    });
  }

  removeAll (req, res) {
    User.removeAll(() => {
      res.json('All users were removed');
    });
  }

  get (req, res) {

    if (!req.params || Object.keys(req.params).length === 0) {
      return res.status(400).send('No data were uploaded.');
    }

    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(400).send('Something got wrong');
      }

      res.json(user);
    });
  }

  getAll (req, res) {
    User.findAll((err, users) => {
      res.json(users);
    });
  }

}

module.exports = new UserController();

