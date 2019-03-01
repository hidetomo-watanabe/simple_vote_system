<template>
  <v-app>
    <v-container>
      <ItemForm/>
      <Item/>
      <ChatBoard/>
      <ChatForm/>
    </v-container>
  </v-app>
</template>

<script>
  import Item from './components/Item'
  import ItemForm from './components/ItemForm'
  import ChatBoard from './components/ChatBoard'
  import ChatForm from './components/ChatForm'

  export default {
    name: 'App',
    components: {
      Item,
      ItemForm,
      ChatBoard,
      ChatForm,
    },
  }
</script>
