import { useEffect, useState } from "react";
import styled from "styled-components";
import Notification_Time from "./Notification_Time";
import user_icon from "../../assets/images/user_icon.png";
import { useNavigate } from "react-router-dom";

const NotifiationPanel = styled.div<{ isClosed: boolean }>`
  position: absolute;
  background-color: white;
  width: 400px;
  height: 706px;
  // 네비게이션바 펼쳐지고 닫힐때 패널 위치조절
  top: 32px;
  left: ${(props) => (props.isClosed ? "107.5px" : "202.5px")};
  z-index: 1000;
  color: black;
  // 트랜지션 값 펼쳐지고 닫힐때 조절
  transition: ${(props) => (props.isClosed ? "0.5s" : "0.1s")};
  border-radius: 15px;
  box-shadow: 0px 0px 10px black;

  .notifications {
    position: absolute;
    padding-top: 11px;
    padding-left: 24px;
    padding-bottom: 50px;
    font-size: 24px;
    font-weight: bold;
  }
  .todaycontainer {
    /* background-color: black;
    color: white; */
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
    /* background-color: #f90000;
    color: white; */
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
    /* background-color: #22ff00;
    color: white; */
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
    height: 0.5;
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
  }
`;

//타입지정 다시해야함
type Notiprops = {
  isClosed: boolean;
};

interface Notification {
  type: "like" | "comment";
  createdAt: string;
  authorFullName: string;
  title: string;
  likes?: { post: string }[];
  comments?: { createdAt: string }[];
  post: string;
}

interface NotifiCations {
  likes: { createdAt: string; post: string }[];
  comments: { createdAt: string; post: string }[];
  author: { fullName: string };
  title: string;
}

const Notification = ({ isClosed }: Notiprops) => {
  const [notifiCations, setNotifiCations] = useState<NotifiCations>({
    likes: [],
    comments: [],
    author: { fullName: "" },
    title: "",
  });

  const navigate = useNavigate();
  //토큰값 POST /login 한곳에서 받아와야함
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZmE0ZWQ0ZDQ3NWE4N2RlMGFlMWE1NSIsImVtYWlsIjoidGVzdDA0QGFhYS5jb20ifSwiaWF0IjoxNzI3NjgwMzEzfQ.7rI5mmvcEa1wvVG2Qb2xhIz2ohiaC2XYwtakrMPHgLQ";

  //특정 포스트에있는 좋아요, 댓글, 포스트제목, 사용자이름을 불러와야함
  //User에서 포스트 아이디값 불러와야함
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://kdt.frontend.5th.programmers.co.kr:5004/posts/66fa51ca99151c7e47a33535",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setNotifiCations(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  //좋아요,댓글 오늘,어제,과거 구분함수
  const getDateLabel = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    createdDate.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - createdDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
      return "오늘";
    } else if (diffDays === 1) {
      return "어제";
    } else if (diffDays > 1) {
      return "과거";
    }

    return "";
  };

  // 시간에 따라 좋아요와 댓글 알림 유동적으로 나타나게 하기
  const divisionNotifications: Notification[] = [
    ...notifiCations.likes.map((like) => ({
      type: "like" as const,
      createdAt: like.createdAt,
      authorFullName: notifiCations.author.fullName,
      title: notifiCations.title,
      post: like.post,
    })),
    ...notifiCations.comments.map((comment) => ({
      type: "comment" as const,
      createdAt: comment.createdAt,
      authorFullName: notifiCations.author.fullName,
      title: notifiCations.title,
      post: comment.post,
    })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 해당 좋아요나 댓글 라벨을 클릭할시 해당 페이지로 이동한다.

  return (
    <NotifiationPanel isClosed={isClosed}>
      <span className="notifications">Notifications</span>
      <div className="todaycontainer">
        <div className="today">오늘</div>
        {divisionNotifications.map((notification, index) =>
          getDateLabel(notification.createdAt) === "오늘" ? (
            <div key={index}>
              <p
                className="todaylabel"
                onClick={() => {
                  navigate(`/post/${notification.post}`);
                }}>
                <img src={user_icon} alt="" />
                <span className="label">
                  {notification.type === "like"
                    ? `${notification.authorFullName}님이 "${notification.title}"에 좋아요를 표시했습니다.`
                    : `${notification.authorFullName}님이 "${notification.title}"에 댓글을 작성했습니다.`}
                </span>
                <span className={notification.type === "like" ? "likespan" : "commentspan"}>
                  <Notification_Time createdAt={notification.createdAt} />
                </span>
              </p>
            </div>
          ) : null
        )}
      </div>

      <hr />
      <div className="yesterdaycontainer">
        <div className="yesterday">어제</div>
        {divisionNotifications.map((notification, index) =>
          getDateLabel(notification.createdAt) === "어제" ? (
            <div key={index}>
              <p
                className="todaylabel"
                onClick={() => {
                  navigate(`/post/${notification.post}`);
                }}>
                <img src={user_icon} alt="" />
                <span className="label">
                  {notification.type === "like"
                    ? `${notification.authorFullName}님이 "${notification.title}"에 좋아요를 표시했습니다.`
                    : `${notification.authorFullName}님이 "${notification.title}"에 댓글을 작성했습니다.`}
                </span>
                <span className={notification.type === "like" ? "likespan" : "commentspan"}>
                  <Notification_Time createdAt={notification.createdAt} />
                </span>
              </p>
            </div>
          ) : null
        )}
      </div>
      <hr />
      <div className="pastcontainer">
        <div className="past">과거</div>
      </div>
    </NotifiationPanel>
  );
};

export default Notification;

{
  /* {notifiCations.likes && getDateLabel(notifiCations.likes[0].createdAt) === "오늘" ? (
          <p className="todaylabel">
            {`${notifiCations.author.fullName}님이 "${notifiCations.title}"에 좋아요를 표시했습니다.`}
            <span className="likespan">
              <Notification_Time createdAt={notifiCations.likes[0].createdAt} />
            </span>
          </p>
        ) : null}
        {notifiCations.comments && getDateLabel(notifiCations.comments[0].createdAt) === "오늘" ? (
          <p className="todaylabel">
            {`${notifiCations.author.fullName}님이 "${notifiCations.title}"에 댓글을 작성했습니다.`}
            <span className="commentspan">
              <Notification_Time createdAt={notifiCations.comments[0].createdAt} />
            </span>
          </p>
        ) : null}
      </div> */
}
