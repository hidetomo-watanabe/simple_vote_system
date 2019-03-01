<template>
  <v-app>
    <v-container>
      <ItemForm/>
      <ItemBoard/>
      <ChatBoard/>
      <ChatForm/>
    </v-container>
  </v-app>
</template>

<script>
  import ItemBoard from './components/ItemBoard'
  import ItemForm from './components/ItemForm'
  import ChatBoard from './components/ChatBoard'
  import ChatForm from './components/ChatForm'

  export default {
    name: 'App',
    components: {
      ItemBoard,
      ItemForm,
      ChatBoard,
      ChatForm,
    },
  }
</script>
