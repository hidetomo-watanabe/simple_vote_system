<template>
  <v-app>
    <v-container>
      <Vote/>
      <Form/>
      <ChatBoard/>
    </v-container>
  </v-app>
</template>

<script>
  import Vote from './components/Vote'
  import ChatBoard from './components/ChatBoard'
  import Form from './components/Form'

  export default {
    name: 'App',
    components: {
      Vote,
      ChatBoard,
      Form,
    },
  }
</script>
