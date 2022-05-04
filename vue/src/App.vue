<script>
function changeTheme(theme) {
  let themeElement = document.getElementById("theme-link");
  if (themeElement == null) return;
  themeElement.setAttribute(
    "href",
    "https://unpkg.com/primevue/resources/themes/" + theme + "/theme.css"
  );
}
export default {
  data() {
    return {
      selectedTheme: {
        name: "Lara light indigo",
        code: "lara-light-indigo",
      },
      themes: [
        { name: "Lara light (Default)", code: "lara-light-indigo" },
        //{ name: "Fluent", code: "fluent-light" },
        { name: "Bootstrap", code: "bootstrap4-light-blue"},
        //{ name: "MD", code: "md-light-indigo" },
        { name: "Material", code: "mdc-light-indigo" },
        { name: "Rhea", code: "rhea" },
        { name: "Tailwind", code: "tailwind-light" },
        { name: "Nova", code:"nova-vue"}
      ],
    };
  },
  created() {
    const theme = localStorage.getItem("theme");
    if (theme != null) {
      const themeObject = JSON.parse(theme);
      this.selectedTheme = themeObject;
    }
  },
  watch: {
    selectedTheme: {
      handler(oldVal) {
        localStorage.setItem("theme", JSON.stringify(oldVal));
        changeTheme(oldVal.code);
      },
      deep: true,
    },
  },
};
</script>

<template>
  <MenuComponent></MenuComponent>
  <Dropdown
    v-model="selectedTheme"
    :options="themes"
    optionLabel="name"
    placeholder="Themes"
    style="width:200px;margin-left:10px;"
  />
  <div class="col-12 md:col-10 md:col-offset-1 lg:col-10 lg:col-offset-1" style="margin-top:30px;">
    <RouterView />
  </div>
  <div class="bl"></div>
  <div class="br"></div>
</template>
<style>
body {
  padding: 0px;
  margin: 0px;
  font-family: "Quicksand", sans-serif;
  background: #f1f2f6;
}
.bl {
  position: fixed;
  bottom: 0;
  left: 0;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/319423/lego-bg-bl.png")
    no-repeat;
  background-size: 200px 200px;
  width: 200px;
  height: 200px;
  z-index: -1;
}

.br {
  position: fixed;
  bottom: 0;
  right: 0;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/319423/lego-bg-br.png")
    no-repeat;
  background-size: 200px 200px;
  width: 200px;
  height: 200px;
  z-index: -1;
}
</style>
