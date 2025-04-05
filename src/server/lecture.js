import sql from "mssql";
import { serverConfig } from "./index.js";
import { internalErrorMessage } from "./common/errorMessage.js";
import { authChecking } from "./utils/authChecking.js";
import { userInfo } from "./utils/userInfo.js";
// 🔹 교수자 전용 강좌 생성 API
export const createLecture = async (req, res) => {
  try {
    const decoded = authChecking(req, res);

    const { title, img_url, student_names, major } = req.body; // 학생 이름 배열 추가

    if (!title) {
      return res.status(400).json({ message: "필수 값 누락" });
    }

    const pool = await sql.connect(serverConfig);

    // 동일한 제목의 강좌가 이미 있는지 확인
    const checkLectureQuery = `
          SELECT COUNT(*) AS count
          FROM dbo.강좌
          WHERE title = @title
        `;
    const checkResult = await pool
      .request()
      .input("title", sql.NVarChar(100), title)
      .query(checkLectureQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ message: "이미 존재하는 강좌입니다." });
    }

    // 교수자 ID를 교수자 토큰에서 가져옴
    const professor_id = decoded.userId;
    // 강좌 생성 (course_id 자동 생성)
    const result = await pool
      .request()
      .input("title", sql.NVarChar(100), title)
      .input("img_url", sql.NVarChar(255), img_url || null)
      .input("major", sql.NVarChar(100), major)
      .input("professor_id", sql.BigInt, professor_id) // professor_id 추가
      .query(`
                  INSERT INTO dbo.강좌 (title, img_url, professor_id, major)
                  VALUES (@title, @img_url, @professor_id, @major);
                  SELECT SCOPE_IDENTITY() AS course_id;
                `);

    const newCourseId = result.recordset[0].course_id;

    // 학생 이름으로 ID 조회 후 등록
    if (Array.isArray(student_names) && student_names.length > 0) {
      // 학생 이름에 대한 SQL 동적 쿼리 생성
      const namePlaceholders = student_names
        .map((_, i) => `@name${i}`)
        .join(", ");
      const request = pool.request();
      student_names.forEach((name, i) =>
        request.input(`name${i}`, sql.NVarChar(100), name)
      );

      // 학생 ID 조회 쿼리
      const studentQuery = `
                  SELECT member_id FROM dbo.학생 WHERE member_name IN (${namePlaceholders})
                `;
      const studentResult = await request.query(studentQuery);

      // 학생 ID가 반환된 경우에만 처리
      if (studentResult.recordset.length > 0) {
        // 강좌_학생 테이블에 등록할 쿼리
        const studentInsertQuery = `
                    INSERT INTO dbo.강좌_학생 (course_id, member_id)
                    VALUES ${studentResult.recordset
                      .map((_, i) => `(@course_id, @member${i})`)
                      .join(", ")}
                  `;

        // 강좌 ID와 학생 ID 바인딩
        request.input("course_id", sql.BigInt, newCourseId);
        studentResult.recordset.forEach((student, i) =>
          request.input(`member${i}`, sql.BigInt, student.member_id)
        );

        await request.query(studentInsertQuery);
      } else {
        return res.status(404).json({ message: "학생을 찾을 수 없습니다." });
      }
    }

    res.status(201).json({
      message: "강좌가 성공적으로 생성되었습니다.",
      course_id: newCourseId,
    });
  } catch (err) {
    internalErrorMessage(err, res, "강좌 생성 오류");
  }
};

//전체 강좌 조회
export const getAllCourses = async (req, res) => {
  try {
    const pool = await sql.connect(serverConfig);

    const result = await pool.query(`
        SELECT 
          k.course_id, 
          k.title, 
          k.img_url, 
          k.enrollment_date,
          p.professor_name
        FROM dbo.강좌 k
        LEFT JOIN dbo.교수자 p ON k.professor_id = p.professor_id
      `);

    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "강좌 조회 오류");
  }
};

