<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { logout } from '@/composables/logout';
//import Dialog from 'primevue/dialog';

function log(){
  logout();
}
const userStore = UserStore();
const items = [
  { to: "/", label: "Home", icon: "pi pi-fw pi-home" },
  //{ to: "/chat", label: "Chats", icon: "pi pi-fw pi-book" },
  { to: "/add", label: "Add new lego", icon: "pi " },
];
</script>

<template>
<div v-if="userStore.email.length > 0" style="padding-bottom:20px;">
  <div class="bg-gray-900" style="padding:5px;">
    <Menubar class="bg-gray-900 text-gray-400" style="border:0;border-radius:0;" :model="items">
      <template #start>
          <router-link to="/"><img src="https://www.pngall.com/wp-content/uploads/5/Lego-Toy-PNG-High-Quality-Image.png" alt="Image" height="50" class="mr-2"></router-link>
      </template>
      <template #end>
          <Button icon="pi pi-sign-out" class="p-button-text" v-on:click="log()" />
      </template>
    </Menubar>
  </div>
</div>
</template>

<style>
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-menuitem-text{
  color:var(--gray-400) !important;
}
.p-menuitem-link:hover{
  background:#424242!important;
}
</style>
