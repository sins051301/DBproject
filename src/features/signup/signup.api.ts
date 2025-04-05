import axios from "axios";

interface UserSignUpType {
  email: string;
  password: string;
  nickname: string;
  member_name: string;
}

const apiUsers = axios.create({
  baseURL: "http://localhost:3000/",
});

export const signUpRequest = async (
  credentials: UserSignUpType
): Promise<void> => {
  try {
    await apiUsers.post(`/auth/signup`, credentials);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("회원가입 실패!");
      throw new Error("로그인 실패");
    }

    alert("unknown Error!");
    throw new Error("알 수 없는 오류 발생");
  }
};
