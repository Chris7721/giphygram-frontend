import Vue from "vue";

Vue.mixin({
  methods: {
    selectDocument(payload) {
      document.getElementById(payload).click();
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    copyToClipboard(text) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      const copyText = `localhost:3000/app/post/${text}`
      dummy.value = copyText;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.$store.dispatch("set_copied", true)
  },
  numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  },
  jsUcfirst(string) {
    return (
      string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() || string
    );
  },
  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 },
 randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
},
showUploadModal(){
  this.$refs["newPostModal"].openModal(this.post);
},
backtoTop(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

  }
});
