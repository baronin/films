import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import FormMessage from "components/FormMessage";
import UploadImage from "components/UploadImage";

const initialData = {
  _id: null,
  title: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  img: "",
  featured: false,
};

class FilmForm extends Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
    redirect: false,
  };

  componentDidMount() {
    if (this.props.film._id) {
      this.setState({ data: this.props.film });
    }
  }

  static getDerivedStateFromProps({ film }, { data, errors }) {
    if (film._id && film._id !== data._id) {
      return {
        data: film,
        errors: {},
      };
    }
    if (!film._id && data._id) {
      return { data: initialData, errors: {} };
    }
    return null;
  }

  /* componentDidUpdate(prevProps, prevState) {
    if (this.props.film._id && this.props.film._id !== prevProps.film._id) {
      this.setState({ data: this.props.film });
    } else if (!this.props.film._id && prevProps.film._id) {
      this.setState({ data: initialData });
    }
  }
 */
  updatePhoto = (img) => {
    this.setState({
      data: { ...this.state.data, img },
      errors: { ...this.state.errors, img: "" },
    });
  };

  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    });

  handleCheckboxChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });

  handleNumberChange = (e) => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    this.setState({
      data: { ...this.state.data, [e.target.name]: value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    });
  };

  validate(data) {
    const errors = {};
    if (!data.title) errors.title = "title cannot be blank";
    if (!data.img) errors.img = "img cannot be blank";
    if (!data.description) errors.description = "description cannot be blank";
    if (!data.director) errors.director = "director cannot be blank";
    if (!data.duration) errors.duration = "duration cannot be blank";
    if (!data.price) errors.price = "price cannot be blank";

    if (parseFloat(data.price) <= 0) errors.price = "error price";
    if (parseInt(data.duration) <= 0) errors.duration = "error price";
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .saveFilm(this.state.data)
        .then(() => this.setState({ redirect: true }))
        .catch((err) =>
          this.setState({
            errors: err.response.data.errors,
            loading: false,
          })
        );
    }
  };

  render() {
    const { data, errors, loading, redirect } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        aria-label="film-form"
        className={`ui form ${loading && "loading"}`}
      >
        {redirect && <Redirect to="/films" />}
        <div className="ui grid mb-3">
          {/*  START two column */}

          <div className="two column row">
            {/*  START left column */}

            <div className="ten wide column">
              {/*  START title */}

              <div className={`field ${errors.title ? "error" : ""}`}>
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handleStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
                <FormMessage>{errors.title}</FormMessage>
              </div>
              {/*  END title */}
              {/* START image */}
              <div className={`field img-grid ${errors.img ? "error" : ""}`}>
                <label htmlFor="img">Image</label>
                <input
                  value={data.img}
                  onChange={this.handleStringChange}
                  name="img"
                />
                <FormMessage>{errors.img}</FormMessage>
              </div>
              {/* END image */}
            </div>
            {/*  END left column */}

            {/* START right */}
            <div className="six wide column">
              <UploadImage img={data.img} updatePhoto={this.updatePhoto} />
            </div>
            {/* END right */}
          </div>
          {/*  END two column */}

          {/* START description */}
          <div
            className={`column row field ${errors.description ? "error" : ""}`}
          >
            <label htmlFor="description">Film description</label>
            <textarea
              value={data.description}
              onChange={this.handleStringChange}
              name="description"
              id="description"
              placeholder="film description"
            ></textarea>
            <FormMessage>{errors.description}</FormMessage>
          </div>
          {/* END description */}

          {/* START three columns */}
          <div className="three column row">
            {/* START director */}

            <div className={`column field  ${errors.director ? "error" : ""}`}>
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              <FormMessage>{errors.director}</FormMessage>
            </div>
            {/* END director */}
            {/* START duration */}

            <div className={`column field  ${errors.duration ? "error" : ""}`}>
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
              <FormMessage>{errors.duration}</FormMessage>
            </div>
            {/* END duration */}
            {/* START price */}
            <div className={`column field  ${errors.price ? "error" : ""}`}>
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
              <FormMessage>{errors.price}</FormMessage>
            </div>
            {/* START price */}
          </div>
          {/* END three columns */}

          {/* START featured */}

          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              checked={data.featured}
              onChange={this.handleCheckboxChange}
              type="checkbox"
              name="featured"
              id="featured"
            />
          </div>
          {/* END featured */}
          {/* START buttons */}
          <div className="ui fluid buttons">
            <button className="ui button primary" type="submit">
              Save
            </button>
            <div className="or"></div>
            <Link to="/films" className="ui button">
              Hide form
            </Link>
          </div>
          {/* END buttons */}
        </div>
        {/*  END ui grid */}
      </form>
    );
  }
}

FilmForm.propTypes = {
  saveFilm: PropTypes.func.isRequired,
  film: PropTypes.object,
};

export default FilmForm;
