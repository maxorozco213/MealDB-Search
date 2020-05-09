const meals = new Vue({
    el: '#food',
    data: {
        appName: 'Meal Search',
        foodCategory: null,
        foodFetch: null,
        foodsList: null,
        foodItem: null
    },
    methods: {
        fetchFood: async function(categoryName) {
            const response = await axios.post("http://localhost:8000/api/search", {
                categoryName: categoryName
            });
            
            this.foodsList = response.data.meals;
            this.foodItem = null;
            console.log('response', this.foodsList);
        },
        fetchID: async function(foodName) {
            const response = await axios.post("http://localhost:8000/api/fetch", {
                foodName: foodName
            })

            this.foodItem = response.data.meals;
            this.foodsList = null;
            console.log(this.foodItem);
        }
    }
    // computed: {

    // }
})