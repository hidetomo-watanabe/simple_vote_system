<template>
  <v-app>
    <v-container>
      <ItemForm/>
      <ItemBoard/>
      <Comment/>
    </v-container>
  </v-app>
</template>

<script>
  import ItemBoard from './ItemBoard'
  import ItemForm from './ItemForm'
  import Comment from './Comment'

  export default {
    name: 'Main',
    components: {
      ItemBoard,
      ItemForm,
      Comment,
    },
  }
</script>
