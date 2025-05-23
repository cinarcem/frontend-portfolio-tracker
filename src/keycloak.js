import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://keycloak-portfolio-tracker-app.up.railway.app/',
  realm: 'portfolio-tracker-app',
  clientId: 'portfolio-tracker-frontend',
});

/* const keycloak = new Keycloak({
  url: 'https://keycloak-porfolio-tracker-app-dev.up.railway.app/',
  realm: 'portfolio-tracker-app',
  clientId: 'portfolio-tracker-frontend',
}); */

export default keycloak;
