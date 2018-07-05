<template>
  <div class="hello">
    <div>
      <Span>{{ response }}</Span>
    </div>
    <div>
      <Button type="primary" @click="sendName">Primary</Button>
    </div>
  </div>
</template>

<script>

  import SockJs from 'sockjs-client';
  import Stomp from 'webstomp-client';
  import axios from 'axios';

  export default {
    name: 'HelloWorld',
    comments: {
      SockJs, Stomp
    },
    data () {
      return {
        socket:'',
        stompClient:'',
        response:'hello world'
      }
    },
    methods:{
      connect(){
        this.socket = new SockJs(process.env.WEB_SOCKET_URL + '/endPoint');
        this.stompClient = Stomp.over(this.socket)
        this.stompClient.connect(
          {},
          frame => {
            this.stompClient.subscribe("/endPoint/getResponse", tick => {
              this.response = JSON.stringify(tick);
            });
          },
          error => {
            console.log(error);
          }
        );
      },
      disconnect() {
        if (this.stompClient != null) {
          this.stompClient.disconnect();
        }
        console.log('Disconnected');
      },
      sendName() {
        this.stompClient.send("/welcome", JSON.stringify("xxxxxxx"), {});
      }
    },
    beforeMount(){
      this.connect();
      axios.get('/envApi/getEnv').then(res=>{
        console.log(res)
      })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
