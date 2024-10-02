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

const initialPostPayload = {
  title: "포스트 제목을 작성해 주세요!",
  code: "",
  body: "포스트 한줄 요약을 작성해 주세요!",
  summary: "포스트 한줄 요약을 작성해 주세요!",
};

const initialPostState: PostState = {
  payload: initialPostPayload,
  status: "create",
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

export { config, initialPostState, initialPostPayload, defaultCode };
