import { authChecking } from "./utils/authChecking.js";
import { serverConfig } from "./index.js";
import { internalErrorMessage } from "./common/errorMessage.js";
import sql from "mssql";
export const createSyllabus = async (req, res) => {
  try {
    const decoded = authChecking(req, res); // 교수자 인증

    const { course_id, description, objectives, schedule, grading_policy } =
      req.body;

    if (
      !course_id ||
      !description ||
      !objectives ||
      !schedule ||
      !grading_policy
    ) {
      return res.status(400).json({ message: "필수 값 누락" });
    }

    const pool = await sql.connect(serverConfig);

    // 강좌 존재 여부 확인
    const checkCourseQuery = `
        SELECT COUNT(*) AS count FROM dbo.강좌 WHERE course_id = @course_id
      `;
    const checkResult = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .query(checkCourseQuery);

    if (checkResult.recordset[0].count === 0) {
      return res.status(404).json({ message: "강좌를 찾을 수 없습니다." });
    }

    // 강의 계획서 저장
    const insertQuery = `
        INSERT INTO dbo.강좌_계획서 (course_id, professor_id, description, objectives, schedule, grading_policy)
        VALUES (@course_id, @professor_id, @description, @objectives, @schedule, @grading_policy);
      `;

    await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .input("professor_id", sql.BigInt, decoded.userId)
      .input("description", sql.NVarChar, description)
      .input("objectives", sql.NVarChar, objectives)
      .input("schedule", sql.NVarChar, schedule)
      .input("grading_policy", sql.NVarChar, grading_policy)
      .query(insertQuery);

    res
      .status(201)
      .json({ message: "강의 계획서가 성공적으로 생성되었습니다." });
  } catch (err) {
    internalErrorMessage(err, res, "강의 계획서 생성 오류");
  }
};

export const getSyllabus = async (req, res) => {
  try {
    const { course_id } = req.query;

    if (!course_id) {
      return res.status(400).json({ message: "강좌 ID가 필요합니다." });
    }

    const pool = await sql.connect(serverConfig);

    // 강의 계획서 조회
    const query = `
        SELECT * FROM dbo.강좌_계획서 WHERE course_id = @course_id;
      `;

    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .query(query);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "강의 계획서를 찾을 수 없습니다." });
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    internalErrorMessage(err, res, "강의 계획서 조회 오류");
  }
};
