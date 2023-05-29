import Footer from "./Footer";
import Header from "./Header";

function About() {
  return(
  <div>
    <Header />
    <div className="aboutPage px-12 mb-4">
      <div className="my-2">
        <h1 className="text-4xl font-extrabold text-center	bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
          About app
        </h1>
      </div> 
      <div className="text-justify p-6">
      <img className="float-left w-52 mt-2 mr-4" src="./src/img/food1.jpg"/>
      <p className="">
          This web-application is designed to find recipes for cooking.
        </p>
        <p className="">
          There is an input field on the initial page of the application. Searching for recipes can be done both by individual ingredients and by the nutritional value of the finished dish.
        </p>
        <p className="">
          Searching for recipes by ingredients is done by default. The search category can be switched using the checkboxes. To search for recipes by ingredients, you need to check the "Search by ingridients" category box. To search for recipes by nutritional value, you need to check the "Search by nutrients" category box. 
        </p>
        <p className="">
          After selecting a category, you can search for recipes by clicking the button "Find a recipe". The number of recipes displayed on the page is 10.
        </p>
        <p className="">
          To get detailed information about the recipe - click on the image or the name of the desired recipe. To close the modal view window - click the button "Cancel".
        </p>
        <p className="">
          At the end of the web-application page you can find a link to the author of the project.
        </p>

      </div>

    </div>
    <Footer />
  </div>
  )
}
export default About