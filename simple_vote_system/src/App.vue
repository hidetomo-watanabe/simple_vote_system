<template>
  <v-app>
    <v-container>
      <Vote/>
      <ChatBoard/>
    </v-container>
  </v-app>
</template>

<script>
  import Vote from './components/Vote'
  import ChatBoard from './components/ChatBoard'

  export default {
    name: 'App',
    components: {
      Vote,
      ChatBoard
    },
  }
</script>
