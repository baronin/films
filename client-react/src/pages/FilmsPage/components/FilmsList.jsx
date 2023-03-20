import { memo } from "react";
import PropTypes from "prop-types";
import FilmCard from "pages/FilmsPage/components/FilmCard";
import Message from "components/Message";

const FilmsList = ({ films }) => {
  return (
    <div className="ui four cards">
      {films.length === 0 ? (
        <Message>Not film in our base</Message>
      ) : (
        films.map((film) => <FilmCard key={film._id} film={film} />)
      )}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilmsList.defaultProps = {
  films: [],
};

export default memo(FilmsList);
