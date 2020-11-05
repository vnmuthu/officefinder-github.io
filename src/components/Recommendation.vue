<template>
    <div class="result-container">
        <div v-if="isRecommendedOfficeAvailable" v-bind:class="[isRecommendedOfficeAvailable ? cityClassName : '', 'recommeded-location']">
            <div class="result-content">
                <span class="recommend-text">We recommend</span>
                <h1>{{ this.recommendedCity.name }}</h1>
                <div class="current-weather">
                    <img alt="logo" src="../assets/weather.png" />
                    <span class="min">{{ Math.round(this.recommendedCity.weather.Minimum.Value) }}</span>
                    <span>-</span>
                    <span class="max">{{ Math.round(this.recommendedCity.weather.Maximum.Value) }}</span>
                </div>
                <div v-if="isCheapFlightCostEnabled && cheapFlightCost" class="price">Price from <span>&euro;{{ cheapFlightCost }}</span></div>
                <div class="reset"><router-link to="/">Start Over!</router-link></div>
            </div>
        </div>
        <div v-else class="no-office">
            <h1>Sorry! No office location is suitable for your preference!</h1>
            <router-link to="/">Start Over!</router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { CITIES, WEATHER } from '../constants.js';

export default {
    name: 'Recommendation',
    
    data() {
        return {
            weatherReport: '',
            flightCost: '',
            recommendedCity: {}
        }
    },

    computed: {
        ...mapState(['userWeatherSelection', 'isCheapFlightCostEnabled', 'cityWeather', 'cityFlightCost']),

        isRecommendedOfficeAvailable() {
            return this.recommendedCity && Object.keys(this.recommendedCity).length > 0;
        },

        cityClassName() {
            return this.isRecommendedOfficeAvailable ? this.recommendedCity.name.toLowerCase() : '';
        },

        cheapFlightCost() {
            return this.isRecommendedOfficeAvailable ? this.recommendedCity.flightCost : '';
        }
    },

    mounted() {
        this.findRecommendedLocation();
    },

    methods: {
        findRecommendedLocation() {
            let recommededCities = [];
            const cityWeatherTravelPreference = this.deepFlattenData();

            if (Array.isArray(this.userWeatherSelection) && this.userWeatherSelection.length &&
                Array.isArray(this.cityWeather) && this.cityWeather.length) {
                let userMinTemperature;
                let userMaxTemperature;
                const userWeatherList = this.getUserWeatherList(this.userWeatherSelection);

                if (Array.isArray(userWeatherList) && userWeatherList.length > 0) {
                    if (userWeatherList.length > 1) {
                        const minTempList = userWeatherList.map(({ min }) => min);
                        const maxTempList = userWeatherList.map(({ max }) => max);
                        userMinTemperature = Math.min(...minTempList);
                        userMaxTemperature = Math.max(...maxTempList);
                    } else {
                        userMinTemperature = userWeatherList && userWeatherList[0].min;
                        userMaxTemperature = userWeatherList && userWeatherList[0].max;
                    }
                    
                    cityWeatherTravelPreference.map(i => {
                        if(i.weather.Minimum.Value >= userMinTemperature && i.weather.Maximum.Value <= userMaxTemperature) {
                            recommededCities.push(i);
                        }
                    });
                }
            }

            if (this.isCheapFlightCostEnabled && Array.isArray(this.cityFlightCost) && this.cityFlightCost.length) {
                if (!recommededCities.length) { 
                    recommededCities = cityWeatherTravelPreference;
                }

                recommededCities.sort((a, b) => {
                    return a.flightCost - b.flightCost;
                });
            }

            if (Array.isArray(recommededCities) && recommededCities.length) {
                this.recommendedCity = recommededCities[0];
            }
        },

        deepFlattenData() {
            let cityWeatherTravelList = [];

            CITIES.forEach((i) => {
                let cityObj = {};

                cityObj.name = i.city;
                this.cityWeather.forEach((o) => {
                    if (o.city === i.airportCode) {
                        cityObj.weather = o.temperature;
                    }
                });

                this.cityFlightCost.forEach((f) => {
                    if (f.city === i.airportCode) {
                        cityObj.flightCost = f.priceFrom;
                    }
                });

                cityWeatherTravelList.push(cityObj);
            });

            return cityWeatherTravelList;
        },

        getUserWeatherList(selectionList) {
            let temperatureList = [];
            selectionList.forEach((selectedItem) => {
                WEATHER.conditions.forEach((weatherItem) => {
                    if (selectedItem === weatherItem.value) {
                        temperatureList.push(weatherItem.temperature);
                    }
                })
            });

            return temperatureList;
        }
    }
}
</script>

<style lang="scss">
    .result-container {
        width: 100%;
        height: 100%;
        display: flex;
        box-sizing: border-box;

        .recommeded-location {
            width: 100%;
            height: 100%;
            display: flex;
            box-sizing: border-box;
            color: #ffffff;
            background-color: #000000;

            .result-content {
                padding: 20px 50px;
                text-align: left;

                .recommend-text {
                    padding-left: 5px;
                }

                h1 {
                    font-size: 50px;
                    margin: 0;
                }

                .current-weather {
                    display: inline-block;

                    img {
                        width: 50px;
                        margin-right: 15px;
                    }

                    span {
                        float: right;
                        padding: 0 5px;
                        font-size: 26px;
                        font-weight: 700;
                        position: relative;
                        top: 7px;
                    }

                    span.min::after,
                    span.max::after {
                        content: "\00b0"
                    }
                }

                .price {
                    font-size: 16px;
                    padding: 10px 20px;

                    span {
                        font-size: 26px;
                        font-weight: 700;
                        padding: 0 5px;
                    }
                }

                .reset {
                    display: flex;
                    margin: 10px;

                    a {
                        font-size: 16px;
                        font-weight: 700;
                        color: #fff;
                        border: 1px solid #34495E;
                        border-radius: 4px;
                        text-decoration: none;
                        padding: 10px 20px;
                        cursor: pointer;
                        background: #300000;
                        background: linear-gradient(45deg, #300000, #000000, #300000, #000000);
                    }
                }
            }
        }

        .no-office {
            width: 100%;
            height: 100%;
            text-align: center;
            background-color: #ffffff;
            color: #000000;
        }

        .amsterdam {
            background-image: url("../assets/amsterdam.jpg");
            background-size: cover;
            
        }

        .budapest {
            background-image: url("../assets/budapest.jpg");
            background-size: cover;
        }
        
        .madrid {
            background-image: url("../assets/madrid.jpg");
            background-size: cover;
        }
    }
</style>