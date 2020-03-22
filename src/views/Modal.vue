<template>
  <div class="modal" v-show="modalOpen">
    <div class="container">
      <input type="text" v-model="item.name" placeholder="name" />
      <input type="url" v-model="item.url" placeholder="url" />
      <input type="number" v-model="item.prize" placeholder="prize" />
      <button v-on:click="addProduct()">Add product</button>
    </div>
  </div>
</template>
    
    <script>
export default {
  name: "Modal",
  props: ["modalOpen"],

  created: function() {
    this.initItem();
  },
  methods: {
    initItem() {
      this.item = {
        name: "",
        url: "",
        prize: null
      };
    },

    close() {
      console.log(this.item);
      this.$emit("input", !this.value);
    },
    addProduct: function() {
      this.$http
        .post("http://localhost:3000/products", this.item)
        .then(close());
    }
  }
};
</script>
    
  