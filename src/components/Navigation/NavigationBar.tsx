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
import { useTheme } from "../../theme/ThemeContext";

const Navcontainer = styled.div<{ $darkMode: boolean }>`
  border-right: 1.5px solid black;
  align-items: center;
  float: left;
  /* darkMode 값에 따른 색상 조절 */
  background-color: ${({ $darkMode }) => ($darkMode ? "#44474e" : "#F9F9F9")};
  color: ${({ $darkMode }) => ($darkMode ? "white" : "black")};
  width: 200px;
  height: 100vh;
  overflow: hidden;
  transition: 0.5s;
  height: 100vh; /* 화면 전체 높이 */
  position: fixed; /* 고정 위치 */
  white-space: nowrap;

  &.closeNav {
    width: 105px;
    transition: 0.5s;
    height: 100vh; /* 화면 전체 높이 */
    position: fixed; /* 고정 위치 */
    img {
      margin: 0;
    }
  }
`;

const Button = styled.button<{ $darkMode: boolean }>`
  display: flex;
  border: 0;
  /* darkMode 값에 따른 색상 조절 */
  background-color: ${({ $darkMode }) => ($darkMode ? "#44474e" : "#F9F9F9")};
  color: ${({ $darkMode }) => ($darkMode ? "white" : "black")};
  margin: 50px 30px;
  font-size: 15px;
  cursor: pointer;
  top: 0;

  img {
    /* darkMode 값에 따른 밝기 조절 */
    filter: ${({ $darkMode }) => ($darkMode ? "brightness(1.75)" : "brightness(1)")};
    transition: filter 0.5s;
  }

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

interface Profile {
  _id: string;
  user: string;
}

const NavigationBar = () => {
  const navigate = useNavigate();
  //네이게이션바 열고 닫기
  const [showNav, setShowNav] = useState(false);
  //알람과 포스트검색 패널 열고 닫기
  const [notiOpen, setNotiOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>();

  // useTheme에서 themeToggle 함수와 state 가져오기
  const { darkMode, themeToggle } = useTheme();

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("https://kdt.frontend.5th.programmers.co.kr:5004/auth-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data: Profile = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [token]);

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

      <Navcontainer className={showNav ? "" : "closeNav"} $darkMode={darkMode}>
        <Button
          onClick={() => navigate("/")}
          className={showNav ? "" : "btncloseNav"}
          $darkMode={darkMode}>
          <img src={home} alt="home" />
          <span>홈페이지</span>
        </Button>

        <Button
          onClick={() => navigate("/post/create")}
          className={showNav ? "" : "btncloseNav"}
          $darkMode={darkMode}>
          <img src={postgeneration} alt="postgeneration" />
          <span>포스트 생성</span>
        </Button>

        <Button onClick={postHandler} className={showNav ? "" : "btncloseNav"} $darkMode={darkMode}>
          <img src={postsearch} alt="postsearch" />
          <span>포스트 검색</span>
        </Button>

        <Button onClick={notiHandler} className={showNav ? "" : "btncloseNav"} $darkMode={darkMode}>
          <Alarm isClosed={!showNav}>
            <img src={alarm} alt="alarm" />
          </Alarm>
          <span>알림</span>
        </Button>

        {/* 다크모드 버튼 - 클릭시 themeToggle 함수 실행 */}
        <Button className={showNav ? "" : "btncloseNav"} onClick={themeToggle} $darkMode={darkMode}>
          <img src={darkmode} alt="darkmode" />
          <span>다크 모드</span>
        </Button>

        <Button
          onClick={() => profile && navigate(`/profile/${profile._id}`)}
          className={showNav ? "" : "btncloseNav"}
          $darkMode={darkMode}>
          <img src={mypage} alt="mypage" />
          <span>마이페이지</span>
        </Button>

        <Button
          onClick={() => setShowNav(!showNav)}
          className={showNav ? "" : "btncloseNav"}
          $darkMode={darkMode}>
          <img src={showNav ? reduction : expantion} alt="reduction" />
          <span>축소</span>
        </Button>
      </Navcontainer>
    </>
  );
};

export default NavigationBar;
