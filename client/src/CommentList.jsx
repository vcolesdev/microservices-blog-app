import PropTypes from "prop-types";

export default function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    let content;

    // Render the comment content based on the comment status.
    switch (comment.status) {
      case "APPROVED":
        content = comment.content;
        break;
      case "PENDING":
        content = "This comment is awaiting moderation";
        break;
      case "REJECTED":
        content = "This comment has been rejected";
        break;
      default:
        content = "This comment is awaiting moderation";
    }

    return (
      <li className="mb-1 ps-1 text-[15px] ms-1" key={comment.id}>
        {content}
      </li>
    );
  });

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
