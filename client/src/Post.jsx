import PropTypes from "prop-types";
import CommentCreate from "./CommentCreate.jsx";
import CommentList from "./CommentList.jsx";

export default function Post({ post }) {
  return (
    <li className="list-none" key={post.id}>
      <div className="card bg-slate-100 border-2 border-slate-400 rounded-[10px]">
        <div className="card-body p-4">
          <h3 className="text-xl font-semibold tracking-tight mb-6">
            {post.title}
          </h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
