import sql from "mssql";
import { serverConfig } from "./index.js";
import { authChecking } from "./utils/authChecking.js";

export const createGrade = async (req, res) => {
  authChecking(req, res);

  const { course_id, member_id, grade, score, feedback } = req.body;
  if (!course_id || !member_id || !grade || !score) {
    return res.status(400).json({ message: "필수 값 누락" });
  }

  try {
    const pool = await sql.connect(serverConfig);
    const insertQuery = `
        INSERT INTO dbo.강좌_성적 (course_id, member_id, grade, score, feedback)
        VALUES (@course_id, @member_id, @grade, @score, @feedback);
      `;
    await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .input("member_id", sql.BigInt, member_id)
      .input("grade", sql.NVarChar(10), grade)
      .input("score", sql.Decimal(5, 2), score)
      .input("feedback", sql.NVarChar, feedback)
      .query(insertQuery);

    res.status(201).json({ message: "성적이 성공적으로 추가되었습니다." });
  } catch (err) {
    internalErrorMessage(err, res, "성적 추가 오류");
  }
};

export const updateGradeById = async (req, res) => {
  authChecking(req, res); // 인증 확인

  const { course_id, member_id, grade, score, feedback } = req.body;

  if (!course_id || !member_id) {
    return res.status(400).json({ message: "필수 값 누락" });
  }

  try {
    const pool = await sql.connect(serverConfig);

    // 기존 데이터를 조회하여 필요한 값만 업데이트
    const existingQuery = `
        SELECT grade, score, feedback 
        FROM dbo.강좌_성적 
        WHERE course_id = @course_id AND member_id = @member_id
      `;
    const existingResult = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .input("member_id", sql.BigInt, member_id)
      .query(existingQuery);

    if (existingResult.recordset.length === 0) {
      return res.status(404).json({ message: "성적 정보를 찾을 수 없습니다." });
    }

    const existingData = existingResult.recordset[0];

    // 제공된 값만 업데이트하고, 없으면 기존 값을 유지
    const updateQuery = `
        UPDATE dbo.강좌_성적
        SET 
          grade = @grade, 
          score = @score, 
          feedback = @feedback
        WHERE course_id = @course_id AND member_id = @member_id
      `;

    await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .input("member_id", sql.BigInt, member_id)
      .input("grade", sql.NVarChar(10), grade || existingData.grade)
      .input("score", sql.Decimal(5, 2), score ?? existingData.score) // 0점도 허용해야 하므로 `??` 사용
      .input("feedback", sql.NVarChar, feedback ?? existingData.feedback)
      .query(updateQuery);

    res.status(200).json({ message: "성적이 성공적으로 업데이트되었습니다." });
  } catch (err) {
    internalErrorMessage(err, res, "성적 업데이트 오류");
  }
};

// 성적 조회 함수 (GET)
export const getGradesByCourse = async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) {
    return res.status(400).json({ message: "course_id가 필요합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    // 해당 강좌에 대한 모든 학생의 성적 조회
    const query = `
        SELECT s.member_id, s.member_name, g.grade, g.score, g.feedback
        FROM dbo.강좌_성적 g
        JOIN dbo.학생 s ON g.member_id = s.member_id
        WHERE g.course_id = @course_id
      `;
    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "성적이 존재하지 않습니다." });
    }

    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "성적 조회 오류");
  }
};
