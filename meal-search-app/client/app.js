const meals = new Vue({
    el: '#food',
    data: {
        appName: 'Meal Search',
        foodCategory: '',
        food: ''
    },
    methods: {
        fetchFood: async function(test) {
            const response = await axios.post("http://localhost:8000/api/fetch", {
                test: test
            });
            this.food = response.data;
            console.log(this.food);
        }
    }
})