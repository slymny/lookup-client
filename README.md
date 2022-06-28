# lookup-client

Simple, React weather application.
---

## How does application works?
1. When user enter a city name, the app shows the current weather of the city.
   <img src='./public/assets/main.png' />
   
2. When user enter a city name, the page's background changes to that city' image. If there is no image related to that city, the app searches images related to country code in the image api.


3. When user click the city name, the app shows the detailed forecast of the city for 5 days.
   <img src='./public/assets/detail.png' />
   
---


## Used APIs

- openweathermap  --> for weather information
- pexels          --> for background images


---


## Structure
- public
   - assets
   - index.html
- src
   - components
      - DetailForecast.js
      - DetailForecast.module.css
      - MainForecast.js
      - MainForecast.module.css
   - hooks
      - useFetch.js
   - layout
      - Footer.js
      - Footer.module.css
      - Layout.js
      - Navbar.js
      - Navbar.module.css
   - pages
      - DetailPage.js
      - DetailPage.module.css
      - LandingPage.js
      - LandingPage.module.css
      - MainPage.js
      - MainPage.module.css
   - store
      - CityContext.js
      - ErrorAndLoadingContext.js
   - App.js
   - App.css
   - index.js
   - index.css
- package.json
- package-lock.json
- README.md


---

> [See server side](https://github.com/slymny/lookup-server)
