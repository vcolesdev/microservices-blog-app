import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    // Request to /comments microservice, create a new comment.
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    // Reset the form.
    setContent("");
    console.log(`New comment created for ${postId}!`, content);
  }

  return (
    <form className="max-w-3xl w-full" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="commentContent" className="block mb-2 ms-1">
          <span className="inline-block">Add New Comment</span>
        </label>
        <textarea
          required
          className="block mb-6 w-full py-3 px-4 border-2 border-slate-400 rounded-[10px] focus:outline-none focus:border-rose-400"
          id="commentContent"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn btn-primary px-3 py-2.5 rounded-[8px] bg-slate-700 text-white">
        Submit Comment
      </button>
    </form>
  );
}

CommentCreate.propTypes = {
  postId: PropTypes.string.isRequired,
};
