import PropTypes from "prop-types";

export default function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => (
    <li className="mb-1 ps-1 text-[15px] ms-1" key={comment.id}>
      {comment.content}
    </li>
  ));

  return <ul className="mb-4 ms-3 list-disc">{renderedComments}</ul>;
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
