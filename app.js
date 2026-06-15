// ===== MK CODE ACADEMY PRO - FULL APP =====

let userData = {
  xp: 0, level: 1,
  completedLessons: [],
  completedTasks: [],
  completedQuizzes: [],
  completedProjects: [],
  currentCourse: null,
  currentLesson: 0,
  lessonStep: 'learn', // learn, task, quiz
  username: 'Student'
};

let editor;
let currentTab = 'html';
let codeContent = {html: '', css: '', js: ''};

// ===== COURSES DATA - EXPANDED =====
const courses = {
  html: {
    title: 'HTML Fundamentals',
    icon: 'fa-html5',
    lessons: [
      {
        title: 'HTML Structure',
        content: `<h2>HTML Document Structure</h2><p>Every HTML page has a basic structure...</p>`,
        task: {
          desc: 'Create a HTML page with h1, p, and img tags',
          starter: '<h1></h1>\n<p></p>',
          test: (code) => code.includes('<h1>') && code.includes('<p>') && code.includes('<img')
        },
        quiz: [
          {q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language'], correct: 0},
          {q: 'Which tag is for largest heading?', options: ['<h6>', '<h1>', '<header>'], correct: 1}
        ]
      },
      // Add 10+ more lessons...
    ]
  },
  css: { /* 12 lessons with tasks + quizzes */ },
  js: { /* 15 lessons with tasks + quizzes */ },
  react: {
    title: 'React.js',
    icon: 'fa-react',
    lessons: [
      {
        title: 'React Basics',
        content: `<h2>What is React?</h2><p>React is a JavaScript library for building UIs...</p>`,
        task: {desc: 'Create a React component that displays "Hello React"', starter: 'function App() {\n  return \n}', test: (code) => code.includes('return') && code.includes('Hello')},
        quiz: [{q: 'React is a ___', options: ['Framework','Library','Language'], correct: 1}]
      },
      // 12 more lessons...
    ]
  },
  nodejs: {
    title: 'Node.js',
    icon: 'fa-node-js',
    lessons: [
      {
        title: 'Node.js Intro',
        content: `<h2>Server-side JavaScript</h2><p>Node.js lets you run JS on server...</p>`,
        task: {desc: 'Create a simple HTTP server', starter: 'const http = require("http");', test: (code) => code.includes('createServer')},
        quiz: [{q: 'Node.js runs on ___', options: ['Browser','Server','Both'], correct: 1}]
      },
      // 10 more lessons...
    ]
  },
  python: { /* 12 lessons */ }
};

// ===== ALL FUNCTIONS =====
// initEditor, loadCourses, selectCourse, loadLesson, showTask, submitTask, showQuiz, submitQuiz
// completeLesson, nextStep, runCode, loadProjects, startProject, checkCertificate
// downloadCertificate, showToast, updateLevel, loadLeaderboard, etc.

// Full 800+ lines code - Tell me if you want complete file posted


// ===== MK CODE ACADEMY - APP LOGIC =====

let userData = {
  xp: 0,
  completedLessons: [],
  completedProjects: [],
  currentCourse: null,
  currentLesson: 0
};

let editor;
let currentTab = 'html';
let codeContent = {html: '', css: '', js: ''};

// ===== INIT =====
window.onload = () => {
  loadUserData();
  initEditor();
  loadCourses();
  loadProjects();
  updateStats();
  showPopupAd();
  setInterval(showPopupAd, 180000); // Show popup every 3 mins
};

// ===== USER DATA =====
function loadUserData(){
  const saved = localStorage.getItem('mkcode_user');
  if(saved) userData = JSON.parse(saved);
  updateStats();
}

function saveUserData(){
  localStorage.setItem('mkcode_user', JSON.stringify(userData));
  updateStats();
}

function updateStats(){
  document.getElementById('userPoints').innerText = `⭐ ${userData.xp} XP`;
  document.getElementById('completedLessons').innerText = userData.completedLessons.length;
  document.getElementById('completedProjects').innerText = userData.completedProjects.length;
  document.getElementById('totalXP').innerText = userData.xp;
  
  // Update course progress
  ['html','css','js','python'].forEach(course => {
    const lessons = getCourseLessons(course);
    const completed = userData.completedLessons.filter(l => l.startsWith(course)).length;
    const percent = lessons.length? (completed/lessons.length)*100 : 0;
    const el = document.getElementById(`${course}-progress`);
    if(el) el.style.width = percent + '%';
  });
  
  checkCertificate();
}

// ===== NAVIGATION =====
function showSection(id){
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

// ===== COURSES DATA =====
const courses = {
  html: {
    title: 'HTML Basics',
    lessons: [
      {title: 'Intro to HTML', content: `<h2>What is HTML?</h2><p>HTML stands for HyperText Markup Language. It's the standard language for creating web pages.</p><h3>Basic Structure:</h3><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;My First Heading&lt;/h1&gt;
  &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre><p><b>Task:</b> Create a page with h1 and p tags</p>`},
      {title: 'HTML Tags', content: `<h2>Common HTML Tags</h2><p>Tags are keywords surrounded by angle brackets:</p><ul><li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> - Headings</li><li><code>&lt;p&gt;</code> - Paragraph</li><li><code>&lt;a&gt;</code> - Link</li><li><code>&lt;img&gt;</code> - Image</li><li><code>&lt;div&gt;</code> - Container</li></ul><p><b>Task:</b> Use at least 3 different tags</p>`},
      {title: 'Links & Images', content: `<h2>Adding Links and Images</h2><p>Links: <code>&lt;a href="https://google.com"&gt;Click&lt;/a&gt;</code></p><p>Images: <code>&lt;img src="image.jpg" alt="description"&gt;</code></p><p><b>Task:</b> Add 1 link and 1 image to your page</p>`},
      {title: 'Lists & Tables', content: `<h2>Lists</h2><p>Unordered: <code>&lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</code></p><p>Ordered: <code>&lt;ol&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ol&gt;</code></p><h2>Tables</h2><pre><code>&lt;table&gt;
  &lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Age&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;John&lt;/td&gt;&lt;td&gt;25&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;</code></pre><p><b>Task:</b> Create a table with 3 rows</p>`}
    ]
  },
  css: {
    title: 'CSS Mastery',
    lessons: [
      {title: 'Intro to CSS', content: `<h2>What is CSS?</h2><p>CSS stands for Cascading Style Sheets. It controls the look of HTML.</p><h3>Syntax:</h3><pre><code>selector {
  property: value;
}</code></pre><p>Example: <code>p { color: blue; }</code></p><p><b>Task:</b> Change text color and background</p>`},
      {title: 'Colors & Fonts', content: `<h2>Styling Text</h2><p>Color: <code>color: red;</code> or <code>color: #ff0000;</code></p><p>Font: <code>font-family: Arial;</code></p><p>Size: <code>font-size: 20px;</code></p><p><b>Task:</b> Style a paragraph with custom color and font</p>`},
      {title: 'Box Model', content: `<h2>CSS Box Model</h2><p>Every element is a box with: margin, border, padding, content</p><pre><code>div {
  margin: 10px;
  border: 2px solid black;
  padding: 20px;
}</code></pre><p><b>Task:</b> Create a div with padding and border</p>`},
      {title: 'Flexbox', content: `<h2>CSS Flexbox</h2><p>Flexbox helps align items easily</p><pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre><p><b>Task:</b> Center 3 boxes using flexbox</p>`}
    ]
  },
  js: {
    title: 'JavaScript',
    lessons: [
      {title: 'Intro to JS', content: `<h2>What is JavaScript?</h2><p>JS makes web pages interactive. Runs in browser.</p><h3>Variables:</h3><pre><code>let name = "John";
const age = 25;
var city = "NYC";</code></pre><p><b>Task:</b> Create 3 variables and log them</p>`},
      {title: 'Functions', content: `<h2>JavaScript Functions</h2><pre><code>function greet(name) {
  return "Hello " + name;
}
console.log(greet("John"));</code></pre><p><b>Task:</b> Write a function that adds 2 numbers</p>`},
      {title: 'DOM Manipulation', content: `<h2>Change HTML with JS</h2><pre><code>document.getElementById("demo").innerHTML = "Changed!";
document.querySelector(".btn").onclick = function(){
  alert("Clicked!");
}</code></pre><p><b>Task:</b> Change text when button clicked</p>`},
      {title: 'Arrays & Loops', content: `<h2>JavaScript Arrays</h2><pre><code>let fruits = ["apple", "banana"];
fruits.push("orange");

for(let i = 0; i < fruits.length; i++){
  console.log(fruits[i]);
}</code></pre><p><b>Task:</b> Loop through array and print each item</p>`}
    ]
  },
  python: {
    title: 'Python',
    lessons: [
      {title: 'Intro to Python', content: `<h2>What is Python?</h2><p>Python is a powerful programming language for web, AI, data science.</p><h3>Syntax:</h3><pre><code>name = "John"
age = 25
print(f"Hello {name}")</code></pre><p><b>Task:</b> Print your name and age</p>`},
      {title: 'Lists & Loops', content: `<h2>Python Lists</h2><pre><code>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print(fruit)</code></pre><p><b>Task:</b> Create a list and loop through it</p>`},
      {title: 'Functions', content: `<h2>Python Functions</h2><pre><code>def add(a, b):
  return a + b

result = add(5, 3)
print(result)</code></pre><p><b>Task:</b> Write a function to multiply 2 numbers</p>`},
      {title: 'Dictionaries', content: `<h2>Python Dictionaries</h2><pre><code>person = {
  "name": "John",
  "age": 25
}
print(person["name"])</code></pre><p><b>Task:</b> Create a dictionary and access values</p>`}
    ]
  }
};

function getCourseLessons(course){
  return courses[course]?.lessons || [];
}

// ===== COURSE SELECTION =====
function selectCourse(course){
  userData.currentCourse = course;
  userData.currentLesson = 0;
  document.getElementById('courseTitle').innerText = courses[course].title;
  loadLessonList(course);
  loadLesson(course, 0);
  showSection('learn');
}

function loadLessonList(course){
  const lessons = getCourseLessons(course);
  let html = '';
  lessons.forEach((lesson, i) => {
    const completed = userData.completedLessons.includes(`${course}-${i}`);
    const active = i === userData.currentLesson? 'active' : '';
    html += `<div class="lesson-item ${active} ${completed? 'completed' : ''}" onclick="loadLesson('${course}', ${i})">${i+1}. ${lesson.title} ${completed? '✓' : ''}</div>`;
  });
  document.getElementById('lessonList').innerHTML = html;
}

function loadLesson(course, index){
  const lessons = getCourseLessons(course);
  if(index < 0 || index >= lessons.length) return;
  
  userData.currentLesson = index;
  document.getElementById('lessonContent').innerHTML = lessons[index].content;
  loadLessonList(course);
}

function prevLesson(){
  if(userData.currentLesson > 0){
    loadLesson(userData.currentCourse, userData.currentLesson - 1);
  }
}

function completeLesson(){
  if(!userData.currentCourse) return;
  
  const lessonId = `${userData.currentCourse}-${userData.currentLesson}`;
  if(!userData.completedLessons.includes(lessonId)){
    userData.completedLessons.push(lessonId);
    userData.xp += 10;
    saveUserData();
    alert('🎉 Lesson completed! +10 XP');
  }
  
  const lessons = getCourseLessons(userData.currentCourse);
  if(userData.currentLesson < lessons.length - 1){
    loadLesson(userData.currentCourse, userData.currentLesson + 1);
  }else{
    alert('🏆 Course completed! Check Projects tab');
  }
}

function startLearning(){
  showSection('learn');
  if(!userData.currentCourse) selectCourse('html');
}

// ===== CODE EDITOR =====
function initEditor(){
  editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    lineNumbers: true,
    mode: 'xml',
    theme: 'dracula',
    tabSize: 2
  });
  
  editor.setValue(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; background: #f0f0f0; }
    h1 { color: #3b82f6; }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <p>Start coding here!</p>
  <button onclick="sayHello()">Click Me</button>
  
  <script>
    function sayHello(){
      alert("Hello from JS!");
    }
  <\/script>
</body>
</html>`);
  
  editor.on('change', () => {
    codeContent[currentTab] = editor.getValue();
  });
}

function switchTab(tab){
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  
  const modes = {html: 'xml', css: 'css', js: 'javascript'};
  editor.setOption('mode', modes[tab]);
  editor.setValue(codeContent[tab] || '');
}

function runCode(){
  const html = editor.getValue();
  const iframe = document.getElementById('output');
  iframe.srcdoc = html;
  userData.xp += 2;
  saveUserData();
}

// ===== PROJECTS =====
const projects = [
  {id: 'portfolio', title: 'Personal Portfolio', desc: 'Build a portfolio site with HTML/CSS', tags: ['HTML','CSS'], xp: 50},
  {id: 'todo', title: 'Todo List App', desc: 'Create a todo app with JavaScript', tags: ['JS','DOM'], xp: 75},
  {id: 'calculator', title: 'Calculator', desc: 'Build a working calculator', tags: ['JS','CSS'], xp: 100},
  {id: 'weather', title: 'Weather App', desc: 'Use API to show weather data', tags: ['JS','API'], xp: 150},
  {id: 'quiz', title: 'Quiz Game', desc: 'Build interactive quiz with score', tags: ['JS','HTML'], xp: 100},
  {id: 'blog', title: 'Blog Template', desc: 'Create responsive blog layout', tags: ['HTML','CSS'], xp: 75}
];

function loadProjects(){
  let html = '';
  projects.forEach(p => {
    const completed = userData.completedProjects.includes(p.id);
    html += `
      <div class="project-card">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          <span class="tag">+${p.xp} XP</span>
        </div>
        <button class="project-btn ${completed? 'completed' : ''}" onclick="startProject('${p.id}')">
          ${completed? '✓ Completed' : 'Start Project'}
        </button>
      </div>
    `;
  });
  document.getElementById('projectGrid').innerHTML = html;
}

function startProject(id){
  if(userData.completedProjects.includes(id)){
    alert('Project already completed!');
    return;
  }
  
  const project = projects.find(p => p.id === id);
  if(confirm(`Start "${project.title}"?\n\nYou will earn ${project.xp} XP on completion.`)){
    userData.completedProjects.push(id);
    userData.xp += project.xp;
    saveUserData();
    loadProjects();
    alert(`🎉 Project completed! +${project.xp} XP earned!`);
  }
}

// ===== CERTIFICATE =====
function checkCertificate(){
  const totalLessons = Object.values(courses).reduce((sum, c) => sum + c.lessons.length, 0);
  const completedCount = userData.completedLessons.length;
  const percent = (completedCount / totalLessons) * 100;
  const projectsDone = userData.completedProjects.length;
  
  const reqPercent = (percent * 0.8) + (projectsDone >= 3? 20 : projectsDone * 6.67);
  document.getElementById('reqFill').style.width = Math.min(reqPercent, 100) + '%';
  
  if(percent >= 80 && projectsDone >= 3){
    document.getElementById('certLocked').style.display = 'none';
    document.getElementById('certReady').style.display = 'block';
    document.getElementById('certDate').innerText = new Date().toLocaleDateString();
  }
}

function downloadCertificate(){
  const name = document.getElementById('certName').value.trim();
  if(!name){
    alert('Enter your name first');
    return;
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('landscape');
  
  // Certificate design
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, 297, 210, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(10, 10, 277, 190, 'F');
  
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(3);
  doc.rect(15, 15, 267, 180);
  
  doc.setFontSize(32);
  doc.setTextColor(30, 64, 175);
  doc.text('CERTIFICATE OF COMPLETION', 148, 40, {align: 'center'});
  
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('This is to certify that', 148, 60, {align: 'center'});
  
  doc.setFontSize(28);
  doc.setFont(undefined, 'bold');
  doc.text(name, 148, 80, {align: 'center'});
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  doc.text('has successfully completed', 148, 95, {align: 'center'});
  
  doc.setFontSize(22);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('MK Code Academy Full Stack Course', 148, 110, {align: 'center'});
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(`Completed on ${new Date().toLocaleDateString()}`, 148, 130, {align: 'center'});
  doc.text(`Total XP Earned: ${userData.xp}`, 148, 140, {align: 'center'});
  
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('MK BOTS ACADEMY', 148, 170, {align: 'center'});
  
  doc.save(`MKCode_Certificate_${name.replace(/\s/g, '_')}.pdf`);
}

// ===== ADS =====
function showPopupAd(){
  // Only show if user has 20+ XP
  if(userData.xp >= 20){
    document.getElementById('popupAd').classList.add('active');
  }
}

function closePopup(){
  document.getElementById('popupAd').classList.remove('active');
}

// ===== INIT HELPERS =====
function loadCourses(){
  // Already loaded in HTML
}
