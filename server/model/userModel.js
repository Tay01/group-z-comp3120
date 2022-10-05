import {app, db} from '../firebase';

app.post('/create', async (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.email;
      const userJson = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      const usersDB = db.collection('users'); 
      const response = await usersDB.doc(id).set(userJson);
      res.send(response);
    } catch(error) {
      res.send(error);
    }
  });

