import Post from "./Post.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostList() {
  const [posts, setPosts] = useState({});

  const renderedPosts = Object.values(posts).map((post) => (
    <Post post={post} key={post.id} />
  ));

  async function fetchPosts() {
    try {
      const res = await axios.get("http://localhost:4002/posts");
      console.log("Posts fetched from Query service: ", res.data);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    void fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <ul className="posts group grid grid-cols-3 gap-6 space-between max-w-7xl">
        {renderedPosts.length > 0 ? renderedPosts : <p>No posts yet.</p>}
      </ul>
    </div>
  );
}
