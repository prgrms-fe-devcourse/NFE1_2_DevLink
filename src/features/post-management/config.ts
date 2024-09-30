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

const initialState: PostState = {
  title: "",
  code: "",
  body: "",
  summary: "",
};

export { config, initialState };
