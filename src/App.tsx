import { BrowserRouter, Route, Routes } from "react-router"
import LoginPage from "./pages/public/login"
import RegisterPage from "./pages/public/register"
import DashboardPage from "./pages/private/dashboard"
import TeamPage from "./pages/private/team"
import ProjectPage from "./pages/private/project"
import ChatPage from "./pages/private/chat"
import CalendarPage from "./pages/private/calendar"
import NotificationsPage from "./pages/private/notifications"
import LandingLayout from "./layouts/landing"
import ProjectLayout from "./layouts/project"
import AuthProvider from "./hooks/useAuth/provider"

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
        
        <Route element={<LandingLayout/>}>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/team/:slug" element={<TeamPage/>}/>
          <Route path="/chat/:slug" element={<ChatPage/>}/>
          <Route path="/calendar" element={<CalendarPage/>}/>
          <Route path="/notifications" element={<NotificationsPage/>}/>
        </Route>

        <Route element={<ProjectLayout/>}>
          <Route path="/team/:slug/project/paper/:slug" element={<ProjectPage/>}/>
          <Route path="/team/:slug/project/documentation/:slug" element={<ProjectPage/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}


export default App
