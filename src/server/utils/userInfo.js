import jwt from "jsonwebtoken";

export const userInfo = (req, res) => {
  const token = req.headers.authorization;

  // 토큰이 없으면 401 상태 코드 반환
  if (!token) {
    return res.status(401).json({ message: "토큰이 필요합니다." });
  }

  // Bearer 뒤에 공백이 포함된 토큰을 처리
  const tokenWithoutBearer = token.split(" ")[1];

  // 토큰이 존재하지 않으면 401 상태 코드 반환
  if (!tokenWithoutBearer) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("JWT 인증 오류:", err);
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};
