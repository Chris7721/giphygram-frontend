export default function({ $axios, store }) {
    $axios.onRequest(config => {
      if (store.state.token) {
        config.headers.common["Authorization"] =
          "Bearer" + " " + store.state.token;
      }
      else{
        console.log("found token no", store.state)
      }
    });
  
    // $axios.onError(error => {
    //   const code = parseInt(error.response && error.response.status);
    //   if (error.message.toLowerCase() == "network error") {
    //     store.commit("set_page_state", true);
    //     redirect("/no-network");
    //   } else if (code == 401) {
    //     store.commit("set_page_state", true);
    //     redirect("/login");
    //   }
    // });
  }