<template>
   <h2 class="title">Chat <img src="../assets/msg.png" alt="icon message"></h2>

   <div class="chat">

      <div class="messages" ref="messageContainer">
       <div v-for="(message, id) in messages"
       :key="id"
       class="message">
       {{ message.user }}: {{ message.text }}

         <span class="time">{{ message.time }}</span>
       </div>
     </div>

     <input v-model="newMessage"
     @keyup.enter="sendMessage"
     placeholder="your message..."
     />

     <button @click="sendMessage"></button>

   </div>
 </template>

<script>
export default {
  data() {
    return {
      newMessage: "",
      messages: [],
    };
  },
  watch: {

    messages() {
      this.scrollToBottom();
    },
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        this.messages.push({ time: timeNow, user: "You", text: this.newMessage });
        this.newMessage = "";
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {

      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  color: #fff;
}
.title img {
  position: relative;
  height: 25px;
  width: 25px;
}
.chat {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid hsl(264, 90%, 48%);
  border-radius: 5px;
  height: 500px;
}
.messages {
  height: 430px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding-right: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

.messages::-webkit-scrollbar {
  width: 8px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.messages::-webkit-scrollbar-track {
  background: transparent;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ffffff;
  border-radius: 5px;
}

input::placeholder {
  font-size: 15px;
  color: #fff;
}

.message {
  padding: 10px;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.time {
  display: flex;
  font-size: 12px;
  color: #aaa;
  justify-content: flex-end;
  right: 10px;
}

input {
  width: 80%;
  padding: 10px;
  background: transparent;
  color: #fff;
}
button {
  margin-top: 20px;
  padding: 5px;
  height: 25px;
  width: 25px;
  margin-left: 20px;
  background: transparent;
  background-image: url('../assets/send.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
}
</style>