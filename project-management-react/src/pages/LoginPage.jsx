
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/authStore"
import { Navigate, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 const { login } = useAuthStore();
 const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard"); 
    } catch (error) {
      console.error(error);
    }
  };
  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.3 } },
  }
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
       {user  && <Navigate to="/" replace />}  
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <motion.div whileFocus="focus" variants={inputVariants}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </motion.div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <motion.div whileFocus="focus" variants={inputVariants}>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button type="submit" className="w-full">
             Login
            </Button>
          </motion.div>
              {/* 👇 Register button added here */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={() => navigate("/register")}
            >
              Register / register
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

