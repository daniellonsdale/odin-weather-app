const images = {};
const importAll = (requireContext) => {
  requireContext.keys().forEach((key) => {
    const imageName = key.replace('./', '');
    images[imageName] = requireContext(key);
  });
};

const imageContext = require.context('./icons', false, /\.svg$/);
importAll(imageContext);

export default images;
