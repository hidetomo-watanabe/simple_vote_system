<template>
  <v-app>
    <v-container>
      <Item/>
      <Form/>
      <ChatBoard/>
    </v-container>
  </v-app>
</template>

<script>
  import Item from './components/Item'
  import ChatBoard from './components/ChatBoard'
  import Form from './components/Form'

  export default {
    name: 'App',
    components: {
      Item,
      ChatBoard,
      Form,
    },
  }
</script>
