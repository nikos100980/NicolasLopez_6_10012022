// -----------------------------------------Mise en place du server---------------------------------------------------------------

// Importation du module HTTP de NODE.JS
const http = require('http');

// Importation du fichier app.js
const app = require('./app');

// Cette fonction renvoie un port valide , fournit soit en string soit sous forme d'un numero
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Le parametrage du port s'effectue par la fonction SET de EXPRESS
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// Cette fonction permet de rechercher les differentes erreurs et va pouvoir les gerer de maniere approprié. Elle est enregistrée dans notre server
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// Fonction qui prend en argument la fonction qui sera appelé a chaque requéte emis par le frontend et reçu par le backend
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Ecoute le port
server.listen(port);