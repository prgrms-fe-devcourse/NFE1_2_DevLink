import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

// Styled Components
const CommentWrapper = styled.div`
  margin-top: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  margin-bottom: 20px;
  img {
    margin: 0;
  }

  h2 {
    font-size: 32px;
    margin: 0;
  }
`;

const CommentForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  textarea {
    flex-grow: 1;
    margin-right: 10px;
  }

  button {
    white-space: nowrap;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0px;
`;

const CommentItem = styled.li`
  background-color: #f0f0f0;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 18px;

  .comment-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    .author {
      font-weight: bold;
    }
  }

  p {
    margin: 0;
  }

  .createdAt {
    color: #1890ff;
  }
`;

const CommentUserIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  gap: 10px;
  cursor: pointer;

  span {
    font-size: 18px;
  }
`;

const CommentButtons = styled.div`
  display: flex;
  gap: 5px;
`;
///////////////////////////////////////////////////////

// Comment 타입 정의 추가
interface Comment {
  _id: string; // 댓글의 고유 ID
  comment: string; // 댓글 내용
  author: {
    fullName: string;
    image: string;
    _id: string;
  }; // 작성자 정보
  createdAt: string; // 댓글 작성일
}

interface CommentComponentPorps {
  postId: string;
}

const CommentComponent: React.FC<CommentComponentPorps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  // 댓글 목록을 GET /posts/{postId}  API를 통해 불러오기
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://kdt.frontend.5th.programmers.co.kr:5004/posts/${postId}`
      );
      if (!response.ok) {
        throw new Error("포스트를 불러오는 데 실패했습니다.");
      }
      const postData = await response.json();
      setComments(postData.comments); // 포스트에서 가져온 댓글 배열을 상태에 설정
    } catch (error) {
      console.error("댓글을 가져오는데 실패함", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 댓글 작성 함수
  const handleAddComment = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      message.error("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(
        "https://kdt.frontend.5th.programmers.co.kr:5004/comments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            comment: newComment,
            postId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 작성 실패");
      }

      const newCommentData = await response.json();
      setComments((prevComments) => [...prevComments, newCommentData]); // 작성된 댓글 추가
      setNewComment(""); // 입력창 비우기
      console.log("댓글 작성 성공:", newCommentData);
    } catch (error) {
      message.error("댓글 작성 중 오류 발생");
    }
  };
  //로그인한 사용자 ID 호출 (본일일때 삭제 버튼 활성화)
  const fectchUserData = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) return;

    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/auth-user", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setCurrentUserId(userData._id); //로그인한 사용자의 Id로 설정
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다", error);
    }
  };

  useEffect(() => {
    fetchComments();
    fectchUserData(); // 사용자 정보를 가져오기 위한 useEffect 호출 추가
  }, [postId]);

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId: string) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      message.error("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(
        "https://kdt.frontend.5th.programmers.co.kr:5004/comments/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            id: commentId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 삭제 실패");
      }

      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      console.log("댓글 삭제 성공:", commentId);
    } catch (error) {
      message.error("댓글 삭제 중 오류 발생");
    }
  };

  // 댓글 작성자 네비게이터
  const handleAuthorClick = (authorId: string) => {
    navigate(`/profile/${authorId}`);
  };

  return (
    <CommentWrapper>
      <Title>
        <img src="/comment_icon.png" alt="댓글 아이콘" />
        <h2>댓글</h2>
      </Title>

      <CommentForm>
        <Input.TextArea
          rows={1}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성하세요"
        />
        <Button type="primary" onClick={handleAddComment}>
          댓글 작성
        </Button>
      </CommentForm>

      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment._id}>
            <CommentUserIcon onClick={() => handleAuthorClick(comment.author._id)}>
              <UserOutlined style={{ fontSize: "50px" }} />
              <span>{comment.author.fullName}</span>
            </CommentUserIcon>
            <CommentContent>
              <div className="comment-top">
                <p>{comment.comment}</p>
              </div>
              <p className="createdAt">{new Date(comment.createdAt).toLocaleDateString("ko-KR")}</p>
            </CommentContent>
            <CommentButtons>
              {comment?.author._id === currentUserId && (
                <>
                  <Button type="text" onClick={() => handleDeleteComment(comment._id)}>
                    삭제
                  </Button>
                </>
              )}
            </CommentButtons>
          </CommentItem>
        ))}
      </CommentList>
    </CommentWrapper>
  );
};

export default CommentComponent;
