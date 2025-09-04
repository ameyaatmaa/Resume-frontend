

````
# Resume Matcher Frontend

A **modern React frontend** for the Resume Matcher app that allows users to upload resumes and get job match suggestions based on extracted resume sections. Features a **dark theme** with **animated gradient background**, clean **UI/UX**, and interactive **match score bars** and **role badges**.  

---

## Features

- Upload `.pdf` and `.docx` resumes  
- Automatically generate a **unique user ID** for each upload  
- Extracted resume sections displayed neatly (e.g., Skills, Education, Projects)  
- Job match score displayed as a **dynamic progress bar**  
- Suggested roles displayed as **interactive badges**  
- Fully responsive **dark-themed design** with smooth hover effects  
- Animated gradient background for a modern look  

---

## Screenshots

### Upload Page
![Upload Page](https://i.postimg.cc/qMgB0DLT/Screenshot-from-2025-09-04-22-55-03.png)

### Result Page
![Result Page](https://i.postimg.cc/rpGMgB8S/Screenshot-2025-09-04-at-22-56-44-React-App.png)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/resume-matcher-frontend.git
cd resume-matcher-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

> Make sure the backend API is running at `http://localhost:8084` or update the fetch URLs in `ResumeUploader.js` accordingly.

---

## Folder Structure

```
resume-matcher-frontend/
├── public/
├── src/
│   ├── ResumeUploader.js
│   ├── ResumeUploader.css
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

---

## Technologies Used

* React 18
* HTML5 & CSS3
* Flexbox & Grid for responsive layouts
* Modern JavaScript (ES6+)

---

## Usage

1. Select a resume file (`.pdf` or `.docx`)
2. The app automatically uploads it to the backend
3. View your extracted resume sections, match score, and suggested roles

---

## Contribution

Feel free to fork this repo and submit pull requests. Improvements such as **collapsible sections**, **theme switcher**, or **additional animations** are welcome.

---




