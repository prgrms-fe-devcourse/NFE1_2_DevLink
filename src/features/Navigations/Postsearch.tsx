import styled from "styled-components";
import inputdelete from "../../assets/images/inputdelete.png";
import { useEffect, useState } from "react";
import user_icon from "../../assets/images/user_icon.png";
import { useNavigate } from "react-router-dom";

interface postCard {
  $postClosed: boolean;
}

const PostsearchPanel = styled.div<postCard>`
  position: absolute;
  background-color: white;
  width: 397px;
  height: 706px;
  // 네비게이션바 펼쳐지고 닫힐때 패널 위치조절
  top: 32px;
  left: ${(props) => (props.$postClosed ? "107.5px" : "202.5px")};
  z-index: 1000;
  color: black;
  // 트랜지션 값 펼쳐지고 닫힐때 조절
  transition: ${(props) => (props.$postClosed ? "0.5s" : "0.1s")};
  border-radius: 15px;
  box-shadow: 0px 0px 10px black;

  /*&::-webkit-scrollbar {
    display: none;
  } */
  .scroll {
    overflow-y: scroll;
    height: 500px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .postsearch {
    position: absolute;
    padding-top: 70px;
    padding-left: 25px;
    font-size: 24px;
    font-weight: bold;
  }

  input {
    margin-top: 120px;
    margin-left: 32px;
    margin-bottom: 25px;
    width: 332px;
    height: 40px;
    background-color: #efefef;
    border: 0;
    border-radius: 8px;
    padding-left: 10px;
  }
  input:focus {
    outline: none;
  }
  button {
    top: 131px;
    right: 35px;
    position: absolute;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50px;
    background: url(${inputdelete});
    background-color: #efefef;
    cursor: pointer;
  }
  .hr1 {
    border: none;
    height: 1px;
    background-color: #dbdbdb;
    margin-bottom: 0;
  }
  .hr2 {
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
    margin: 20px 20px 5px 20px;
    height: 40px;
    width: 360px;

    cursor: pointer;
    &:hover {
      background-color: #efefef;
      border-radius: 10px;
    }
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    width: 210px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    margin: 0;
    vertical-align: middle;
  }
  .username {
    padding-left: 12px;
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    font-weight: lighter;
    font-size: 14px;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
    display: inline-block;
    padding-left: 46px;
    padding-top: 5px;
  }
`;

type Postprops = {
  postClosed: boolean;
};

interface User {
  title: string;
  author: { fullName: string };
  fullName: string;
  _id: string;
  channel: { name: string; description: string };
}

const Postsearch = ({ postClosed }: Postprops) => {
  const [text, setText] = useState("");
  const [titleUser, setTitleUser] = useState<User[]>([]);
  const navigate = useNavigate();

  //토큰값 POST /login 한곳에서 받아와야함
  const token = localStorage.getItem("userToken");

  //특정 포스트에있는 좋아요, 댓글, 포스트제목, 사용자이름을 불러와야함
  //User에서 포스트 아이디값 불러와야함

  useEffect(() => {
    const searchData = async () => {
      if (text) {
        try {
          const response = await fetch(
            `https://kdt.frontend.5th.programmers.co.kr:5004/search/all/${text}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setTitleUser(data);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setTitleUser([]);
      }
    };
    searchData();
  }, [text]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const Reset = () => {
    setText("");
  };

  return (
    <PostsearchPanel $postClosed={postClosed}>
      <span className="postsearch">포스트 검색</span>
      <input type="text" onChange={onChange} value={text} maxLength={18} />
      <button onClick={Reset}></button>
      <hr className="hr1" />
      <div className="scroll">
        {text && (
          <ul>
            {titleUser.map((user) =>
              user.channel && user.channel.name === "devlink" ? (
                <li key={user._id} onClick={() => navigate(`/post/${user._id}`)}>
                  <p className="title">{user.title}</p>
                  <img src={user_icon} alt="user_icon" />
                  <span className="username">{user.author.fullName}</span>
                  {/* <hr className="hr2" /> */}
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>
    </PostsearchPanel>
  );
};

export default Postsearch;
