const { Configuration, OpenAIApi } = require('openai');

let API_KEY = '';

// recover key api
fetch('/api/api-key')
  .then((res) => res.json())
  .then((json) => {
    // Récupérer la variable d'environnement envoyée par le backend
    API_KEY = json.key;

});

const configuration = new Configuration({
  organization: 'org-LzLtDZbMLn3X2gfMnHjPRx42',
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
