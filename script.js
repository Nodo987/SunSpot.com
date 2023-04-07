



//todo Dom variables

const DateTextPlaceholder = document.querySelectorAll(".Date_text_Placeholder") //In this variable is stored Date text Placeholder Element
const cityName = document.querySelectorAll(".City_name_Placeholder")//this variable is used for display city name
const temperaturePLaceholder = document.querySelectorAll(".Temperature_text_Placeholder")//this variable is used for display Current temperature
const placeholdersForOtherStats = document.querySelectorAll("span")//this variables are used for display other stats
const buttonForBackToMainPage = document.querySelectorAll(".Back_to_main_section_button")
const buttonForEnterInSearchMenu = document.querySelectorAll(".Header_Img")
const sections = document.querySelectorAll(".container_for_sections")
const searchBar = document.querySelector(".search_bar")
const searchButton = document.querySelector(".search_icon")
const ChooseLanuageContainer = document.querySelectorAll(".Choose_language_container")
const languageOption = document.querySelectorAll(".option")



//todo variables
let city = "Tbilisi" // city name
let translated = ""
let unitsType = "metric" // unit type 
let language = "Geo"




//todo Arrays
let weatherType = ["Clear", "Clouds", "Snow", "Rain", "Thunderstorm", "Drizzle", "Mist", "Smoke", "Haze", "Fog","Sand","Dust","Ash","Squall", "Tornado" ] //for check weather and choose correct background
let weatherTypeGeorgian = ["მოწმენდილი", "ღრუბლიანი", "თოვლიანი", "წვიმიანი", "ელვა", "თქორი", "ბურუსი", "ბურუსი", "ბურუსი", "ნისლი","ბურუსი", "ბურუსი", "ბურუსი", "ბურუსი","ტორნადო"]
let classes = ["Weather_clear_background_image", "Weather_cloud_background_image", "Weather_snow_background_image", "Weather_rain_background_image", "Weather_thunder_background_image", "Weather_drizzle_background_image",
"Weather_fog_background_image","Weather_fog_background_image","Weather_fog_background_image","Weather_fog_background_image","Weather_fog_background_image","Weather_fog_background_image",
"Weather_fog_background_image","Weather_fog_background_image","Weather_tornado_background_image"]//background classes
let cityListArray = []



//todo functions

function changeBackgroundBasedOnWeather(x){//this function check weather and set background based on weather 
    for(let i = 0; i < classes.length; i++){
        document.querySelector(".Full_content_container").classList.remove(classes[i])
        document.querySelector(".Project_container").classList.remove(classes[i])
    }
    for(let i = 0; i < weatherType.length; i++){
        if(x == weatherType[i]){
            document.querySelector(".Full_content_container").classList.add(classes[i])
            document.querySelector(".Project_container").classList.remove(classes[i])
            
        }
    }
}

function giveCityNameValue() {//displayes City name
        if(language == "Geo"){
            translateCityNameUsingApi()
        }
        else{
            cityName[0].textContent = city  
            cityName[1].textContent = city 
        }
        
}

function giveStatsValues(x, y, z, i){//displayes stat values
    temperaturePLaceholder.forEach(temp => {
        temp.textContent = Math.floor(x) + '°'
    })
    if(language == "Geo"){
        console.log("oas")
        for(let i = 0; i < weatherType.length; i++){
            if(y == weatherType[i]){
                placeholdersForOtherStats[0].textContent = weatherTypeGeorgian[i]
                placeholdersForOtherStats[3].textContent = weatherTypeGeorgian[i]
            }
        }
    }
    else{
        placeholdersForOtherStats[0].textContent = y
        placeholdersForOtherStats[3].textContent = y
    }
    placeholdersForOtherStats[1].textContent = Math.floor(z)
    placeholdersForOtherStats[4].textContent = Math.floor(z)
    placeholdersForOtherStats[2].textContent = Math.floor(i) + "m/s"
    placeholdersForOtherStats[5].textContent = Math.floor(i) + "m/s"
}

function GiveDateTextPlaceholderValueEng() { //This function gives value to date text placeholder element
   
    const date = new Date()//Creating variable based on this moment date

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //array for week days to get name of the day name we need

    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; //array for Year month to get name of the month name we need

    DateTextPlaceholder[0].textContent = daysOfWeek[date.getDay()] + " , " + " " + monthsOfYear[date.getMonth()] + " " + date.getDate() + " , " + " " + + date.getFullYear()//This line put all the values in the element

}

function GiveDateTextPlaceholderValueGeo() { //This function gives value to date text placeholder element
   
    const date = new Date()//Creating variable based on this moment date

    const daysOfWeek = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']; //array for week days to get name of the day name we need

    const monthsOfYear = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']; //array for Year month to get name of the month name we need

    DateTextPlaceholder[1].textContent = daysOfWeek[date.getDay()] + " , " + " " + date.getDate() + " " + monthsOfYear[date.getMonth()] + " , " + " " + + date.getFullYear()//This line put all the values in the element

}

