import { useContext } from "react";
import PropTypes from "prop-types";
import FilmContext from "contexts/FilmContext";

const Featured = ({ film }) => {
  const { toggleFeatured } = useContext(FilmContext);
  const cls = film.featured ? "yellow" : "empty";
  return (
    <span
      onClick={() => toggleFeatured(film._id)}
      role="status"
      className="ui right corner label"
    >
      <i className={`star icon ${cls}`}></i>
    </span>
  );
};

Featured.propTypes = {
  film: PropTypes.object.isRequired,
};

Featured.defaultProps = {
  film: {},
};

export default Featured;
