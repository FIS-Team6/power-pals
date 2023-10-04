import { BsBookHalf, BsFillPersonFill } from 'react-icons/bs'
import { BiHomeCircle } from 'react-icons/bi'

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <div className="drawer drawer-start lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-16">
        {/* Page content here */}
        {children}          
        <label htmlFor="my-drawer-2" className="btn btn-accent drawer-button lg:hidden">Open drawer</label>
      
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-secondary text-base-content">
          {/* Sidebar content here */}
          <h1 className="text-2xl text-primary">Power Pal</h1>
          <li className="text-xl text-primary py-2"><a><BsBookHalf />Projects</a></li>
          <li className="text-xl text-primary py-2"><a><BiHomeCircle />Home</a></li>
          <li className="text-xl text-primary py-2"><a><BsFillPersonFill />Profile</a></li>
        </ul>          
        </div>
      </div>
    </section>
  )
}