# AI-Powered Quiz App

An AI-driven quiz application where users can take quizzes on specific topics, generate questions dynamically using AI, and receive real-time feedback on their performance.

🚨 **Warning: This project is still in progress! Some features may not be fully implemented yet.** 🚨

## 🚀 Features

- 🔐 **User Authentication** (Login/Signup via email & social logins)
- 📚 **Topic Selection** (Users choose a quiz topic of interest)
- 🤖 **AI-Powered Questions** (Dynamic question generation using AI models)
- ✅ **Multiple-Choice Format** (Each question has 4 options, with one correct answer)
- 📊 **Instant Feedback** (Correct answers are processed and stored)
- 📝 **Result Storage** (Users can track their past quizzes and scores)
- 📈 **Scalability** (Cloud-based backend with efficient data storage)

---

## 🏗 Tech Stack

### Frontend

- React.js / Next.js
- Tailwind CSS / Daisy UI

### Backend

- Node.js with Express
- PostgreSQL
- Gemini API
- JWT Authentication

---

## ⚙️ Installation & Setup

1. **Clone the repository: https://github.com/jyotishankar04/Quizzify**

   ```sh
   git clone 
   cd Quizzify
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file and add the necessary API keys and database credentials.

   ```sh
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the backend server:**

   ```sh
   npm run dev
   ```

5. **Run the frontend:**

   ```sh
   cd client
   npm install
   npm run dev
   ```

---

## 🧠 AI Integration

- **Prompt:** The AI model generates questions based on the selected topic.
- **Response Parsing:** AI returns structured JSON containing questions, multiple options, and the correct answer.
- **Result Evaluation:** The backend processes user responses and calculates scores.

---

## 🛡 Security

- 🔑 JWT-based authentication for user sessions
- 🛠 Input validation using Zod

---

## 🤝 Contributing

We welcome contributions! Feel free to fork this repo and submit a pull request.

1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

## 📞 Contact

For any queries or collaboration, reach out via  [jyotipatra.subham@gamil.com](mailto\:jyotipatra.subham@gamil.com).

---

⭐ **If you like this project, consider giving it a star!** ⭐

