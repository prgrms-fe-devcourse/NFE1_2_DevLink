import styled from "styled-components";

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup<{ isClosed: boolean; isSeen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  align-items: center;
  height: 15px;
  padding: 0 8px;
  border-radius: 20px;
  color: white;
  background-color: red;
  //네비게이션 열려있거나 닫혀있을때 알람 위치 조정
  transform: ${(props) => (props.isClosed ? "translate(30%, -30%)" : "translate(-75%, -30%)")};

  //알람이 없으면 감추기 (나중에 사용)
  visibility: ${(props) => (props.isSeen ? "hidden" : "visible")};
`;

interface AlarmProps {
  children: React.ReactNode;
  isClosed: boolean;
  isSeen: boolean;
}

const Alarm: React.FC<AlarmProps> = ({ children, isClosed, isSeen, ...props }) => {
  // //토큰값 POST /login 한곳에서 받아와야함
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZmE0ZWQ0ZDQ3NWE4N2RlMGFlMWE1NSIsImVtYWlsIjoidGVzdDA0QGFhYS5jb20ifSwiaWF0IjoxNzI3NjgwMzEzfQ.7rI5mmvcEa1wvVG2Qb2xhIz2ohiaC2XYwtakrMPHgLQ";

  // //특정 포스트에있는 좋아요, 댓글, 포스트제목, 사용자이름을 불러와야함
  // //User에서 포스트 아이디값 불러와야함
  // useEffect(() => {
  //   fetch("https://kdt.frontend.5th.programmers.co.kr:5004/notifications", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setIsSeen(data))
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  return (
    <BadgeContainer {...props}>
      {children}
      <Super isSeen={isSeen} isClosed={isClosed}></Super>
    </BadgeContainer>
  );
};

export default Alarm;
