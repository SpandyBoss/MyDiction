import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar  rounded-md w-fit flex mx-auto p-2 mt-2">
{/*Mobile View Starts here:*/}
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Github</a></li>
        <li>
          <a>More</a>
          <ul className="p-2">
            <li><a href='mailto:@spandansehgal@gmail.com' target='_blank'>Contact</a></li>
            <li><a href='https://span41n.vercel.app' target='_blank'>Portfolio</a></li>
          </ul>
        </li>
        <li><a href='/about'>About</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">MyDiction</a>
  </div>

{/*Desktop View Starts here:*/}

  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Github</a></li>

      <li><a href='/about'>About</a></li>
      
      <li tabIndex={0}>
        <details>
          <summary>More</summary>
          <ul className="p-2">
            <li><a href='mailto:@spandansehgal@gmail.com' target='_blank'>Contact</a></li>
            <li><a href='https://span41n.vercel.app' target='_blank'>Portfolio</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>

  <div className="navbar-end">
    <Link className="btn" href='/'>Home </Link>
  </div> 
</div>
    );
};

export default Navbar;
