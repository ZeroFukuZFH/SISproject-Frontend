import { BrowserRouter, Outlet, Route, Routes } from "react-router"
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
import AuthLayout from "./layouts/auth"
import HeroPage from "./pages/public/hero"
import { useEffect } from "react"
import landingService from "./services/landingService"
import { HttpError } from "./utils/http"
import { useNavigate } from "react-router"
import ChatsProvider from "./hooks/useChats/provider"
import useChats from "./hooks/useChats/hook"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroPage/>}/>

        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>}/>
        </Route>
        
       <Route element={<TeamChatRoutes/>}>
         <Route element={<ProtectedRoutes />}>
        
          <Route element={<LandingLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>

          <Route element={<ProjectLayout />}>
            <Route path="team/:teamId/project/paper/:projectId" element={<ProjectPage />} />
            <Route path="team/:teamId/project/documentation/:projectId" element={<ProjectPage />} />
          </Route>
        </Route>
       </Route>

      </Routes>
    </BrowserRouter>
  )
}

function TeamChatRoutes(){
  return (
    <ChatsProvider>
      <Outlet/>
    </ChatsProvider>
  )
}

function ProtectedRoutes(){
  const navigate = useNavigate()
  const { handleDisconnect } = useChats()
  // TODO: add refresh token check later
  useEffect(()=>{
    const checkToken = async () => {
      try {
        await landingService.me()
      } catch (error) {
        if(error instanceof HttpError){
          handleDisconnect()
          navigate('/login')
        }
      }
    } 
    checkToken()
    const tokenExpiration = 1000 * 60 * 3 // 3 HOURS
    const interval = setInterval(checkToken, tokenExpiration);
    return () => clearInterval(interval);
  },[navigate])

  return (
      <Outlet/>
  )
}


export default App
