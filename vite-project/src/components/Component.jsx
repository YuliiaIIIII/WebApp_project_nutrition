function Component({ receipt, func }) { 

  return (
    <div
      // key={receipt.id}
      id="userRequest"
      className="shadow-lg bg-orange-50 w-10/12 block mx-0 rounded-xl outline outline-offset-1 outline-indigo-200 md:flex md:flex-row lg:w-11/12 xlg:w-11/12 xlg:flex-col xlg:w-4/5"
      onClick={() => func(receipt.id)}
      >
      <div className="bg-no-repeat bg-cover rounded-md md:w-1/2 xlg:w-full">
        <img className="hover:scale-110 rounded-t-xl md:rounded-l-xl md:rounded-r-0 lg:rounded-l-xl lg:rounded-r-0 xlg:rounded-t-xl xlg:rounded-r-0 xlg:w-full xlg:inline xlg:align-middle" src={receipt.image} 
        />
      </div>
      <div className="mt-2 text-center md:w-1/2 md:flex md:items-center md:flex-col md:justify-center xlg:w-full">
        <p className="px-4 py-2 font-normal text-base hover:font-medium">{receipt.title}</p>
      </div>
    </div>
  )
}

export default Component