import { useNavigate } from "react-router-dom";
import home from "../../assets/images/home.png";
import postgeneration from "../../assets/images/postgeration.png";
import postsearch from "../../assets/images/postsearch.png";
import alarm from "../../assets/images/alarm.png";
import darkmode from "../../assets/images/darkmode.png";
import mypage from "../../assets/images/mypage.png";
import expantion from "../../assets/images/expansion.png";
import reduction from "../../assets/images/reduction.png";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Alarm from "../../features/Navigations/Alarm";
import Notification from "../../features/Navigations/Notification";
import Postsearch from "../../features/Navigations/Postsearch";

const Navcontainer = styled.div`
  border-right: 1.5px solid black;
  align-items: center;
  float: left;
  background-color: #fff;
  width: 200px;
  height: 100%;
  //이거 어찌 해결해야 하나.. 트랜지션..
  overflow: hidden;
  transition: 1s;

  &.closeNav {
    width: 105px;
    transition: 0.5s;
    img {
      margin: 0;
    }
  }
`;

const Button = styled.button`
  display: flex;
  border: 0;
  background-color: #fff;
  margin: 50px 30px;
  font-size: 15px;
  cursor: pointer;
  top: 0;

  &:hover {
    color: #4098ff;
  }

  img {
    width: 25px;
    height: 25px;
    margin-right: 16px;
  }
  span {
    margin-top: 5px;
    display: block;
    overflow: hidden;
  }

  &.btncloseNav {
    margin: 50px 35px;

    span {
      display: none;
    }
  }
`;

const NavigationBar = () => {
  const navigate = useNavigate();
  //네이게이션바 열고 닫기
  const [showNav, setShowNav] = useState(false);
  //알람과 포스트검색 패널 열고 닫기
  const [notiOpen, setNotiOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  //seen값
  const [isSeen, setisSeen] = useState(false);

  ////////////////////////////////////////////
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZmE0ZWQ0ZDQ3NWE4N2RlMGFlMWE1NSIsImVtYWlsIjoidGVzdDA0QGFhYS5jb20ifSwiaWF0IjoxNzI3NjgwMzEzfQ.7rI5mmvcEa1wvVG2Qb2xhIz2ohiaC2XYwtakrMPHgLQ";
  // 라벨 누르면 seen값  true로 바꾸는 fetch
  useEffect(() => {
    fetch("https://kdt.frontend.5th.programmers.co.kr:5004/notifications/seen", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setisSeen(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const notiHandler = () => {
    if (notiOpen) {
      setNotiOpen(false);
    } else {
      setNotiOpen(true);
      setPostOpen(false);
    }
  };

  const postHandler = () => {
    if (postOpen) {
      setPostOpen(false);
    } else {
      setPostOpen(true);
      setNotiOpen(false);
    }
  };

  return (
    <>
      {/* 알람, 포스트검색 패널 오픈 했을때 위치조정값 */}
      {notiOpen && <Notification isClosed={!showNav} />}
      {postOpen && <Postsearch postClosed={!showNav} />}

      <Navcontainer className={showNav ? "" : "closeNav"}>
        <Button onClick={() => navigate("/")} className={showNav ? "" : "btncloseNav"}>
          <img src={home} alt="home" />
          <span>홈페이지</span>
        </Button>

        <Button onClick={() => navigate("/post/create")} className={showNav ? "" : "btncloseNav"}>
          <img src={postgeneration} alt="postgeneration" />
          <span>포스트 생성</span>
        </Button>

        <Button onClick={postHandler} className={showNav ? "" : "btncloseNav"}>
          <img src={postsearch} alt="postsearch" />
          <span>포스트 검색</span>
        </Button>

        <Button onClick={notiHandler} className={showNav ? "" : "btncloseNav"}>
          <Alarm isClosed={!showNav} isSeen={isSeen}>
            <img src={alarm} alt="alarm" />
          </Alarm>
          <span>알림</span>
        </Button>

        <Button className={showNav ? "" : "btncloseNav"}>
          <img src={darkmode} alt="darkmode" />
          <span>다크 모드</span>
        </Button>

        {/* 유저아이디로 다시 지정해야함 */}
        <Button onClick={() => navigate("/profile/1")} className={showNav ? "" : "btncloseNav"}>
          <img src={mypage} alt="mypage" />
          <span>마이페이지</span>
        </Button>

        <Button onClick={() => setShowNav(!showNav)} className={showNav ? "" : "btncloseNav"}>
          <img src={showNav ? reduction : expantion} alt="reduction" />
          <span>축소</span>
        </Button>
      </Navcontainer>
    </>
  );
};

export default NavigationBar;
