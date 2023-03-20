import { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { prop, sortWith, ascend, descend } from "ramda";
import _find from "lodash/find";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import api from "api";
import { FullSpinner } from "styles/app";
import UserContext from "contexts/UserContext";

class FilmPage extends Component {
  state = {
    films: [],
    loading: true,
  };

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  componentDidMount() {
    api.films.fetchAll().then((films) =>
      this.setState({
        films: this.sortFilms(films),
        loading: false,
      })
    );
  }

  toggleFeatured = (_id) => {
    const film = _find(this.state.films, { _id });
    return this.updateFilm({ ...film, featured: !film.featured });
  };

  addFilm = (film) =>
    api.films.create(film).then((film) =>
      this.setState(({ films }) => ({
        films: this.sortFilms([...films, film]),
      }))
    );

  updateFilm = (film) =>
    api.films.update(film).then((film) =>
      this.setState(({ films }) => ({
        films: this.sortFilms(
          films.map((f) => (f._id === film._id ? film : f))
        ),
      }))
    );

  saveFilm = (film) => (film._id ? this.updateFilm(film) : this.addFilm(film));

  deleteFilm = (film) =>
    api.films.delete(film).then(() =>
      this.setState(({ films }) => ({
        films: this.sortFilms(films.filter((f) => f._id !== film._id)),
      }))
    );

  value = {
    toggleFeatured: this.toggleFeatured,
    deleteFilm: this.deleteFilm,
  };

  render() {
    const { films, loading } = this.state;
    const cols = this.props.location.pathname === "/films" ? "sixteen" : "ten";
    return (
      <FilmContext.Provider value={this.value}>
        <div className="ui stackable grid">
          <UserContext.Consumer>
            {({ user }) =>
              user.token && user.role === "admin" ? (
                <div className="six wide column">
                  <Route path="/films/new">
                    <FilmForm film={{}} saveFilm={this.saveFilm} />
                  </Route>
                  <Route
                    path="/films/edit/:_id"
                    render={({ match }) => (
                      <FilmForm
                        saveFilm={this.saveFilm}
                        film={_find(films, { _id: match.params._id }) || {}}
                      />
                    )}
                  />
                </div>
              ) : (
                <Redirect to="/films" />
              )
            }
          </UserContext.Consumer>

          <div className={`${cols} wide column`}>
            {loading ? <FullSpinner /> : <FilmsList films={films} />}
          </div>
        </div>
      </FilmContext.Provider>
    );
  }
}

export default withRouter(FilmPage);
