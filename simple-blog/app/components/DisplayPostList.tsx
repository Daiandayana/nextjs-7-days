// app/components/PostList.tsx
"use client";

import { useEffect, useState } from "react";

type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createAt: Date;
  updateAt: Date;
};

export default function DisplayPostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return posts.map((post) => <div key={post._id}>{post.title}</div>);
}
