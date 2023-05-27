function Header(){
  return(
    <header className="bg-gradient-to-t from-indigo-500 to-indigo-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6" aria-label="Global">
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5"> 
            <img 
              className="h-8 lg:h-12 xlg:h-14 w-auto mr-5" 
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" 
              alt="logo">
            </img>
          </a>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 lg:text-4xl xlg:text-5xl">Perfect nutrition</h2>
          </div>
        </div>
      </nav>
    </header>
  )
}
  
export default Header