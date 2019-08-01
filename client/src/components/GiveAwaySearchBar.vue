<template>
    <div class="search-bar-grid box box-hover">
        <h6>Search Give Aways</h6>
        <p class="option-header">Company</p>
        <select>
            <option v-for="company in this.companies" v-bind:id="company.companyID">{{company.companyName}}</option>
        </select>
        <p class="option-header">Category</p>
        <select>
            <option>Game keys</option>
            <option>Merchandise</option>
            <option>Events</option>
        </select>
        <p class="option-header">Filter string</p>
        <input type="textfield" placeholder="sentence">
        <button>Filter</button>
    </div>
</template>





<script>
import env_variables from "../environment_variables.json";
export default {
    data() {
        return {
            companies: []
        }
    },
    created() {
        fetch(env_variables.BASE_URL + "companies", {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => res.json())
        .then(res => this.companies = res)
    }
};
</script>





<style scoped>
.search-bar-grid {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.option-header {
    font-size: 14px;
    margin: 1px;
    padding: 0px;
}
select, button, input {
    outline: none;
    margin: 2px;
    border: none;
    background-color: whitesmoke;
    border-radius: 5px;
    font-size: 14px;
}
select:hover, button:hover {
    background-color: rgb(240, 240, 240);
}

</style>
