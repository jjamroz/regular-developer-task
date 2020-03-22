<template>
  <div id="all-items">
    <h1>Products</h1>
    <div>
      <button v-on:click="openModalAdd()">Open Modal</button>
      <Modal :modalOpen="modalOpen" :currentItem="currentItem"></Modal>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Url</td>
          <td>Prize</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.prize }}zł</td>
          <td>
            <button v-on:click="deleteProduct(item.id)">DELETE</button>
            <button v-on:click="openModalEdit(item)">EDIT</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
body {
  background: #f5f5f5;
  color: #333;
}

#page {
  background: #fff;
  padding: 3rem;
}
</style>

<script>
import Modal from "./Modal.vue";

export default {
  components: {
    Modal
  },

  data() {
    return {
      modalOpen: false,
      currentItem: null,
      items: []
    };
  },

  created: function() {
    this.fetchProductData();
    this.currentItem = { name: "", url: "", price: null };
  },

  methods: {
    fetchProductData: function() {
      this.$http.get("http://localhost:3000/products").then(
        response => {
          this.items = response.body;
        },
        response => {
          console.log(response);
        }
      );
    },
    deleteProduct: function(id) {
      this.$http.delete(`http://localhost:3000/products/${id}`).then(() => {
        this.items = this.items.filter(item => {
          return item.id !== id;
        });
      });
    },
    openModalAdd() {
      this.modalOpen = !this.modalOpen;
    },
    openModalEdit(item) {
      this.currentItem = item;
      this.modalOpen = !this.modalOpen;
    }
  }
};
</script>