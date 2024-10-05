import React, { useEffect, useState } from "react";
import { Switch, Button, message, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UserOutlined, CopyOutlined, CodeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Comment from "../components/Post/Comment";
import LikeButtonPostDetailPage from "../components/Post/LikeButtonPostDetailPage";
import { Highlight } from "prism-react-renderer";
import CodeRenderer from "../components/Post/CodeRender";

// Styled Components for layout and styles
const PostWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  box-sizing: border-box; /* 추가 */
`;

const PostHeader = styled.div``;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const FirstLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
`;

const AuthorDateWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Author = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const StyledDate = styled.p`
  font-size: 24px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  color: #999;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  font-size: 24px;
  color: #999;
  line-height: 1.2;
  padding: 8px 16px;
  min-height: 36px;
`;

const Summary = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const BodyText = styled.p`
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 18px;
  line-height: 1.5;
`;

const Container = styled.div`
  width: 100%;
  height: 619px;
  flex-direction: column;
  background-color: #f6f8fa;
  border-radius: 8px;
  margin: 16px 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  padding: 10px 20px 10px 20px;
  background-color: #2f2f2f;
  color: #b4b4b4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CopyButton = styled(Button)`
  background-color: #2f2f2f;
  color: #b4b4b4;
  border: none;
  &:hover {
    background-color: #777;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px;
`;

const SwitchText = styled.span`
  margin-right: 8px;
  font-size: 18px;
`;

const PreviewContent = styled.div`
  padding: 20px;
  margin: 0;
  overflow: auto;
  background-color: inherit;
  flex-grow: 1;
`;

const StyledPre = styled.pre`
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  width: 100%;
  height: 100%;
`;

const StyledCode = styled.code`
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #ffffff;
`;

// Post 타입 정의
interface Author {
  fullName: string;
  email: string;
  _id: string;
}

interface Post {
  _id: string;
  title: string;
  author: Author;
  createdAt: string;
  bodytext: string;
  summary: string;
  likes: any[];
  comments: any[];
  code: string;
  preview: string;
  language: string;
}

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5004/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();

        const postWithCode = {
          ...data,
          code: data.code || `function tempFunction() { console.log('임시 코드입니다.'); }`,
        };

        setPost(postWithCode);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  //로그인한 사용자 ID 호출 (본인일 때 버튼 활성화 때문)
  useEffect(() => {
    const fetchUserData = async () => {
      const jwtToken = localStorage.getItem("userToken");
      if (!jwtToken) return;

      try {
        const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/auth-user", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setCurrentUserId(userData._id);
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("게시글 작성자 ID: ", post?.author._id);
    console.log("현재 로그인 사용자 ID: ", currentUserId);
  }, [post, currentUserId]);

  // 토글 스위치 상태 변경 핸들러
  const handleToggle = (checked: boolean) => {
    setShowPreview(checked); // 스위치 상태에 따라 showPreview 상태를 업데이트
  };

  // 코드 복사 기능 추가
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  //삭제 함수
  const handleDelete = async (postId: string) => {
    const jwtToken = localStorage.getItem("userToken");

    if (!jwtToken) {
      message.error("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/posts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          id: postId,
        }),
      });

      if (!response.ok) {
        throw new Error("포스트 삭제 실패");
      }

      console.log("포스트가 성공적으로 삭제되었습니다.");
      // 삭제 후 마이페이지로 네비게이터 (템플릿리터럴 백틱 사용!!)
      navigate(`/profile/${post.author._id}`);
    } catch (error) {
      message.error("포스트 삭제 중 오류 발생");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <PostWrapper>
      <PostHeader>
        <Title>
          {(() => {
            try {
              const parsedTitle = JSON.parse(post.title);
              return parsedTitle.title; // title 값만 반환
            } catch (e) {
              return post.title; // 단순 문자열일 경우 그대로 반환
            }
          })()}
        </Title>
        <FirstLineWrapper>
          <AuthorDateWrapper>
            <Author onClick={() => navigate(`/profile/${post?.author._id}`)}>
              <UserOutlined />
              {post?.author.fullName}
            </Author>
            <StyledDate>{post && new Date(post.createdAt).toLocaleDateString("ko-KR")}</StyledDate>
          </AuthorDateWrapper>

          <ButtonsWrapper>
            {post?.author._id === currentUserId && (
              <>
                <StyledButton type="text" onClick={() => navigate(`/post/modify/${postId}`)}>
                  수정
                </StyledButton>
                {post?._id && (
                  <StyledButton type="text" onClick={() => handleDelete(post._id)}>
                    삭제
                  </StyledButton>
                )}
              </>
            )}
          </ButtonsWrapper>
        </FirstLineWrapper>
      </PostHeader>
      <Summary>
        {JSON.parse(post.title).summary
          ? JSON.parse(post.title).summary
          : "작성된 한줄 요약이 없습니다."}
      </Summary>

      {post && (
        <Container>
          <HeaderWrapper>
            <LeftContainer>
              <CodeOutlined style={{ marginRight: "8px" }} />
              <Typography.Text style={{ color: "#B4B4B4" }}>
                {post.language || "Component.tsx"}
              </Typography.Text>
            </LeftContainer>
            <RightContainer>
              <CopyButton
                icon={<CopyOutlined />}
                onClick={() => handleCopyCode(JSON.parse(post.title).code || "")}>
                코드 복사
              </CopyButton>
              <SwitchContainer>
                <SwitchText>{showPreview ? "Preview" : "Code"}</SwitchText>
                <Switch checked={showPreview} onChange={handleToggle} />
              </SwitchContainer>
            </RightContainer>
          </HeaderWrapper>
          {showPreview ? (
            <PreviewContent>
              {post?.code ? (
                <CodeRenderer data={JSON.parse(post.title).code} />
              ) : (
                <p>렌더링이 실패했습니다.</p>
              )}
            </PreviewContent>
          ) : (
            <Highlight code={JSON.parse(post.title).code} language={post?.language || "javascript"}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <StyledPre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <StyledCode key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </StyledPre>
              )}
            </Highlight>
          )}
        </Container>
      )}

      <BodyText>
        {JSON.parse(post.title).body
          ? JSON.parse(post.title).body
          : "작성된 본문 텍스트가 없습니다."}
      </BodyText>
      <hr />

      <LikeButtonPostDetailPage
        postId={post?._id ? post._id.toString() : ""}
        initialLikeCount={post?.likes.length ?? 0}
        style={{ marginBottom: "70px" }}
      />

      {postId && post && <Comment postId={postId} post={post} />}
    </PostWrapper>
  );
};

export default PostDetailPage;
