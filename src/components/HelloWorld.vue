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
        response:'hello world',
        socket: null,
        response: null,
      };
    },
    methods:{
      connect(){
        this.socket = new SockJs(process.env.WEB_SOCKET_URL + '/endPoint');
        this.stompClient = Stomp.over(this.socket)
        this.stompClient.connect(
          {},
          (frame) =>{
            this.stompClient.subscribe("/queue/getResponse", (tick)=>{
              this.response = tick.body;
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
