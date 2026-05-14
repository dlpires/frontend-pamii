import './style.css'

// IONIC IMPORT
// Load Ionic
(async () => {
  // Set the path to a variable to
  // prevent Vite from analyzing in dev
  const ionicPath = '/ionic.esm.js';
  await import(/* @vite-ignore */ ionicPath);
})();

// Core CSS required for Ionic components to work properly
import '@ionic/core/css/core.css';

// Basic CSS for apps built with Ionic
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

// Optional CSS utils that can be commented out
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

// PAGES
import './pages/login/LoginPage.js';
import './pages/home/HomePage.js';

// PRODUTO
import './pages/produto/ListProdutoPage.js';
import './pages/produto/CadProdutoPage.js';
import './pages/produto/EditProdutoPage.js';

// MESA
import './pages/mesa/ListMesaPage.js';
import './pages/mesa/CadMesaPage.js';
import './pages/mesa/EditMesaPage.js';

import './pages/usuario/ListUsuarioPage.js';
import './pages/usuario/CadUsuarioPage.js';
import './pages/usuario/EditUsuarioPage.js';
