import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Spinner from "react-spinkit";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      selectedFile: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    axios.get("http://localhost:3005/api/image").then(({ data }) => {
      this.setState({
        images: [...data, ...this.state.images],
        loading: false,
      });
    });

    const pusher = new Pusher("888dc73d4ed3cba9a260", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("gallery");
    channel.bind("upload", (data) => {
      this.setState({
        images: [data.image, ...this.state.images],
      });
    });
  }

  fileChangedHandler = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  uploadImage = (event) => {
    event.preventDefault();

    if (!this.state.selectedFile) return;

    this.setState({
      loading: true,
    });

    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post("http://localhost:3005/api/image", formData).then(({ data }) => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const image = (url, index) => (
      <img alt="" className="photo" key={index} src={url} />
    );

    const images = this.state.images.map((e) => image(e.secure_url, e._id));

    return (
      <div>
        {/* <div className="form-container">
          <h1 className="title">ADD IMAGE</h1>

          <form method="post" onSubmit={this.uploadImage} className="form">
            <input
              id="gallery-image"
              type="file"
              name="image"
              onChange={this.fileChangedHandler}
              className="form-input"
              accept=".jpg, .jpeg, .png"
            />
            <button className="btn" type="submit">
              Upload!
            </button>
          </form>
        </div> */}
        <div className="loading-indicator">
          {this.state.loading ? <Spinner name="spinner" /> : ""}
        </div>

        <div className="gallery">{images}</div>
      </div>
    );
  }
}

export default Home;