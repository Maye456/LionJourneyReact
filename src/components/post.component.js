import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost, deletePost } from "../actions/posts";
import PostDataService from "../services/post.service";

class Post extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removePost = this.removePost.bind(this);

    this.state = {
      currentPost: {
        id: null,
        title: "",
        content: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          title: title,
        },
      };
    });
  }

  onChangeContent(e) {
    const content = e.target.value;

    this.setState((prevState) => ({
      currentPost: {
        ...prevState.currentPost,
        content: content,
      },
    }));
  }

  getPost(id) {
    PostDataService.get(id)
      .then((response) => {
        this.setState({
          currentPost: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentPost.id,
      title: this.state.currentPost.title,
      content: this.state.currentPost.content,
    };

    this.props
      .updatePost(this.state.currentPost.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentPost: {
            ...prevState.currentPost,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updatePost(this.state.currentPost.id, this.state.currentPost)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The post was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePost() {
    this.props
      .deletePost(this.state.currentPost.id)
      .then(() => {
        this.props.history.push("/posts");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPost } = this.state;

    return (
      <div>
        {currentPost ? (
          <div className="edit-form">
            <h4>Post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentPost.content}
                  onChange={this.onChangeContent}
                />
              </div>
            </form>

            <button
              //className="badge badge-danger mr-2"
              onClick={this.removePost}
            >
              Delete
            </button>

            <button
              type="submit"
              //className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Post...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updatePost, deletePost })(Post);