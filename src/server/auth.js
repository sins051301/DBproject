import bcrypt from "bcrypt";
import sql from "mssql";
import { serverConfig } from "./index.js";
import jwt from "jsonwebtoken";
import { internalErrorMessage } from "./common/errorMessage.js";
// 학생 등록
export const signup = async (req, res) => {
  const { nickname, email, member_name, password } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await sql.connect(serverConfig);
    const result = await pool
      .request()
      .input("nickname", sql.NVarChar, nickname)
      .input("email", sql.NVarChar, email)
      .input("member_name", sql.NVarChar, member_name)
      .input("password", sql.NVarChar, hashedPassword)
      .query(
        "INSERT INTO dbo.학생 (nickname, email, member_name, password) VALUES (@nickname, @email, @member_name, @password)"
      );

    res.status(201).json({ message: "Student added", result });
  } catch (err) {
    internalErrorMessage(err, res, "로그인 오류");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect(serverConfig);

    // 학생을 먼저 찾기
    let result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM dbo.학생 WHERE email = @email");

    let user = result.recordset[0];
    let role = "student"; // 기본적으로 학생으로 설정

    // 학생이 없으면 교수자를 찾기
    if (!user) {
      result = await pool
        .request()
        .input("email", sql.NVarChar, email)
        .query("SELECT * FROM dbo.교수자 WHERE email = @email");

      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      user = result.recordset[0];
      console.log(user);
      role = "professor"; // 교수자일 경우 역할을 교수자로 설정
    }

    // 비밀번호 비교 (평문 비밀번호와 DB에 저장된 해시된 비밀번호 비교)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT 토큰 생성
    const payload = {
      userId: user.professor_id || user.member_id, // user id
      email: user.email,
      role: role, // 학생/교수자 역할
    };

    // JWT 토큰 발급
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    // 로그인 성공, 토큰과 사용자 정보 반환
    res.status(200).json({
      token, // 토큰을 클라이언트에 전달
    });
  } catch (err) {
    internalErrorMessage(err, res);
  }
};

export const registerProfessors = async (req, res) => {
  const { nickname, email, professor_name, password, department } = req.body;
  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL Server 연결
    const pool = await sql.connect(serverConfig);

    // 쿼리 실행
    const result = await pool
      .request()
      .input("nickname", sql.NVarChar, nickname)
      .input("email", sql.NVarChar, email)
      .input("professor_name", sql.NVarChar, professor_name)
      .input("password", sql.NVarChar, hashedPassword)
      .input("department", sql.NVarChar, department)
      .query(
        "INSERT INTO dbo.교수자 (nickname, email, professor_name, password, department) VALUES (@nickname, @email, @professor_name, @password, @department)"
      );

    res.status(201).json({ message: "Professor added", result });
  } catch (err) {
    internalErrorMessage(err, res, "교수 등록 오류");
  }
};
