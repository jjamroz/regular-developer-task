<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1>Products</h1>
        <button class="btn btn-default" v-on:click="addProduct()">
          <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <div class="row">
      <div
        v-bind:class="{ 'col-md-12': !isFormActive, 'col-md-8': isFormActive }"
      >
        <div id="all-items">
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
                  <button v-on:click="deleteProduct(item.id)">
                    <span
                      class="glyphicon glyphicon-remove"
                      aria-hidden="true"
                    ></span>
                  </button>
                  <button v-on:click="editProduct(item)">
                    <span
                      class="glyphicon glyphicon-pencil"
                      aria-hidden="true"
                    ></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4" v-if="isFormActive">
        <form>
          <div class="form-group">
            <label for="nameInput">name</label>
            <input
              v-model="currentItem.name"
              type="text"
              class="form-control"
              id="nameInput"
              placeholder="product name"
            />
          </div>
          <div class="form-group">
            <label for="urlInput">url</label>
            <input
              v-model="currentItem.url"
              type="text"
              class="form-control"
              id="urlInput"
              placeholder="url"
            />
          </div>
          <div class="form-group">
            <label for="prizeInput">prize</label>
            <input
              v-model="currentItem.prize"
              type="number"
              class="form-control"
              id="prizeInput"
              placeholder="prize"
            />
          </div>
          <button
            v-if="isUpdate"
            type="submit"
            class="btn btn-default"
            v-on:click="patchProduct()"
          >
            UPDATE Product
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-default"
            v-on:click="postProduct()"
          >
            ADD Product
          </button>
          <button
            type="submit"
            class="btn btn-default"
            v-on:click="clearForm()"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
h1 {
  display: inline-block;
  margin-right: 1rem;
}

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
export default {
  data() {
    return {
      isFormActive: false,
      isUpdate: false,
      currentItem: {},
      items: []
    };
  },

  created: function() {
    this.fetchProductData();
  },

  methods: {
    fetchProductData: function() {
      this.$http.get('http://localhost:3000/products').then(
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

    patchProduct: function() {
      this.$http
        .patch(
          `http://localhost:3000/products/${this.currentItem.id}`,
          this.currentItem
        )
        .then(() => {
          this.clearForm();
        });
    },
    postProduct: function() {
      this.$http
        .post(`http://localhost:3000/products`, this.currentItem)
        .then(() => {
          this.clearForm();
        });
    },
    addProduct() {
      this.isFormActive = true;
      this.isUpdate = false;
    },
    editProduct(item) {
      this.currentItem = item;
      this.isFormActive = true;
      this.isUpdate = true;
    },
    clearForm: function() {
      this.isFormActive = false;
      this.currentItem = {};
      this.isUpdate = false;
    }
  }
};
</script>
