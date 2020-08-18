export const CITIES = Object.freeze([
    {
        city: 'Amsterdam',
        accuWeatherCode: 249758,
        airportCode: 'AMS',
        temperature : {
            "Minimum": {
                "Value": 5.6,
                "Unit": "C",
                "UnitType": 17
            },
            "Maximum": {
                "Value": 14.1,
                "Unit": "C",
                "UnitType": 17
            }
        }
    },
    {
        city: 'Budapest',
        accuWeatherCode: 187423,
        airportCode: 'BUD',
        temperature : {
            "Minimum": {
                "Value": 21.1,
                "Unit": "C",
                "UnitType": 17
            },
            "Maximum": {
                "Value": 24.3,
                "Unit": "C",
                "UnitType": 17
            }
        }
    },
    {
        city: 'Madrid',
        accuWeatherCode: 308526,
        airportCode: 'MAD',
        temperature : {
            "Minimum": {
                "Value": 26.4,
                "Unit": "C",
                "UnitType": 17
            },
            "Maximum": {
                "Value": 34.8,
                "Unit": "C",
                "UnitType": 17
            }
        }
    }
]);

export const WEATHER = Object.freeze({
    title: 'What is your preferred weather condition?',
    description: 'Choose as many as you like',
    nextButton: 'Next Step',
    conditions: [
        {
            id: 1,
            value: 'cold',
            temperature: {
                min: 0,
                max: 20
            },
            icon: 'https://developer.accuweather.com/sites/default/files/31-s.png'
        },
        {
            id: 2,
            value: 'cloudy',
            temperature: {
                min: 20,
                max: 28
            },
            icon: 'https://developer.accuweather.com/sites/default/files/06-s.png'
        },
        {
            id: 3,
            value: 'mostly-sunny',
            temperature: {
                min: 25,
                max: 34
            },
            icon: 'https://developer.accuweather.com/sites/default/files/03-s.png'
        },
        {
            id: 4,
            value: 'sunny',
            temperature: {
                min: 30,
                max: 40
            },
            icon: 'https://developer.accuweather.com/sites/default/files/01-s.png'
        }
    ]
});