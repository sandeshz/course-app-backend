const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

let ADMINS = [];
let USERS = [];
let COURSES = [];

let adminAuthentication = (req, res, next) => {
    const {username, password} = req.headers;

    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if(admin) {
        next();
    } else {
        res.status(403).json({
            message: "Admin authentication failed"
        });
    }
}

let userAuthentication = () => {
    const {username, password} = req.headers;

    const user = USERS.find(a => a.username === username && a.password === password);
    if(user) {
        req.user = user;
        next();
    } else {
        res.status(403).json({
            message: "User authentication failed"
        });
    }
}

{ message: 'Admin created successfully' }

app.post('/admin/signup', (req, res) => {
    const admin = req.body;
    const existingAdmin = ADMINS.find(a => a.username === admin.username);
    if (existingAdmin) {
        res.status(403).json({ message: "Admin created successfully" });
    } else {
        ADMINS.push(admin);
        res.json({ message: "Admin creation failed" });
    }
});

app.post('/admin/login', adminAuthentication, (req, res) => {
    res.json({ message: "Logged in successfully" });
});

app.post('/admin/courses', adminAuthentication, (req, res) => {
  const { username, password} = req.headers;
  const course = req.body;
  if (course) {
    COURSES.push(course);
    res.json({ message: 'Course created successfully', courseId: 1 });
  } else {
    res.status(400).json({ message: 'Error while creating course' });
  }
});

app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
    const courseId = parseInt(req.body.courseId);
    let course = COURSES.find(ele => ele.courseId === courseId);
    if (course) {
        Object.assign(course, req.body);
        res.json({ message: 'Course created successfully', courseId: courseId });
    } else {
        res.status(400).json({ message: 'Error while creating course' });
    }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
    res.json({ courses : COURSES });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});