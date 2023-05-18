const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const mongoURL = 'mongodb+srv://larisa:larisa@cluster0.sas9vb5.mongodb.net/';
const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.post('/save-currencies', async (req, res) => {
  const currencies = req.body.currencies;

  try {
    await client.connect();

    const db = client.db('database');
    const collection = db.collection('currencies');

    const result = await collection.insertMany(currencies);

    res.json({ success: true, message: 'Currencies saved successfully!' });
  } catch (error) {
    console.error('Error saving currencies:', error);
    res.status(500).json({ success: false, error: 'Failed to save currencies' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
