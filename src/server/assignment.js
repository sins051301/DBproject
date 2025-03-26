import sql from "mssql";
import { serverConfig } from "./index.js";
import { authChecking } from "./utils/authChecking.js";
import { internalErrorMessage } from "./common/errorMessage.js";

export const addAssignment = async (req, res) => {
  authChecking(req, res);
  const { title, description, due_date, lecture_id } = req.body;

  if (!title || !due_date || !lecture_id) {
    return res.status(400).json({ message: "필수 값 누락" });
  }

  try {
    const pool = await sql.connect(serverConfig);

    // 강의가 존재하는지 확인
    const checkLectureQuery = `
      SELECT COUNT(*) AS count
      FROM dbo.강의
      WHERE lecture_id = @lecture_id
    `;
    const checkResult = await pool
      .request()
      .input("lecture_id", sql.BigInt, lecture_id)
      .query(checkLectureQuery);

    if (checkResult.recordset[0].count === 0) {
      return res.status(404).json({ message: "존재하지 않는 강의입니다." });
    }

    // 과제 추가
    const addAssignmentQuery = `
      INSERT INTO dbo.과제 (title, description, due_date, lecture_id)
      VALUES (@title, @description, @due_date, @lecture_id);
      SELECT SCOPE_IDENTITY() AS assignment_id;
    `;
    const result = await pool
      .request()
      .input("title", sql.NVarChar(100), title)
      .input("description", sql.Text, description)
      .input("due_date", sql.DateTime, due_date)
      .input("lecture_id", sql.BigInt, lecture_id)
      .query(addAssignmentQuery);

    const newAssignmentId = result.recordset[0].assignment_id;

    res.status(201).json({
      message: "과제가 성공적으로 추가되었습니다.",
      assignment_id: newAssignmentId,
    });
  } catch (err) {
    internalErrorMessage(err, res, "과제 생성 오류....");
  }
};

export const getAssignmentsByLecture = async (req, res) => {
  const { lecture_id } = req.query;

  if (!lecture_id) {
    return res.status(400).json({ message: "lecture_id가 필요합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    const result = await pool
      .request()
      .input("lecture_id", sql.BigInt, lecture_id).query(`
        SELECT 
          a.assignment_id, 
          a.title, 
          a.description, 
          a.due_date, 
          a.created_at
        FROM dbo.과제 a
        WHERE a.lecture_id = @lecture_id
      `);

    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "과제 조회 오류");
  }
};

