
const readGeneratedImages = async () => {
    
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/openai/images`);
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `readGeneratedImages:: fetch error : ${response.status} : ${response.statusText}`,
      );
    }
    const generatedImages = await response.json();
    console.log(generatedImages)
    return generatedImages;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('readGeneratedImages::error: ', err);
    throw err;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { readGeneratedImages};
