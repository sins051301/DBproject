import sql from "mssql";
import { authChecking } from "./utils/authChecking.js";
import { serverConfig } from "./index.js";
import { internalErrorMessage } from "./common/errorMessage.js";

// 학습자료 생성 함수
export const createLearningMaterial = async (req, res) => {
  authChecking(req, res);
  const { title, imgUrl, course_id, description } = req.body;

  if (!title || !imgUrl || !course_id) {
    return res
      .status(400)
      .json({ message: "제목, 이미지 URL, 강좌 ID는 필수 입력 값입니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    const query = `
        INSERT INTO dbo.학습자료 (title, imgUrl, description, course_id)
        VALUES (@title, @imgUrl, @description, @course_id);
        SELECT SCOPE_IDENTITY() AS material_id;  -- 추가된 학습자료의 material_id를 반환
      `;

    const result = await pool
      .request()
      .input("title", sql.NVarChar(50), title)
      .input("imgUrl", sql.NVarChar(255), imgUrl)
      .input("description", sql.NVarChar, description) // description 추가
      .input("course_id", sql.BigInt, course_id)
      .query(query);

    const materialId = result.recordset[0].material_id;

    res.status(201).json({
      message: "학습자료가 성공적으로 추가되었습니다.",
      material_id: materialId,
    });
  } catch (err) {
    internalErrorMessage(err, res, "학습자료 추가 오류");
  }
};

// 강좌에 따른 학습자료 조회 함수
export const getLearningMaterialsByCourse = async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) {
    return res.status(400).json({ message: "course_id가 필요합니다." });
  }

  try {
    const pool = await sql.connect(serverConfig);

    const query = `
        SELECT material_id, title, imgUrl, description, uploaded_date
        FROM dbo.학습자료
        WHERE course_id = @course_id
      `;

    const result = await pool
      .request()
      .input("course_id", sql.BigInt, course_id)
      .query(query);

    res.status(200).json(result.recordset);
  } catch (err) {
    internalErrorMessage(err, res, "학습자료 조회 오류");
  }
};
