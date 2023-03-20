import { memo, useContext } from "react";
import PropTypes from "prop-types";
import Featured from "components/Featured";
import FilmCardButtons from "pages/FilmsPage/components/FilmCardButtons";
import UserContext from "contexts/UserContext";

const FilmCard = ({ film }) => {
  const { user } = useContext(UserContext);

  const actionUser = (
    <div className="extra content">
      <button className="ui negative basic button">Show Film</button>
    </div>
  );

  return (
    <div className="ui card">
      <Featured film={film} />
      <div className="image">
        <span className="ui green label ribbon">$ {film.price} </span>
        <img src={film.img} alt={film.title} />
      </div>

      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration} min
          </span>
        </div>
      </div>

      {user.token && user.role === "admin" && <FilmCardButtons film={film} />}
      {user.token && user.role === "user" && actionUser}
    </div>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }),
};

FilmCard.defaultProps = {
  film: {},
};

export default memo(FilmCard);