// 🔹 특정 강좌 강의목록 조회 API
export const getLecturesByCourse = async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) {
    return res.status(400).json({ message: "course_id가 필요합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    const lecturesResult = await pool
      .request()
      .input("course_id", sql.BigInt, course_id).query(`
        SELECT 
          l.lecture_id, 
          l.course_id,  
          l.title AS lecture_title, 
          l.description AS lecture_description, 
          l.date AS lecture_date
        FROM dbo.강의 l
        WHERE l.course_id = @course_id
      `);

    const lectures = lecturesResult.recordset;

    for (const lecture of lectures) {
      const assignmentsResult = await pool
        .request()
        .input("lecture_id", sql.BigInt, lecture.lecture_id).query(`
          SELECT 
            a.assignment_id, 
            a.title, 
            a.description, 
            a.due_date, 
            a.created_at
          FROM dbo.과제 a
          WHERE a.lecture_id = @lecture_id
        `);

      lecture.assignments = assignmentsResult.recordset;
    }

    res.status(200).json(lectures);
  } catch (err) {
    internalErrorMessage(err, res, "강의 및 과제 목록 조회 오류");
  }
};
// 🔹 강좌에 강의 추가 API
export const addLectureToCourse = async (req, res) => {
  try {
    authChecking(req, res);

    const { course_id, title, description } = req.body;

    if (!course_id || !title || !description) {
      return res.status(400).json({ message: "필수 값 누락" });
    }

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

    // 강의 추가 (lecture_id 자동 생성)
    const addLectureQuery = `
          INSERT INTO 강의 (course_id, title, description, date)
          VALUES (@course_id, @title, @description, GETDATE());
          SELECT SCOPE_IDENTITY() AS lecture_id;
        `;
    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .input("title", sql.NVarChar(255), title)
      .input("description", sql.NVarChar(500), description)
      .query(addLectureQuery);

    const newLectureId = result.recordset[0].lecture_id;

    res.status(201).json({
      message: "강의가 성공적으로 추가되었습니다.",
      lecture_id: newLectureId,
    });
  } catch (err) {
    internalErrorMessage(err, res, "강의 추가 오류");
  }
};

// 🔹 강좌에 등록된 학생 조회 API
export const getStudentsByCourse = async (req, res) => {
  try {
    const { course_id } = req.query; // 강좌 ID를 URL 파라미터에서 받음

    if (!course_id) {
      return res.status(400).json({ message: "course_id가 필요합니다." });
    }

    const pool = await sql.connect(serverConfig);

    // 강좌에 등록된 학생들의 정보를 조회하는 쿼리
    const query = `
        SELECT s.member_id, s.member_name, s.nickname, s.email
        FROM dbo.강좌_학생 AS ks
        JOIN dbo.학생 AS s ON ks.member_id = s.member_id
        WHERE ks.course_id = @course_id
      `;

    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .query(query);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "이 강좌에 등록된 학생이 없습니다." });
    }

    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "학생 조회 오류");
  }
};

export const getMyCourses = async (req, res) => {
  const decoded = userInfo(req, res); // 사용자 정보 디코딩
  const userId = decoded.userId; // 사용자 ID
  const role = decoded.role; // 사용자 역할 (학생)

  // 학생만 접근 가능
  if (role !== "student") {
    return res.status(400).json({ message: "학생만 접근 가능합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    // 학생이 등록한 강좌 조회 쿼리
    const selectQuery = `
        SELECT 
          c.course_id, 
          c.title, 
          c.major, 
          c.img_url, 
          c.enrollment_date, 
          p.professor_name AS professor_name
        FROM dbo.강좌_학생 ks
        JOIN dbo.강좌 c ON ks.course_id = c.course_id
        JOIN dbo.교수자 p ON c.professor_id = p.professor_id
        WHERE ks.member_id = @userId
        ORDER BY c.enrollment_date DESC;
      `;

    // 강좌 조회 요청 실행
    const result = await pool
      .request()
      .input("userId", sql.BigInt, userId) // userId를 쿼리에 입력
      .query(selectQuery);

    // 강좌 목록 반환
    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "강좌 조회 오류");
  }
};
