<template>
  <div class="weather-preference">
        <form @submit="addWeatherInput">
            <h1>{{ title }}</h1>
            <div>{{ description }}</div>
            <ul>
                <li v-for="condition in weatherConditions" :key="condition.id">
                    <input type="checkbox" :id="condition.value" :value="condition.value" v-model="selections" />
                    <label :for="condition.value">
                        <img :src="condition.icon" alt="condition.value" /><br/>
                        <span>{{ condition.temperature.min }}</span>c -
                        <span>{{ condition.temperature.max }}</span>c
                    </label>
                </li>
            </ul>
            <button type="submit">{{ nextBtn }}</button>
        </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { CITIES, WEATHER } from '../constants.js';

export default {
    name: 'Weather',

    data() {
        return {
            selections: []
        }
    },

    computed: {
        weatherConditions() {
            return WEATHER.conditions;
        },

        title() {
            return WEATHER.title;
        },

        description() {
            return WEATHER.description;
        },

        nextBtn() {
            return WEATHER.nextButton;
        }
    },

    methods: {
        ...mapMutations (["setWeatherData", "setUserWeatherSelection"]),

        addWeatherInput(e) {
            e.preventDefault();

            if (Array.isArray(this.selections) && this.selections.length) {
                const accuWeatherCodeList = CITIES.map(o => o.accuWeatherCode);

                this.setUserWeatherSelection(this.selections);

                accuWeatherCodeList.forEach((code) => {
                    this.getWeatherReport(code);
                })
            }

            this.$router.push('/travel-cost');
        },

        async getWeatherReport(code) {
            // AccuWeather API is providing only 50 calls for trail version
            // So City weather information is feeded in CONSTANSTS and used it

            // const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${code}?apikey=r9huvq8H8Gffy7y44psw6EMUVl3SinV9&details=true&metric=true`)
            // const weatherData = await response.json();
            // const dailyForecast = weatherData.DailyForecasts[0];
            // const temperature = dailyForecast.Temperature;
            const cityObj = CITIES.find(o => o.accuWeatherCode === code);
            const { airportCode, temperature } = cityObj;
            const cityWeather = {
                city: airportCode,
                temperature: temperature
            };

            this.setWeatherData(cityWeather);
        }
    }
}
</script>

<style lang="scss">
    .weather-preference {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    ul {
        list-style-type: none;
        margin: 30px 0;

        li {
            display: inline-block;
            
            input[type="checkbox"][id="cold"],
            input[type="checkbox"][id="cloudy"],
            input[type="checkbox"][id="mostly-sunny"],
            input[type="checkbox"][id="sunny"] {
                display: none;
            }

            label {
                border: 1px solid #fff;
                padding: 10px;
                display: block;
                position: relative;
                margin: 10px;
                cursor: pointer;

                &:before {
                    background-color: white;
                    color: white;
                    content: " ";
                    display: block;
                    border-radius: 50%;
                    border: 1px solid #34495E;
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    width: 25px;
                    height: 25px;
                    text-align: center;
                    line-height: 28px;
                    transition-duration: 0.4s;
                    transform: scale(0);
                }

                span::after {
                    content: "\00b0"
                }

                img {
                    width: 100px;
                    transition-duration: 0.2s;
                    transform-origin: 50% 50%;
                }
            }

            :checked + label {
                border-color: #34495E;
                border-radius: 4px;
            }

            :checked + label:before {
                content: "\2713";
                background-color: #41B883;
                transform: scale(1);
            }

            :checked + label img {
                transform: scale(0.9);
                z-index: -1;
            }
        }
    }

    button {
        font-size: 20px;
        font-weight: 700;
        color: #2c3e50;
        border: 1px solid #34495E;
        border-radius: 4px;
        background-color: #fff;
        padding: 10px 30px;
        margin: 30px 0;
        cursor: pointer;
    }
</style>