function getCurrentWeatherInfro(){//taking data about current weather from api
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitsType}&appid=61820ac0ea4397c1e5bda2ef1055c23e`)
    .then(res => {
        if(res.ok == true){      
            removeShowError()
            return res.json()
        }
        else{
            showError()
        }
    })
    .then(data => {
        giveStatsValues(data.main.temp, data.weather[0].main, data.main.humidity, data.wind.speed)
        changeBackgroundBasedOnWeather(data.weather[0].main)
        giveCityNameValue()
    })
} 

function getCityListData(){//this function takes city list data from json and add it in the city list section
    fetch("./city.json")
    .then(res => {
        return res.json()
    })
    .then(data => {
        cityListArray = data.cities.map(unit => {
            let parentDiv = document.createElement("div")
            let text = document.createElement("p")
            text.innerHTML = unit.city
            parentDiv.appendChild(text)
            parentDiv.classList.add("city_list_individual_container")
            document.getElementById('City_list').appendChild(parentDiv)
            return {city:unit.city, element: parentDiv}
        })
        cityListArray.forEach(unit => {
            searchBar.addEventListener("input", () => {
                let searchBarValue = searchBar.value.toLowerCase()
                let isVisible = unit.city.toLowerCase().includes(searchBarValue)
                unit.element.classList.toggle("hiden", !isVisible )
            })
            unit.element.addEventListener("click", () => {
                city = unit.city
                searchBar.value = ""
                giveCityNameValue()
                getCurrentWeatherInfro()
                sections[2].classList.add("hiden")
                sections[0].classList.remove("hiden")
                setCorrectLanguage()
            })
        })
    })
}

function changeSectionsWhileClicked(){//after clicking changes sections based on properties
    buttonForBackToMainPage.forEach(button => {
        button.addEventListener("click", () => {
            setCorrectLanguage()
        })
    })
   
    buttonForEnterInSearchMenu[0].addEventListener("click", () => {
        sections[2].classList.remove("hiden")
        sections[1].classList.add("hiden")
        sections[0].classList.add("hiden")
    })

    buttonForEnterInSearchMenu[2].addEventListener("click", () => {
        sections[2].classList.remove("hiden")
        sections[1].classList.add("hiden")
        sections[0].classList.add("hiden")
    })

    buttonForEnterInSearchMenu[1].addEventListener("click", () => {
        sections[3].classList.remove("hiden")
        sections[1].classList.add("hiden")
        sections[0].classList.add("hiden")
    })
    buttonForEnterInSearchMenu[3].addEventListener("click", () => {
        sections[3].classList.remove("hiden")
        sections[1].classList.add("hiden")
        sections[0].classList.add("hiden")
    })
}

function changeCityNameBasedOnInput(){//get name from input which is not in the list and set it as a city
    searchBar.addEventListener("input", () => {
        if(searchBar.value != ""){
            city = searchBar.value.toLowerCase()
        }

    })
    searchButton.addEventListener("click", () => {
        city = city.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        sections[2].classList.add("hiden")
        sections[0].classList.remove("hiden")
        getCurrentWeatherInfro()
        setCorrectLanguage()
    })
}

function setCorrectLanguage(){//this function checks and set language based on properties  
    if(language == "Geo"){
        sections[3].classList.add("hiden")
        sections[2].classList.add("hiden")
        sections[0].classList.add("hiden")
        ChooseLanuageContainer[0].classList.add("hiden")
        sections[1].classList.remove("hiden")    
        ChooseLanuageContainer[1].classList.remove("hiden")
    }
    else{
        sections[3].classList.add("hiden")
        sections[2].classList.add("hiden")
        sections[1].classList.add("hiden")
        ChooseLanuageContainer[1].classList.add("hiden")
        sections[0].classList.remove("hiden")
        ChooseLanuageContainer[0].classList.remove("hiden")
    }
}

function changeLanguageFromSetting(){//this function changing language after choose which you want
    languageOption.forEach(option => {
        option.addEventListener("click", () => {
            language = option.value
            getCurrentWeatherInfro()
            setCorrectLanguage()
            giveCityNameValue() 
        })
    })
}

function translateCityNameUsingApi(){//this function translating city name from english to georgian
    fetch(`https://api.mymemory.translated.net/get?q=${city}!&langpair=en|geo`)
    .then(res => {
        if(res.Ok = true){
            return res.json()
        }
        else{
            cityName[1].textContent = city
        }
    })
    .then(data => {
        console.log(data)
        if(data.responseData.translatedText == null || data.responseData.translatedText.includes("!") || data.responseData.translatedText.includes("-") ){
            cityName[1].textContent = city
        }
        else{
            cityName[1].textContent = data.responseData.translatedText
        }
        
    })
}

function showError(){ //this function turns on error text display
    document.querySelectorAll(".error_alert")[0].style.display = "block"
    document.querySelectorAll(".error_alert")[1].style.display = "block"
    document.querySelectorAll(".Show_this_moment_stats")[0].style.display = "none"
    document.querySelectorAll(".Show_this_moment_stats")[1].style.display = "none"
}

function removeShowError(){//this function turns off error text display
    document.querySelectorAll(".error_alert")[0].style.display = "none"
    document.querySelectorAll(".error_alert")[1].style.display = "none"
    document.querySelectorAll(".Show_this_moment_stats")[0].style.display = "grid"
    document.querySelectorAll(".Show_this_moment_stats")[1].style.display = "grid"
}

//todo calling functions 

changeCityNameBasedOnInput()
giveCityNameValue()
getCurrentWeatherInfro()
getCityListData()
changeSectionsWhileClicked()
GiveDateTextPlaceholderValueEng()
GiveDateTextPlaceholderValueGeo()
changeLanguageFromSetting()

