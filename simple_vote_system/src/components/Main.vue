<template>
  <v-app>
    <v-container>
      <ItemForm/>
      <ItemBoard/>
      <ChatForm/>
      <ChatBoard/>
    </v-container>
  </v-app>
</template>

<script>
  import ItemBoard from './ItemBoard'
  import ItemForm from './ItemForm'
  import ChatBoard from './ChatBoard'
  import ChatForm from './ChatForm'

  export default {
    name: 'Main',
    components: {
      ItemBoard,
      ItemForm,
      ChatBoard,
      ChatForm,
    },
  }
</script>
