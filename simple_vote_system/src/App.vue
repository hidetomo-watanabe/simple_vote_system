<template>
  <v-app>
    <v-container>
      <ItemForm/>
      <Item/>
      <ChatBoard/>
    </v-container>
  </v-app>
</template>

<script>
  import Item from './components/Item'
  import ChatBoard from './components/ChatBoard'
  import ItemForm from './components/ItemForm'

  export default {
    name: 'App',
    components: {
      Item,
      ChatBoard,
      ItemForm,
    },
  }
</script>
