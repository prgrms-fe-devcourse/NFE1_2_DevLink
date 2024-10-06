import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Notification_Time from "./Notification_Time";
import user_icon from "../../assets/images/user_icon.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";

interface NotificationPanelProps {
  $isClosed: boolean;
  $darkMode: boolean;
}

const NotificationPanel = styled.div<NotificationPanelProps>`
  position: fixed;
  background-color: white;
  width: 400px;
  height: 706px;
  // 네비게이션바 펼쳐지고 닫힐때 패널 위치조절
  top: 32px;
  left: ${(props) => (props.$isClosed ? "107.5px" : "202.5px")};
  z-index: 1000;
  color: black;
  // 트랜지션 값 펼쳐지고 닫힐때 조절
  transition: ${(props) => (props.$isClosed ? "0.5s" : "0.1s")};
  border-radius: 15px;
  box-shadow: 0px 0px 10px black;
  background-color: ${({ $darkMode }) => ($darkMode ? "#6c707a" : "#F9F9F9")};

  .notifications {
    position: absolute;
    padding-top: 11px;
    padding-left: 24px;
    padding-bottom: 50px;
    font-size: 24px;
    font-weight: bold;
  }

  .todaycontainer {
    width: 400px;
    height: 200px;
    margin-top: 55px;
    overflow-y: scroll;
    -ms-overflow-style: none;

    .today {
      font-size: 20px;

      margin-left: 24px;
      font-weight: bold;
    }
  }

  .todaycontainer::-webkit-scrollbar {
    display: none;
  }

  .yesterdaycontainer {
    width: 400px;
    height: 205px;
    margin-top: 20px;

    .yesterday {
      font-size: 20px;
      margin-left: 24px;
      font-weight: bold;
    }
  }

  .pastcontainer {
    width: 400px;
    height: 205px;
    margin-top: 20px;

    .past {
      font-size: 20px;
      margin-left: 24px;
      font-weight: bold;
    }
  }

  p {
    margin-left: 24px;
    font-size: 12px;
    font-weight: bold;
  }

  hr {
    width: 379px;
    margin: 0;
    margin-left: 10px;
    height: 0.5px;
    background-color: #dbdbdb;
  }

  .likespan {
    color: #8e8e8e;
    margin-left: 27px;
    vertical-align: middle;
  }

  .commentspan {
    color: #8e8e8e;
    margin-left: 26px;
    vertical-align: middle;
  }

  .label {
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: 236.73px;
    vertical-align: middle;
  }

  img {
    vertical-align: middle;
  }

  .todaylabel {
    vertical-align: middle;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      width: 60px;
      vertical-align: middle;
    }
  }
`;

interface User {
  _id: string;
  fullName: string;
}

interface Post {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
}

interface Comment {
  author: string;
  post: Post;
  updatedAt: string;
}

interface Like {
  user: string;
  post: Post;
  updatedAt: string;
}

interface Notification {
  _id: string;
  post: string;
  comment?: Comment;
  like?: Like;
  createdAt: string;
  updatedAt: string;
}

interface Notiprops {
  isClosed: boolean;
  postId?: string;
}

