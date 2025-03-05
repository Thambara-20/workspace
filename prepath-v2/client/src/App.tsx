import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { StudyPlan } from "./pages/StudyPlan";
import { Flashcards } from "./pages/Flashcards";
import { Settings } from "./pages/Settings";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-plan"
                element={
                  <ProtectedRoute>
                    <StudyPlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/flashcards"
                element={
                  <ProtectedRoute>
                    <Flashcards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;