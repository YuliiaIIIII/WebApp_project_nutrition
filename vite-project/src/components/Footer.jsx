import { Link } from "react-router-dom"

function Footer(){
  return(
  <footer className="bg-gradient-to-t from-indigo-200 to-indigo-500 text-center">
    <div className='flex justify-center '>
    <div className='mt-3'>
      <Link 
      className='p-1 mr-2 font-semibold underline xlg:text-xl hover:text-white hover:text-2xl'
      to='/'
      >
      Home
      </Link>
    </div>
    <div className='mt-3'>
      <div>
        <Link className="p-1 font-semibold underline xlg:text-xl hover:text-white hover:text-2xl" to="/about">
        About
        </Link>
      </div>
    </div>
    </div>
    <div>
    <p className='p-1 font-normal text-sm xlg:text-base'>
        Perfect nutrition 2023
    </p>
    </div>
  </footer>
  )
}

export default Footer