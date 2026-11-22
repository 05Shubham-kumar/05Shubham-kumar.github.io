const SKILL_CATEGORIES = [
  {
    title: "Core Languages",
    color: "#f5a623",
    items: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 80 },
      { name: "JavaScript", level: 65 },
      { name: "HTML/CSS", level: 75 },
    ],
  },
  {
    title: "Machine Learning",
    color: "#f5a623",
    items: [
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 70 },
      { name: "Data Visualization", level: 80 },
      { name: "EDA", level: 85 },
      { name: "Feature Engineering", level: 75 },
    ],
  },
  {
    title: "GenAI",
    color: "#a855f7",
    items: [
      { name: "GenAI", level: 75 },
      { name: "Prompt Engineering", level: 70 },
      { name: "LangChain", level: 65 },
      { name: "RAG", level: 60 },
    ],
  },
  {
    title: "ML Algorithms",
    color: "#f5a623",
    items: [
      { name: "Logistic Regression", level: 85 },
      { name: "Random Forest", level: 80 },
      { name: "SVM", level: 70 },
      { name: "XGBoost", level: 80 },
      { name: "KMeans", level: 70 },
      { name: "PCA", level: 65 },
      { name: "Cross Validation", level: 75 },
      { name: "GridSearchCV", level: 70 },
    ],
  },
  {
    title: "Tools & Deployment",
    color: "#f5a623",
    items: [
      { name: "Streamlit", level: 85 },
      { name: "GitHub", level: 75 },
      { name: "Model Deployment", level: 70 },
      { name: "GitPython", level: 65 },
      { name: "AST Parsing", level: 60 },
      { name: "Gemini API", level: 60 },
    ],
  },
];

const PROJECTS = [
  {
    tag: "Machine Learning · Esports AI",
    title: "Valorant Match Winner Prediction",
    subtitle: "ML system with Elo-based feature engineering",
    desc: "End-to-end esports match prediction system using Machine Learning and advanced feature engineering. Improved prediction accuracy from 57% → 65.5% using rolling statistics, matchup differences, and Elo ratings. Deployed as an interactive Streamlit app.",
    tech: ["Python", "scikit-learn", "XGBoost", "Elo Rating", "Streamlit", "pandas", "NumPy"],
    live: "https://valorantwinner-prediction-model-xwnfvyrwdst3kund7dunrp.streamlit.app/",
    github: "https://github.com/05Shubham-kumar/Valorant_Winner-prediction-model",
  },
  {
    tag: "AI Agent · Code Review",
    title: "AI Code Review Agent",
    subtitle: "Automated GitHub repository review system",
    desc: "AI-powered code review system that analyzes public GitHub repos using GitPython, Python AST parsing, and Gemini API. Generates structured review comments with severity, category, and confidence scores.",
    tech: ["Python", "Streamlit", "GitPython", "AST", "Gemini API"],
    live: "https://ai-code-review-agent-s.streamlit.app/",
    github: "https://github.com/05Shubham-kumar/AI-Code-Review-Agent",
  },
  {
    tag: "Fraud Detection · In Progress",
    title: "Fraud Detection System",
    subtitle: "Transaction fraud detection — work in progress",
    desc: "Building a real-time fraud detection pipeline to identify suspicious financial transactions using classification models. Currently in development — completing the feature engineering and model tuning phase.",
    tech: ["Python", "scikit-learn", "pandas", "XGBoost", "Streamlit"],
    live: null,
    github: "https://github.com/05Shubham-kumar/Fraud-Detection-System",
  },
  {
    tag: "Freelance · Unity Copilot",
    title: "Unity AI Copilot",
    subtitle: "Freelance project — demo preview",
    desc: "This is a freelancing project of mine and this is just a demo, like just 1% of what I really create for the client. An AI-powered copilot assistant integrated into Unity for game development workflow automation and intelligent support.",
    tech: ["Python", "Unity", "OpenAI API", "C#", "Streamlit"],
    live: null,
    github: "https://github.com/05Shubham-kumar/Unity-AI-Copilot",
  },
];

const SERVICES = [
  {
    title: "Data Analysis",
    desc: "End-to-end EDA, statistical analysis, and actionable insights from raw datasets.",
  },
  {
    title: "ML Model Building",
    desc: "Custom ML models tuned for accuracy — classification, regression, and clustering.",
  },
  {
    title: "Deep Learning",
    desc: "Neural network models for image, text, and tabular data using Python.",
  },
  {
    title: "Dashboard Creation",
    desc: "Interactive dashboards to visualize KPIs and business metrics with Streamlit.",
  },
  {
    title: "Python Automation",
    desc: "Automate repetitive data tasks, web scraping, file handling, and workflows.",
  },
  {
    title: "SQL Data Analysis",
    desc: "Complex SQL queries, database design, and data extraction for business decisions.",
  },
];
