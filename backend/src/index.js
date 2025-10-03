require('dotenv').config();
const { app, initSample } = require('./app');

const PORT = process.env.PORT || 4000;

initSample().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Init failed', err);
});
