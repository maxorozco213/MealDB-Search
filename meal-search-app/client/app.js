const meals = new Vue({
    el: '#food',
    data: {
        appName: 'Meal Search',
        foodCategory: '',
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
            console.log('response', this.foodsList);
        },
        fetchID: async function(foodID) {
            const response = await axios.post("http://localhost:8000/api/fetch", {
                foodID: foodID
            })

            this.foodItem = response.data.meals;
            console.log(this.foodItem[0]);
        }
    }
})