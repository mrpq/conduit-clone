import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { publishArticle } from "./actions";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: ""
    };
  }

  handleChange = e => {
    const { target: { value, name } } = e;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(
      publishArticle({
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
        tagList: this.state.tagList.split(",")
      })
    ).then(({ slug }) => {
      console.log(slug);
      dispatch(push(`/article/${slug}`));
    });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="title"
            placeholder="Article Title"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="What's this article about?"
            onChange={this.handleChange}
          />
          <textarea
            name="body"
            placeholder="What's this article about?"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="tagList"
            placeholder="Enter tags"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Publish Article</button>
        </form>
      </div>
    );
  }
}

Editor = connect()(Editor);

export default Editor;
