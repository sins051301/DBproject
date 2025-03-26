import { serverConfig } from "./index.js";
import sql from "mssql";
import { internalErrorMessage } from "./common/errorMessage.js";
import { userInfo } from "./utils/userInfo.js";

export const postComment = async (req, res) => {
  const decoded = userInfo(req, res);
  if (decoded.role === "professor") {
    return res.status(401).json({ message: "교수는 불가능합니다." });
  }
  const userId = decoded.userId;
  const { course_id, comment_text } = req.body;

  // 필수 값 검증
  if (!course_id || !comment_text) {
    return res.status(400).json({ message: "필수 값 누락" });
  }

  try {
    const pool = await sql.connect(serverConfig);

    // 학생인지 확인
    const checkStudentQuery = `
        SELECT COUNT(*) AS count
        FROM dbo.학생
        WHERE member_id = @talker_id;
      `;
    const checkStudentResult = await pool
      .request()
      .input("talker_id", sql.BigInt, userId)
      .query(checkStudentQuery);

    if (checkStudentResult.recordset[0].count === 0) {
      return res.status(404).json({ message: "학생을 찾을 수 없습니다." });
    }

    // 댓글 추가 쿼리
    const insertCommentQuery = `
        INSERT INTO dbo.강좌_댓글 (course_id, member_id, comment_text)
        VALUES (@course_id, @talker_id, @comment_text);
      `;

    await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .input("comment_text", sql.NVarChar, comment_text)
      .input("talker_id", sql.BigInt, userId)
      .query(insertCommentQuery);

    res.status(201).json({ message: "댓글이 성공적으로 추가되었습니다." });
  } catch (err) {
    internalErrorMessage(err, res, "댓글 추가 오류");
  }
};


export const getCourseComments = async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) {
    return res.status(400).json({ message: "course_id가 필요합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    const selectQuery = `
          SELECT 
            c.comment_id, 
            c.comment_text, 
            c.created_at, 
            s.member_id, 
            s.member_name AS author  -- 학생 이름만 포함
          FROM dbo.강좌_댓글 c
          JOIN dbo.학생 s ON c.member_id = s.member_id  -- 학생 테이블을 JOIN
          WHERE c.course_id = @course_id
          ORDER BY c.created_at DESC;
        `;

    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .query(selectQuery);

    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "댓글 조회 오류");
  }
};
