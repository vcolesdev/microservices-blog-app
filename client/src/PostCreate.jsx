import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

export default function PostCreate({ titleText, submitText }) {
  const [title, setTitle] = useState("");

  // Handle form submission.
  async function onSubmit(event) {
    event.preventDefault();

    // Request to /posts microservice, create a new post.
    await axios.post("http://localhost:4000/posts", { title });
    await console.log("Post created!", title);

    setTitle("");
  }

  // Handle title change.
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  return (
    <div>
      <form className="max-w-3xl w-full mb-6 p-4" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="postTitle" className="block mb-2 ms-1">
            <span className="inline-block">{titleText}</span>
          </label>
          <input
            required
            type="text"
            className="block mb-6 w-full py-3 px-4 border-2 border-slate-400 rounded-[10px] focus:outline-none focus:border-rose-400"
            id="postTitle"
            onChange={(e) => handleTitleChange(e)}
            value={title}
          />
        </div>
        <button className="btn btn-primary px-4 py-3 rounded-[10px] bg-rose-500 text-white">
          {submitText}
        </button>
      </form>
    </div>
  );
}

PostCreate.propTypes = {
  titleText: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
};
