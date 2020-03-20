<template>
    <div id="all-items">
        <h1>Products</h1>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Url</td>
                <td>Prize</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" v-bind:key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.url }}</td>
                    <td>{{ item.prize }}zł</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
    body {
        background: #F5F5F5;
        color: #333;
    }

    #page {
        background: #FFF;
        padding: 3rem;
    }
</style>

<script>

    export default{
        data(){
            return{
                items: [],
            }
        },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            fetchProductData: function()
            {
                this.$http.get('http://localhost:3000/products').then((response) => {
                    this.items = response.body;
                }, (response) => {
                    console.log(response);
                });
            }
        }
    }
</script>
