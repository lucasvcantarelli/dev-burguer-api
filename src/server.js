import app from './app.js';
import './database/index.js';

// Iniciar o servidor - Nome da rota: http://localhost:3001
app.listen(3001, () => console.log('Application is running on port 3001'));
