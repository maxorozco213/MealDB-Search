const meals = new Vue({
    el: '#food',
    data: {
        appName: 'Meal Search',
        foodCategory: '',
        foodItem: '',
        foodsList: null
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

            foodItem = response;
            console.log(foodItem);
        }
    }
})