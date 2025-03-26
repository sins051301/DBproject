import { internalErrorMessage } from "./common/errorMessage.js";
import sql from "mssql";
import { serverConfig } from "./index.js";
import { authChecking } from "./utils/authChecking.js";

export const addAnnouncement = async (req, res) => {
  authChecking(req, res);
  const { course_id, title, content } = req.body;

  if (!course_id || !title || !content) {
    return res.status(400).json({ message: "필수 값 누락" });
  }

  try {
    const pool = await sql.connect(serverConfig);

    // 강좌가 존재하는지 확인
    const checkCourseQuery = `
        SELECT COUNT(*) AS count
        FROM dbo.강좌
        WHERE course_id = @course_id
      `;
    const checkResult = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .query(checkCourseQuery);

    if (checkResult.recordset[0].count === 0) {
      return res.status(404).json({ message: "존재하지 않는 강좌입니다." });
    }

    // 공지사항 추가
    const addAnnouncementQuery = `
        INSERT INTO 공지사항 (course_id, title, content)
        VALUES (@course_id, @title, @content);
        SELECT SCOPE_IDENTITY() AS announcement_id;
      `;
    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .input("title", sql.NVarChar(100), title)
      .input("content", sql.NVarChar, content)
      .query(addAnnouncementQuery);

    const newAnnouncementId = result.recordset[0].announcement_id;

    res.status(201).json({
      message: "공지사항이 성공적으로 추가되었습니다.",
      announcement_id: newAnnouncementId,
    });
  } catch (err) {
    internalErrorMessage(err, res, "공지사항 추가 오류");
  }
};

export const deleteAnnouncement = async (req, res) => {
  authChecking(req, res); // 권한 확인

  const { announcement_id } = req.query; // URL 파라미터로 공지사항 ID 받기

  if (!announcement_id) {
    return res.status(400).json({ message: "공지사항 ID가 필요합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    // 공지사항이 존재하는지 확인
    const checkAnnouncementQuery = `
        SELECT COUNT(*) AS count
        FROM dbo.공지사항
        WHERE announcement_id = @announcement_id
      `;
    const checkResult = await pool
      .request()
      .input("announcement_id", sql.BigInt, announcement_id)
      .query(checkAnnouncementQuery);

    if (checkResult.recordset[0].count === 0) {
      return res.status(404).json({ message: "존재하지 않는 공지사항입니다." });
    }

    // 공지사항 삭제
    const deleteAnnouncementQuery = `
        DELETE FROM dbo.공지사항
        WHERE announcement_id = @announcement_id;
      `;
    await pool
      .request()
      .input("announcement_id", sql.BigInt, announcement_id)
      .query(deleteAnnouncementQuery);

    res.status(200).json({
      message: "공지사항이 성공적으로 삭제되었습니다.",
    });
  } catch (err) {
    internalErrorMessage(err, res, "공지사항 삭제 오류");
  }
};

export const getAnnouncementsByCourse = async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) {
    return res.status(400).json({ message: "course_id가 필요합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id).query(`
          SELECT 
            a.announcement_id, 
            a.course_id, 
            a.title, 
            a.created_at, 
            a.content, 
            c.title AS course_title
          FROM dbo.공지사항 a
          LEFT JOIN dbo.강좌 c ON a.course_id = c.course_id
          WHERE a.course_id = @course_id
          ORDER BY a.created_at DESC
        `);

    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "공지사항 조회 오류");
  }
};
