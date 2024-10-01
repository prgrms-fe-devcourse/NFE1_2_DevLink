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
  title: "",
  code: "",
  body: "",
  summary: "",
};

const initialPostState: PostState = {
  payload: initialPostPayload,
  status: "create",
};

export { config, initialPostState, initialPostPayload };
