import Home from './templates/pages/Home';
import ContentRichText from './templates/components/Content/ContentRichText';

export default {
    componentMappings: {
        // pages
        'main-lm:pages/home': Home,
        // content components
        'main-lm:components/content/contentRichText': ContentRichText,
    }
}