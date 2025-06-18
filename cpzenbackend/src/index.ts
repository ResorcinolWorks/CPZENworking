import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from CpZen Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 