import { PostPayload, PostSchema } from "./type";
import { SERVER_URL } from "./config";

type Options = {
  url: string;
  method: "POST" | "PUT";
  payload: PostPayload;
  jwtToken: string;
  additionalData?: Record<string, string>;
};

const sendPostRequest = async ({
  jwtToken,
  method,
  payload,
  url,
  additionalData,
}: Options): Promise<string> => {
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
      throw new PostRequestError(`Failed to ${method === "POST" ? "create" : "modify"} a post`);
    }

    const result = await response.json();

    if (!result.author._id) {
      throw new PostRequestError("Error occurred: userId does not exist.");
    }

    return result.author._id;
  } catch {
    throw new PostRequestError(
      `Error occurred: Failed to ${method === "POST" ? "create" : "modify"} a post`
    );
  }
};

type PostDetailResponse = {
  payload: PostPayload | null;
  reason: string;
};

const requestPostDetail = async (postId: string): Promise<PostDetailResponse> => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/${postId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new PostRequestError("Failed to load post information.");
    }

    const result: PostSchema = await response.json();
    const payload: PostPayload = JSON.parse(result.title);

    return {
      payload,
      reason: "Successfully loaded.",
    };
  } catch (error) {
    throw new PostRequestError((error as Error).message);
  }
};

export class PostRequestError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "PostRequestError";
    this.message = reason;
  }
}

export { sendPostRequest, requestPostDetail };
