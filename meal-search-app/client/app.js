const meals = new Vue({
    el: '#food',
    data: {
        appName: 'Meal Search',
        foodCategory: '',
        food: ''
    },
    methods: {
        fetchFood: async function(categoryName) {
            const response = await axios.post("http://localhost:8000/api/search", {
                categoryName: categoryName
            });
            
            console.log('response', response.data.meals);
        },
        fetchID: async function(foodID) {
            const response = await axios.post("http://localhost:8000/api/fetch", {
                foodID: foodID
            })

            console.log(response);
        }
    }
})