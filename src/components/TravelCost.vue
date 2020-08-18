<template>
    <div class="travel-preference">
        <form @submit="submitPreference">
            <div class="travel">
                <img alt="logo" src="../assets/flight.png" />
                <h1>Do you want a cheap flight cost?</h1>
                <div class="description">Your flight depart from home location ({{ this.user.homeLocation }})</div>
                <ul>
                    <li>
                        <input type="radio" id="economy" value="true" v-model="cheapTravelCost" @change="updateTravelPreference(true)" />
                        <label for="economy">Yes</label>
                    </li>
                    <li>
                        <input type="radio" id="business" value="false" v-model="cheapTravelCost" @change="updateTravelPreference(false)" />
                        <label for="business">No</label>
                    </li>
                </ul>
            </div>
            <button type="submit">See Results</button>
        </form>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { CITIES } from '../constants.js';

export default {
    name: 'TravelCost',

    data() {
        return {
            cheapTravelCost: ''
        }
    },

    computed: {
        ...mapState(['user'])
    },

    methods: {
        ...mapMutations (["setFlightCost", "setCheapFlightCostFlag"]),

        submitPreference(e) {
            e.preventDefault();
            this.$router.push('/recommendation');
        },

        updateTravelPreference(travelCostStatus) {
            if (travelCostStatus) {
                const homeOfficeCode = 'CDG'; // Home Location Airport Code
                const otherOfficeData = CITIES.filter(item => item.city !== this.user.homeLocation);
                const otherofficeCodes = otherOfficeData.map(o => o.airportCode);

                this.setCheapFlightCostFlag(travelCostStatus);

                otherofficeCodes.forEach((recommendedOfficeCode) => {
                    this.calculateCheapFlightCost(homeOfficeCode, recommendedOfficeCode);
                })
            } else {
                this.setCheapFlightCostFlag(travelCostStatus);
            }
        },

        async calculateCheapFlightCost(flyFrom, flyTo) {
            const response = await fetch(`https://api.skypicker.com/flights?fly_from=${flyFrom}&fly_to=${flyTo}&partner=picky&sort=price&limit=10`)
            const flightData = await response.json();
            const responseData = flightData.data;
            const priceStartingFrom = Math.min.apply(null, responseData.map( x => x.price));
            this.setCheapFlightCost(flyTo, priceStartingFrom);
        },

        setCheapFlightCost(flyTo, price) {
            this.setFlightCost({
                city: flyTo,
                priceFrom: price
            });
        }
    }

}
</script>

<style lang="scss" scoped>
    .travel-preference {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        img {
            width: 150px;
            margin: 0 auto;
        }

        h1 {
            margin: 20px 0;
        }

        .description {
            padding: 5px 0;
        }

        ul {
            li {
                input[type="radio"][id="economy"],
                input[type="radio"][id="business"] {
                    display: none;
                }

                label {
                    font-size: 20px;
                    font-weight: 700;
                    border: 1px solid #34495E;
                    border-radius: 4px;
                    padding: 15px 50px;
                    margin: 10px 30px;
                }
            }
        }
    }
</style>