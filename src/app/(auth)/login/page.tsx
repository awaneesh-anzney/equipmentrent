
import Login from '@/components/auth/Login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - EquipmentRent',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return <Login />
}