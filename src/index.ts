import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import propertyRoutes from './routes/propertyRoutes';
import apartmentRoutes from './routes/apartmentRoutes';


const app = express();
const port = 3000;

 app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/citadelPro')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  app.use('/api/users', userRoutes);
  app.use('/api/properties', propertyRoutes);
  app.use('/api/apartments', apartmentRoutes);





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});