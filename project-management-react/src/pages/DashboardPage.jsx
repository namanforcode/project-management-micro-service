import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Header from "@/components/header";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
       {!user  && <LoginPage />}  
      <Header />
      {/* <Sidebar /> */}
      <h1>Dashboard Page</h1>
      <p>Welcome {user?.name}!</p>
      <p>Your email is {user?.email}!</p>
    </div>
  )
}

export default DashboardPage