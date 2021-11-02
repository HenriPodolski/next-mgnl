import Home from './templates/pages/Home';
import ContentGrid from './templates/areas/ContentGrid';
import ContentRichText from './templates/components/content/ContentRichText';

export default {
  componentMappings: {
    // pages
    'next-spa-lm:pages/next-spa-lm': Home,
    // areas
    'next-spa-lm:areas/contentGrid': ContentGrid,
    // components
    // content components
    'next-spa-lm:components/content/contentRichText': ContentRichText,
  },
};
