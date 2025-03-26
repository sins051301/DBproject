import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sql from "mssql";
import { signup, login, registerProfessors } from "./auth.js";
import {
  addLectureToCourse,
  createLecture,
  getAllCourses,
  getLecturesByCourse,
  getMyCourses,
  getStudentsByCourse,
} from "./lecture.js";
import {
  addAnnouncement,
  deleteAnnouncement,
  getAnnouncementsByCourse,
} from "./announce.js";
import { addAssignment, getAssignmentsByLecture } from "./assignment.js";
import {
  createLearningMaterial,
  getLearningMaterialsByCourse,
} from "./material.js";
import { createGrade, getGradesByCourse, updateGradeById } from "./grade.js";
import { createSyllabus, getSyllabus } from "./syllabus.js";
import { getCourseComments, postComment } from "./comment.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true })); // parsing query string
app.use(express.json()); // parsing request json
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend address
    credentials: true, // Enable credentials
  })
);

export const serverConfig = {
  user: "user1",
  password: "1004",
  server: "BOOK-5HR9JVVJP0",
  database: "TutorialDB",
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 1433,
};

sql.connect(serverConfig, function (err) {
  if (err) {
    return console.error(`error : ${err}`);
  }
  console.log(`MSSQL 연결 완료`);
});

//auth 관련
app.post("/auth/signup", signup);
app.post("/auth/login", login);

//강의 관련
app.post("/auth/professors", registerProfessors);
app.get("/course/lecture", getLecturesByCourse);
app.post("/course", createLecture);
app.post("/course/lecture", addLectureToCourse);
app.get("/course", getAllCourses);
app.get("/course/students", getStudentsByCourse);
app.get("/course/my", getMyCourses);

//공지사항 관련
app.get("/announce", getAnnouncementsByCourse);
app.post("/announce", addAnnouncement);
app.delete("/announce", deleteAnnouncement);

//과제 관련
app.post("/assignment", addAssignment);
app.get("/assignment", getAssignmentsByLecture);

//자료 관련
app.get("/material", getLearningMaterialsByCourse);
app.post("/material", createLearningMaterial);

//성적 관련
app.get("/grade", getGradesByCourse);
app.post("/grade", createGrade);
app.patch("/grade", updateGradeById);

//계획서 관련
app.get("/syllabus", getSyllabus);
app.post("/syllabus", createSyllabus);

//댓글 관련
app.post("/comment", postComment);
app.get("/comment", getCourseComments);

app.listen(3000, async () => {
  console.log(`Server running on port 3000`);
});
