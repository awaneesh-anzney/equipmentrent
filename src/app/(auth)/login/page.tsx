
import Login from '@/components/auth/Login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Fleetshare360',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return <Login />
}