import React from "react";

interface TateProps {
  createdAt: string;
}

const Notification_Time: React.FC<TateProps> = ({ createdAt }) => {
  const createdDate = new Date(createdAt);
  const today = new Date();

  const diffTime = today.getTime() - createdDate.getTime();

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 60) {
    if (diffMinutes === 0) {
      return "지금";
    } else {
      return `${diffMinutes}분 전`;
    }
  } else if (diffHours >= 1 && diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffHours >= 24 && diffHours < 48) {
    return "1일 전";
  } else if (diffHours >= 48 && diffHours < 168) {
    return "몇일 전";
  } else if (diffHours >= 168 && diffHours < 336) {
    return "일주일 전";
  } else if (diffHours >= 336 && diffHours < 504) {
    return "2주일 전";
  } else if (diffHours >= 504 && diffHours < 672) {
    return "3주일 전";
  } else if (diffHours >= 672) {
    return "한달 전";
  }
};

export default Notification_Time;
