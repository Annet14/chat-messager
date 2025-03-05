<template>
   <h2 class="title">Chat <img src="../assets/msg.png" alt="icon message"></h2>
 
   <div class="chat">
     <div class="messages" ref="messageContainer">
       <div
         v-for="(message, id) in messages"
         :key="id"
         v-bind:class="['message', message.user === username ? 'my-message' : 'other-message']"
       >
         <div class="user-name">{{ message.user }}</div>
         <div class="user-text">{{ message.text }}</div>
         <span class="time">{{ message.time }}</span>
       </div>
     </div>
 
     <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="your message..." />
     <button @click="sendMessage"></button>
   </div>
 </template>
 
 <script>
 import { db, ref, push, onChildAdded } from "../firebase";
 
 export default {
   data() {
     return {
       newMessage: "",
       messages: [],
       username: "User" + Math.floor(Math.random() * 100),
     };
   },
   mounted() {
     const messagesRef = ref(db, "messages");
 
     onChildAdded(messagesRef, (snapshot) => {
       this.messages.push(snapshot.val());
       this.scrollToBottom();
     });
   },
   methods: {
     sendMessage() {
       if (this.newMessage.trim() !== "") {
         const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
 
         push(ref(db, "messages"), {
           user: this.username,
           text: this.newMessage,
           time: timeNow,
         });
 
         this.newMessage = "";
       }
     },
     scrollToBottom() {
       this.$nextTick(() => {
         const container = this.$refs.messageContainer;
         if (container) container.scrollTop = container.scrollHeight;
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
  height: 20px;
  width: 20px;
}
.chat {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  height: 500px;
  box-shadow: 5px 5px 20px rgba(255, 255, 255, 0.3), -5px -5px 20px rgba(255, 255, 255, 0.3);
}

.user-name {
   background: transparent;
   font-size: 12px;
   color: #ddff00;
}

.user-text {
   background: transparent;
}

.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 430px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding-right: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

.messages .my-message {
  align-self: flex-end;
  margin-top: 10px;
  background: #34357a;
  color: white;
  text-align: right;
}

.messages .other-message {
  align-self: flex-start;
  background: #ededed;
  color: rgb(0, 0, 0);
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
  color: #ffffff56;
}

.message {
  display: block;
  width: fit-content;
  padding: 10px;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 70%;
}

.time {
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: #eaff00;
  justify-content: flex-end;
  right: 10px;
  background: transparent;
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
