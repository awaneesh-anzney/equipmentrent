
import SignUp from '@/components/auth/SignUp'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - EquipmentRent',
  description: 'Create a new account',
}

export default function SignUpPage() {
  return <SignUp />
}