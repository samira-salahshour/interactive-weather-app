# interactive-weather-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```
### Directory and files
```
├──public
     ├── android-chrome-512x512             # Application logo
│    └── index.html                         #All CDNs links
│
│
├──src
    ├── components
    │    ├── BaseView.vue                  # includes other components
    │    ├── MapComponent.vue              # show mape that we can pan and choose a city to know it's weather information
    │    ├── InformationComponent.vue      # showes all asked information such as sunset time, sunrise time, ...
    │    ├── BaseInput.vue                 # show an input foe enter name or coordinate of city that we want to know it's the weather info
    │    └── AnimatedWeatherIcons.vue      # show the type of weather
    │
    ├── views 
    │     └── Home.vue        #main page in this project
    │
    ├── router 
    │     └── index.ts         # where link to diffrent pages
    │
    ├── store
    │    └── index.ts          # where we assemble modules and export the store
    │   
    ├── assets  
    │     └── logo.png         # Browser tab logo is here
    │   
    ├── main.ts                # where import all librareis
    │
    └── App.vue               # Fixed frame of all pages



```
### API Links
```
For weather information (" https://open-meteo.com/en/docs ")
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=Europe%2FLondon

For getting name of entered lat, lng ("https://nominatim.openstreetmap.org")
https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lng}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=Europe%2FLondon

For getting lat,lng of entered name ("https://nominatim.openstreetmap.org")
https://nominatim.openstreetmap.org/search?city={city name}&format=json

```
### Libraries
```
Vuetify for ui design
https://vuetifyjs.com/en/getting-started/installation/

Leaflet for map
https://leafletjs.com/examples/quick-start/

Moment js for converting time type
https://momentjs.com/

Codepen for animated weather icon
https://codepen.io/joshbader/pen/EjXgqr

```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
