import PostCreate from "./PostCreate.jsx";
import PostList from "./PostList.jsx";

function App() {
  return (
    <div className="text-slate-700">
      <h1 className="text-3xl ms-4 mb-6 py-4">Blog App</h1>
      <h2 className="text-2xl ms-4">Create New Post</h2>
      <PostCreate titleText="Post Title" submitText="Create Post" />
      <hr className="mb-8" />
      <h1 className="text-3xl ms-4 mb-6 pb-4">Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
