const{ Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-LzLtDZbMLn3X2gfMnHjPRx42',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default openai;
