<template>
  <div class="modal" v-show="modalOpen">
    <div class="container">
      <input type="text" v-model="currentItem.name" placeholder="name" />
      <input type="url" v-model="currentItem.url" placeholder="url" />
      <input type="number" v-model="currentItem.prize" placeholder="prize" />
      <button v-on:click="addProduct()">Add product</button>
    </div>
  </div>
</template>
    
    <script>
export default {
  name: "Modal",
  props: ["modalOpen", "currentItem"],

  methods: {
    close() {
      console.log(this.item);
      this.$emit("input", !this.modalOpen);
    },
    addProduct: function() {
      this.$http
        .post("http://localhost:3000/products", this.item)
        .then(this.close());
    }
  }
};
</script>
    
  