
import logo from "./extensions/logo.png";


const config = {
  locales : ['es'],
  auth: {
    logo,
  },
  // Replace the favicon
  head: {
    favicon: logo,
  },
  // Replace the Strapi logo in the main navigation
  menu: {
    logo,
  },
  
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
