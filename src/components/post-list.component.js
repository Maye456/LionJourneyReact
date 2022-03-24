import React, { Component } from "react";
import { connect } from "react-redux";
import { retrievePosts, findPostByTitle } from "../actions/posts";
import { Link } from 'react-router-dom';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    this.findByTitle = this.findByTitle.bind(this);

    this.state = {
      currentPost: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrievePosts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
        currentPost: null,
      currentIndex: -1,
    });
  }

  setActivePost(post, index) {
    this.setState({
      currentPost: post,
      currentIndex: index,
    });
  }

  findByTitle() {
    this.refreshData();

    this.props.findPostByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentPost, currentIndex } = this.state;
    const { posts } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Posts List</h4>

          <ul className="list-group">
            {posts &&
              posts.map((post, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePost(post, index)}
                  key={index}
                >
                  {post.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentPost ? (
            <div>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPost.title}
              </div>
              <div>
                <label>
                  <strong>Content:</strong>
                </label>{" "}
                {currentPost.content}
              </div>

              <Link
                to={'/posts/' + currentPost.id}
                // className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Post...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { retrievePosts, findPostByTitle})(PostsList);