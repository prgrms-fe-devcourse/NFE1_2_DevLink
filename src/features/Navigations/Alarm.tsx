import { useEffect, useState } from "react";
import styled from "styled-components";

interface AlarmClosed {
  $isClosed: boolean;
  $isSeen: boolean;
}

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup<AlarmClosed>`
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
  // 네비게이션 열려있거나 닫혀있을때 알람 위치 조정
  transform: ${(props) => (props.$isClosed ? "translate(30%, -30%)" : "translate(-75%, -30%)")};
  // 알람이 없으면 감추기 (나중에 사용)
  visibility: ${(props) => (props.$isSeen ? "hidden" : "visible")};
`;

interface AlarmProps {
  children: React.ReactNode;
  isClosed: boolean;
  isSeen: boolean;
}

interface AlarmData {
  seen: boolean;
}

const Alarm: React.FC<AlarmProps> = ({ children, isClosed, ...props }) => {
  const [alarms, setAlarms] = useState<AlarmData[]>([]);
  const [isSeen, setIsSeen] = useState<boolean>(false);

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

        const data: AlarmData[] = await response.json();
        setAlarms(data);

        const anyUnseen = data.some((alarm) => alarm.seen === false);
        setIsSeen(!anyUnseen);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <BadgeContainer {...props}>
      {children}
      <Super $isClosed={isClosed} $isSeen={isSeen}></Super>
    </BadgeContainer>
  );
};

export default Alarm;
