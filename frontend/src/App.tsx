import { Outlet, Route, Routes } from "react-router-dom";
import SignUpForm from "./_auth/forms/SignUpForm";
import SignInForm from "./_auth/forms/SignInForm";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_home/Home";
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/Dashboard";
import { Toaster } from "react-hot-toast";
import QuizCreatePage from "./_root/pages/QuizCreatePage";
import Quizzes from "./_root/pages/QuizzesPage";
import QuizDash from "./_root/pages/QuizDash";
import QuizPlayground from "./_root/pages/QuizPlayground";
import AttemptResults from "./_root/pages/AttemptResults";
import ProfilePage from "./_root/pages/ProfilePage";
import EditQuizPage from "./_root/pages/EditQuizPage";
import SettingsPage from "./_root/pages/SettingsPage.tsx";
import GeneralSettings from "./components/_root/_settings/GeneralSettings.tsx";

const App = () => {
  return (
    <main className="w-full h-screen text-white" data-theme="light ">
      <Toaster />
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
              <>
                <Outlet />
              </>
            }
          >
            <Route index element={<Quizzes />} />
            <Route path=":quizId" element={<QuizDash />} />
            <Route path="create" element={<QuizCreatePage />} />
            <Route path="play/:quizId" element={<QuizPlayground />} />
            <Route path="edit/:quizId" element={<EditQuizPage />} />
            <Route path="results" element={<AttemptResults />} />
            {/* <Route path=":quizId/anlytics" element={<div>Leaderboard</div>} /> */}
          </Route>
          {/* <Route path="history" element={<div>History</div>} /> */}
          {/* <Route path="reports" element={<div>Reports</div>} /> */}
          <Route path="settings" element={<SettingsPage />}>
            <Route
              index
              element={
                <div className="w-full h-full flex justify-center items-center ">
                  <h1 className="text-2xl font-bold">Settings</h1>
                </div>
              }
            />
            <Route path="general" element={<GeneralSettings />} />
            <Route path="security" element={<div>Security</div>} />
            <Route
              path="billing"
              element={
                <div className="w-full h-full flex justify-center items-center flex-col">
                  <h1 className="text-2xl font-bold">Billing</h1>
                  <p className="text-gray-600">
                    Payment service is not available
                  </p>
                </div>
              }
            />
            <Route path="help" element={<div>Help & Support</div>} />
            <Route path="*" element={<div>404</div>} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Private route */}

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </main>
  );
};

export default App;
