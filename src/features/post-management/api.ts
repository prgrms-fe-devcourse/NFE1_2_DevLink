import { message } from "antd";
import { PostPayload, PostSchema } from "./type";
import { SERVER_URL } from "./config";

type Options = {
  url: string;
  method: "POST" | "PUT";
  payload: PostPayload;
  jwtToken: string;
  additionalData?: Record<string, string>;
};

const sendPostRequest = async ({ jwtToken, method, payload, url, additionalData }: Options) => {
  try {
    const formData = new FormData();
    formData.append("title", JSON.stringify(payload));

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${jwtToken}`, // JWT 토큰 설정
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to ${method === "POST" ? "create" : "modify"} a post`);
    }

    const result = await response.json();

    message.success(`Successful post ${method === "POST" ? "creation" : "modification"}`);

    if (!result.author._id) {
      throw new Error("Error occurred: userId does not exist.");
    }

    return result.author._id;
  } catch {
    message.error(`Error occurred: Failed to ${method === "POST" ? "create" : "modify"} a post`);
  }
};

const requestPostDetail = async (postId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/${postId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to read a post");
    }

    const result: PostSchema = await response.json();
    const payload: PostPayload = JSON.parse(result.title);

    message.success("Successful post read");

    return payload;
  } catch {
    message.error("Error occurred: Failed to read a post");
  }
};

export { sendPostRequest, requestPostDetail };
