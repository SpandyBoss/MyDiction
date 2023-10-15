import Image from 'next/image'
import { Inter } from 'next/font/google'
import DictionarySection from '@/components/DictionarySection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <DictionarySection/>
    </>
  )
}
