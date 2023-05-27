import Footer from "./Footer";
import Header from "./Header";

function AboutPage(){
  return(
  <div>
    <Header />
    <div className="aboutPage">
      <div className="">
        <h1 className="">
          Perfect nutrition - about app
        </h1>
      </div> 
      <div className="">
        <p>
        This web-application is designed to find recipes for cooking.
        There is an input field on the initial page of the application. Searching for recipes can be done both by individual ingredients and by the nutritional value of the finished dish.
        Searching for recipes by ingredients is done by default. The search category can be switched using the checkboxes. To search for recipes by ingredients, you need to check the "Search by ingridients" category box. To search for recipes by nutritional value, you need to check the "Search by nutrients" category box. 
        After selecting a category, you can search for recipes by clicking the button "Find a recipe".
        The number of recipes displayed on the page is 10.
        To get detailed information about the recipe - click on the image or the name of the desired recipe.
        To close the modal view window - click the button "Cancel".
        At the end of the web-application page you can find a link to the author of the project.
        </p>
      </div>
    </div>
    <Footer />
  </div>
  )
}
export default AboutPage