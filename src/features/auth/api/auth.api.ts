import axios, { AxiosResponse } from "axios";
import { useAuthStore } from "../store/useAuthStore";

interface AuthResponse {
  token: string;
}

interface UserLoginType {
  email: string;
  password: string;
}

const apiUsers = axios.create({
  baseURL: "http://localhost:3000/",
});

export const saveAuthTokens = async (
  credentials: UserLoginType
): Promise<void> => {
  try {
    const response: AxiosResponse<AuthResponse> = await apiUsers.post(
      `/auth/login`,
      credentials
    );
    const { token } = response.data;

    useAuthStore.getState().setToken(token); // ✅ 이렇게 직접 접근
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("로그인 실패!");
      throw new Error("로그인 실패");
    }

    alert("unknown Error!");
    throw new Error("알 수 없는 오류 발생");
  }
};
