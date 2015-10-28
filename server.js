var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var id = 7;

var data = {
  1: { id: 1, firstName: 'firstName',   lastName: 'lastName', email:'test1@example.com' },
  2: { id: 2, firstName: 'secondName',  lastName: 'lastName', email:'test2@example.com' },
  3: { id: 3, firstName: 'thirdName',   lastName: 'lastName', email:'test3@example.com' },
  4: { id: 4, firstName: 'fourthName',  lastName: 'lastName', email:'test4@example.com' },
  5: { id: 5, firstName: 'fifthName',   lastName: 'lastName', email:'test5@example.com' },
  6: { id: 6, firstName: 'sixthName',   lastName: 'lastName', email:'test6@example.com' },
  7: { id: 7, firstName: 'seventhName', lastName: 'lastName', email:'test7@example.com' }
};

app.use(bodyParser.json());
app.use(express.static('./public'));

app.route('/api/contacts')
  .get(function (req, res) {
    res.json(Object.keys(data).map(function (key){
      return data[key];
    }));
  })
  .post(function (req, res) {
    var record = req.body;
    record.id = ++id;
    data[record.id] = record;
    res.json(record);
  });

app.route('/api/contacts/:id')
   .get(function (req, res) {
     res.json(data[req.params.id]);
   })
   .put(function (req, res) {
     data[req.params.id] = req.body;
     res.json(req.body);
   })
   .delete(function (req, res) {
     delete data[req.params.id];
     res.json(null);
   });

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);
