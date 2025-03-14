import { http, HttpResponse } from "msw";

const initialUserInfo = {
  studentId: "200211234",
  department: "컴퓨터공학과",
  name: "세종",
  grade: "4학년",
  email: "sejong123@sejong.ac.kr",
};

//유저 인포 직접 수정 안하고 새로운 객체를 반환
let userInfo = { ...initialUserInfo };

export const userHandlers = [
  //유저 정보 가져오기기
  http.get(`http://${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json({
      data: {
        user: userInfo,
      },
    });
  }),

  //이메일 수정 핸들러
  http.put(
    `http://${import.meta.env.VITE_API_URL}/users`,
    async ({ request }) => {
      const { email = "" } = (await request.json()) as { email?: string };

      if (!email) {
        return HttpResponse.json(
          { message: "이메일을 입력하세요." },
          { status: 400 }
        );
      }

      userInfo = { ...userInfo, email };

      return HttpResponse.json({
        message: "이메일이 업데이트되었습니다.",
        userInfo,
      });
    }
  ),
];
