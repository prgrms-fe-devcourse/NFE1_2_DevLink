import { PostState } from "./type";

const config = {
  style: {
    container: {
      width: 850,
    },
    top: {
      height: 80,
    },
    bottom: {
      height: 80,
    },
    outerBackground: "white",
    background: "#e5e5e5",
  },
};

const defaultCode = `const Component = () => {
  return (
    <div style={styles}>
      <h1>Hello World</h1>
    </div>
  );
};

const styles = {
  backgroundColor: "lightblue",
  padding: "20px",
  borderRadius: "5px",
  textAlign: "center",
};
`;

const initialPostPayload = {
  title: "포스트 제목을 작성해 주세요!",
  code: defaultCode,
  body: "포스트 한줄 요약을 작성해 주세요!",
  summary: "포스트 한줄 요약을 작성해 주세요!",
};

const initialPostState: PostState = {
  payload: initialPostPayload,
  status: "create",
};

const SERVER_URL = "https://kdt.frontend.5th.programmers.co.kr:5004";
const CHANNEL_ID = "66fa639af51c4a015245396f";

export { config, initialPostState, initialPostPayload, defaultCode, CHANNEL_ID, SERVER_URL };