const Notification: React.FC<Notiprops> = ({ isClosed }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          "https://kdt.frontend.5th.programmers.co.kr:5004/notifications",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data: Notification[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (notifications.length === 0) return;

      const userFetchPromises = notifications.map(async (notification) => {
        const authorId = notification.comment
          ? notification.comment.author
          : notification.like?.user;

        if (!authorId) return null;

        try {
          const response = await fetch(
            `https://kdt.frontend.5th.programmers.co.kr:5004/users/${authorId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch user with ID: ${authorId}`);
          }

          const userData: User = await response.json();
          return userData;
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      });

      Promise.all(userFetchPromises).then((usersData) => {
        const validUsersData = usersData.filter((user): user is User => user !== null);
        setUsers(validUsersData);
      });
    };

    fetchUserData();
  }, [notifications, token]);

  const getDateLabel = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    createdDate.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - createdDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
      return "오늘";
    } else if (diffDays > 1 && diffDays < 7) {
      return "어제";
    } else if (diffDays >= 7) {
      return "과거";
    }

    return "";
  };

  const handleNavigate = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const groupedNotifications = notifications.reduce<{
    today: Notification[];
    yesterday: Notification[];
    past: Notification[];
  }>(
    (acc, notification) => {
      const label = getDateLabel(notification.createdAt);
      if (label === "오늘") {
        acc.today.push(notification);
      } else if (label === "어제") {
        acc.yesterday.push(notification);
      } else if (label === "과거") {
        acc.past.push(notification);
      }
      return acc;
    },
    { today: [], yesterday: [], past: [] }
  );

  const userMap: Record<string, User> = {};
  users.forEach(function (user) {
    userMap[user._id] = user;
  });

  const { darkMode } = useTheme();

  function getPostTitle(postTitle: string | undefined) {
    try {
      // postTitle이 없을 경우 기본값으로 빈 문자열을 사용
      const parsedTitle = postTitle ? JSON.parse(postTitle) : { title: "" };
      return parsedTitle.title || postTitle;
    } catch {
      return postTitle || ""; // postTitle이 undefined일 경우 빈 문자열을 반환
    }
  }

  return (
    <NotificationPanel $isClosed={isClosed} $darkMode={darkMode}>
      <span className="notifications">Notifications</span>

      <div className="todaycontainer">
        <div className="today">오늘</div>
        {groupedNotifications.today
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((notification) => {
            const postId = notification.post;
            const userName = notification.comment
              ? userMap[notification.comment.author]?.fullName
              : notification.like
                ? userMap[notification.like.user]?.fullName
                : null;

            const postTitle = notification.comment
              ? notification.comment.post.title
              : notification.like?.post.title;

            const createdAt = notification.comment
              ? notification.comment.updatedAt
              : notification.like?.updatedAt;
            if (userName) {
              return (
                <div key={notification._id}>
                  <p className="todaylabel" onClick={() => handleNavigate(postId)}>
                    <img src={user_icon} alt="User Icon" />
                    <span className="label">
                      {notification.comment ? (
                        <>
                          {userName}님이 <span className="title">"{getPostTitle(postTitle)}"</span>
                          에 댓글을 작성했습니다.
                        </>
                      ) : (
                        <>
                          {userName}님이 <span className="title">"{getPostTitle(postTitle)}"</span>
                          에 좋아요를 표시했습니다.
                        </>
                      )}
                    </span>
                    <span className={notification.comment ? "commentspan" : "likespan"}>
                      <Notification_Time createdAt={createdAt || ""} />
                    </span>
                  </p>
                </div>
              );
            }
          })}
      </div>

      <hr />

      <div className="yesterdaycontainer">
        <div className="yesterday">어제</div>
        {groupedNotifications.yesterday
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((notification) => {
            const postId = notification.post;
            const userName = notification.comment
              ? userMap[notification.comment.author]?.fullName
              : notification.like
                ? userMap[notification.like.user]?.fullName
                : null;

            const postTitle = notification.comment
              ? notification.comment.post.title
              : notification.like?.post.title;

            const createdAt = notification.comment
              ? notification.comment.updatedAt
              : notification.like?.updatedAt;
            if (userName) {
              return (
                <div key={notification._id}>
                  <p className="todaylabel" onClick={() => handleNavigate(postId)}>
                    <img src={user_icon} alt="User Icon" />
                    <span className="label">
                      {notification.comment ? (
                        <>
                          {userName}님이 <span className="title">"{getPostTitle(postTitle)}"</span>
                          에 댓글을 작성했습니다.
                        </>
                      ) : (
                        <>
                          {userName}님이 <span className="title">"{getPostTitle(postTitle)}"</span>
                          에 좋아요를 표시했습니다.
                        </>
                      )}
                    </span>
                    <span className={notification.comment ? "commentspan" : "likespan"}>
                      <Notification_Time createdAt={createdAt || ""} />
                    </span>
                  </p>
                </div>
              );
            }
          })}
      </div>

      <hr />

      <div className="pastcontainer">
        <div className="past">과거</div>
        {groupedNotifications.past
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((notification) => {
            const postId = notification.post;
            const userName = notification.comment
              ? userMap[notification.comment.author]?.fullName
              : notification.like
                ? userMap[notification.like.user]?.fullName
                : null;

            const postTitle = notification.comment
              ? notification.comment.post.title
              : notification.like?.post.title;

            const createdAt = notification.comment
              ? notification.comment.updatedAt
              : notification.like?.updatedAt;
            if (userName) {
              return (
                <div key={notification._id}>
                  <p className="todaylabel" onClick={() => handleNavigate(postId)}>
                    <img src={user_icon} alt="User Icon" />
                    <span className="label">
                      {notification.comment ? (
                        <>
                          {userName}님이 <span className="title">"{getPostTitle(postTitle)}"</span>
                          에 댓글을 작성했습니다.
                        </>
                      ) : (
                        <>
                          {userName}님이 <span className="title">"{getPostTitle(postTitle)}"</span>
                          에 좋아요를 표시했습니다.
                        </>
                      )}
                    </span>
                    <span className={notification.comment ? "commentspan" : "likespan"}>
                      <Notification_Time createdAt={createdAt || ""} />
                    </span>
                  </p>
                </div>
              );
            }
          })}
      </div>
    </NotificationPanel>
  );
};

export default Notification;
