import Home from './templates/pages/Home';
import ContentRichText from './templates/components/Content/ContentRichText';

export default {
  componentMappings: {
    // pages
    'next-spa-lm:pages/preview': Home,
    // content components
    'next-spa-lm:components/contentRichText': ContentRichText,
  },
};
