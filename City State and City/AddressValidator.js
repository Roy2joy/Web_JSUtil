/*
 *Fetch list of countries from api --->and transform its useful attributes  in to 
 *array of (CName and CCode)
 */
async function getCountryList() {
    let ret = null;

    var myHeaders = new Headers();
    //this auth token will expire after 24 hour
    //visit this site to get new token
    //https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
    //this site is creditted to provide API which contains ,country,state and city data
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWJlZWxub29yOTE0QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IjlycHFqRnZNanUxRFg4UVY1Wm00VDJoMDFqdWphU1c3M1NHemtlMkpSeWtTQk56dmJiWkRGUkUxQzhlNENrb3BXeWsifSwiZXhwIjoxNjI3OTI4NDA1fQ.fI5450BnMYk_p1xkGmrZkUiJKX7cySUGXkiwA09Ha_Q");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let countryList=[]; //this will 
    let mainTemp=await fetch("https://www.universal-tutorial.com/api/countries/", requestOptions)
        .then(response => response.text())
        .then(result =>{
            result=JSON.parse(result)
            result.forEach(element => {
                var countryDS={
                    'CName':element.country_name,
                    'CCode':element.country_short_name
                }
                // console.log(x.CName)
                countryList.push(countryDS)
            });
        })
        .catch(error => console.log('error', error));
    console.log(countryList.length)
    return countryList;
}

async function getStateList(country) {
    var myHeaders = new Headers();
    //this auth token will expire after 24 hour
    //visit this site to get new token
    //https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
    //this site is creditted to provide API which contains ,country,state and city data
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWJlZWxub29yOTE0QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IjlycHFqRnZNanUxRFg4UVY1Wm00VDJoMDFqdWphU1c3M1NHemtlMkpSeWtTQk56dmJiWkRGUkUxQzhlNENrb3BXeWsifSwiZXhwIjoxNjI3OTI4NDA1fQ.fI5450BnMYk_p1xkGmrZkUiJKX7cySUGXkiwA09Ha_Q");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        if(country===""){
            throw Error;//as country is not defined
        }
        let stateList = null; //this will 
        let mainTemp = await fetch("https://www.universal-tutorial.com/api/states/" + country, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                stateList = result;
            })
            .catch(error => console.log('error', error));
        return stateList;
    }
    catch(e){
        //error as country is not defined
        return null;
    }
}

async function getCityList(state){
    var myHeaders = new Headers();
    //this auth token will expire after 24 hour
    //visit this site to get new token
    //https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
    //this site is creditted to provide API which contains ,country,state and city data
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWJlZWxub29yOTE0QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IjlycHFqRnZNanUxRFg4UVY1Wm00VDJoMDFqdWphU1c3M1NHemtlMkpSeWtTQk56dmJiWkRGUkUxQzhlNENrb3BXeWsifSwiZXhwIjoxNjI3OTI4NDA1fQ.fI5450BnMYk_p1xkGmrZkUiJKX7cySUGXkiwA09Ha_Q");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        if(state===""){
            throw Error;//as country is not defined
        }
        console.log("debug state:",state)
        let cityList = null; //this will 
        let mainTemp = await fetch("https://www.universal-tutorial.com/api/cities/" + state, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                cityList = result;
            })
            .catch(error => console.log('error', error));
        return cityList;
    }
    catch(e){
        console.log("fetching array of cities")
        //error as country is not defined
        return null;
    }

}

/*this function will be triggered whenever the dom is load and fetch data from api
 *and then call countryListAppender() to append to select
 */
getCountryList()
    .then(
        response => {
            //console.log(response)
            countryListAppender(response);
        }
    );

/*append list of country to select element(for country )
*/
function countryListAppender(countryList){
    var tempElement=document.getElementById("countrySList")
    
    countryList.forEach(element => {
        tempOption=document.createElement("option");
        tempOption.text=element.CName;
        tempOption.value=element.CName;
        tempElement.appendChild(tempOption)        
    });
    

}

async function fetchStateofCountry(){
    var targetElement=document.getElementById("countrySList")
    
    //fetch all state list by sending country name in function
    let stateList=await getStateList(targetElement.value);

    //-------appending that stateList to Select element(of State)-------------------------

    //pick target select
    var targetState=document.getElementById("stateSList")
    //pick default option in select and delete all other and then append new State List
    //to avoid previous state issue
    var defaultElement=targetState.getElementsByTagName("option")[0]
    targetState.innerHTML=''
    
    //append new list
    targetState.appendChild(defaultElement);
    try{
        stateList.forEach(element => {   
            tempOption=document.createElement("option");
            tempOption.text=element.state_name;
            tempOption.value=element.state_name;
            targetState.appendChild(tempOption)        
        });
    }
    catch(e){
        console.log("stateList error --states are not fetched")
    }


    //---------------------------------Renew City Also -as state are going to reset
    var deleteCity=document.getElementById("citySList")
    var cityDefaultElement=deleteCity.getElementsByTagName("option")[0]
    deleteCity.innerHTML='';
    deleteCity.appendChild(cityDefaultElement);

}

async function fetchCityofState(){
    var targetElement=document.getElementById("stateSList")

    //fetch all city list by sending state name in function
    let cityList=await getCityList(targetElement.value);

    //-------appending that cityList to Select element(of State)-------------------------

    //pick target select
    var targetCity=document.getElementById("citySList")
    //pick default option in select and delete all other and then append new State List
    //to avoid previous state issue
    var defaultElement=targetCity.getElementsByTagName("option")[0]
    targetCity.innerHTML=''
    
    //append new list
    targetCity.appendChild(defaultElement);
    try{
        cityList.forEach(element => {   
            tempOption=document.createElement("option");
            tempOption.text=element.city_name;
            tempOption.value=element.city_name;
            targetCity.appendChild(tempOption)        
        });
    }
    catch(e){
        console.log("cityList error --states are not fetched")
    }


    
}

