import Link from 'next/link'
import writing from '../assets/writing.jpeg'
export default function App() {
  return (
   <main>
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXNzYXklMjB3cml0aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
          <h1 className="mb-5 text-4xl text-blue-700 font-bold">Welcome to EZ-Essay</h1>
          <p className="mb-5 text-white">Sometimes you just need a plan of action.  EZ-Essay is an e-learning support tool that utilizes the help of AI to do so.</p>
          <Link href="/signup" className="text-white btn btn-indigo_dye">Start Here</Link>
          </div>
      </div>
      </div>
   </main>
  )
}
