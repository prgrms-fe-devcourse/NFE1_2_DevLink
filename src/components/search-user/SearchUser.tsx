// 코드 최적화 이전 (수정예정)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 30px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0px;
  margin: 0px;
  width: 250px;
  div {
    margin: 0 10px;
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  text-align: center;
  width: 100%;
  border: none;
  outline: none;
  padding: 5px;
  border-radius: 25px;
`;

const AutoComplete = styled.ul`
  width: 252px;
  max-height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 5px 0px;
    border: 1px solid #ccc;
  }
`;

interface User {
  _id: string;
  fullName: string;
}

const SearchUser = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [autoComplete, setAutoComplete] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://kdt.frontend.5th.programmers.co.kr:5004/users/get-users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("사용자 데이터 가져오기 실패: ", error);
      }
    };
    fetchUser();
  }, []);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 새로운 입력이 발생했을 시 inputValue의 상태를 변경한다.
    setInputValue(e.target.value);
    // 새로운 입력이 발생했을 시 자동완성 목록을 변경한다. (입력창에 공란이라면 []빈배열로 변경한다)
    if (e.target.value) {
      const filterUsers = users.filter((user) => user.fullName.includes(e.target.value));
      setAutoComplete(filterUsers);
    } else {
      setAutoComplete([]); // 빈배열로 변경
    }
  };

  const handleUserClick = (user: User) => {
    setInputValue(user.fullName); // input 텍스트를 현재 클릭한 텍스트로 변경한다.
    setAutoComplete([]); // 자동완성 배열을 빈배열로 변경하여 자동완성이 나오지 않게 한다.
    navigate(`/profile/${user._id}`); // "/profile/${유저 고유 아이디}"로 이동시킨다.
  };

  return (
    <SearchContainer>
      <SearchBar>
        <SearchInput
          value={inputValue}
          onChange={onChangeInput}
          placeholder="검색어를 입력해주세요"
        />
        <div>🔍</div>
      </SearchBar>
      <AutoComplete>
        {autoComplete.map((user) => (
          <li key={user._id} onClick={() => handleUserClick(user)}>
            {user.fullName}
          </li>
        ))}
      </AutoComplete>
    </SearchContainer>
  );
};

export default SearchUser;
