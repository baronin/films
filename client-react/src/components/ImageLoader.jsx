import PropTypes from "prop-types";

const ImageLoader = ({ src, fallbackImg, alt, ...rest }) => {
  const onError = ({ target }) => (target.src = fallbackImg);
  return <img onError={onError} src={src} alt={alt} {...rest} />;
};

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageLoader;
