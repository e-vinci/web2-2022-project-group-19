const { Configuration, OpenAIApi } = require('openai');

const dotenv = require('dotenv');

dotenv.config();

// eslint-disable-next-line prefer-destructuring
const KEY_API = process.env.KEY_API;



const configuration = new Configuration({
  organization: 'org-LzLtDZbMLn3X2gfMnHjPRx42',
  apiKey: KEY_API,
});

const openai = new OpenAIApi(configuration);

async function generateImage(prompt){
    const response = await openai.createImage({
        // eslint-disable-next-line object-shorthand
        prompt : prompt,
        n : 3,
        size: "512x512",
    });
    const tab = [];
    tab[0]= response.data.data[0].url;
    tab[1] = response.data.data[1].url;
    tab[2] = response.data.data[2].url;
    // const tabJson = JSON.stringify(tab)

    // console.log("from api model tabJson",tabJson);

    return tab;
}

module.exports = {
  generateImage
};

