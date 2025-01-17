import { Outlet, Route, Routes } from "react-router-dom";
import SignUpForm from "./_auth/forms/SignUpForm";
import SignInForm from "./_auth/forms/SignInForm";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_home/Home";
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/Dashboard";

const App = () => {
  return (
    <main className="w-full h-screen text-white">
      <Routes>
        {/* Public route */}
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/auth/signup" element={<SignUpForm />} />
          <Route path="/auth/signin" element={<SignInForm />} />
        </Route>
        {/* Private route */}
        <Route path="/app" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="quizzes"
            element={
              <div>
                <Outlet />
              </div>
            }
          >
            <Route index element={<div>Quizzes</div>} />
            <Route path=":quizId" element={<div>Quiz</div>} />
            <Route path="create" element={<div>Create</div>} />
            <Route path=":quizId/play" element={<div>Edit</div>} />
            <Route path=":quizId/anlytics" element={<div>Leaderboard</div>} />
          </Route>
          <Route path="history" element={<div>History</div>} />
          <Route path="reports" element={<div>Reports</div>} />
        </Route>

        {/* Private route */}

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </main>
  );
};

export default App;
