import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

// Post 타입 정의
interface Post {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  summary: string;
  likes: number;
}

// PostListProps 타입 정의
interface PostListProps {
  channelId: string; // channelId를 props로 받음
  offset?: number;
  limit?: number;
}

const PostList: React.FC<PostListProps> = ({ channelId, offset = 0, limit = 10 }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    const channelId = "66fa639af51c4a015245396f"; // devlink 채널의 _id

    try {
      const response = await fetch(
        `https://kdt.frontend.5th.programmers.co.kr:5004/posts/channel/${channelId}?offset=${offset}&limit=${limit}`
      );
      console.log("응답 상태:", response.status, response.statusText); // 응답 상태 출력
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("가져온 포스트 목록:", data); // 받아온 데이터 로깅
      setPosts(data);
    } catch (error) {
      console.error("포스트 목록을 가져오는 중 오류 발생", error);
      setError("포스트 로딩 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [channelId, offset, limit]);

  if (loading) {
    return <div>포스트 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>포스트가 없습니다 !!!</div>;
  }

  console.log(`channelId: ${channelId}`);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post._id}>
          <PostCard postId={post._id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
