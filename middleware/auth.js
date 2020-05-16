export default function({ store, redirect, route }) {
	console.log(route.fullPath);
  const userIsLoggedIn = store.state.token; //This accesses the user token from state
  console.log("The token, ", userIsLoggedIn)
  const urlRequiresAuth =
    /^\/app(\/|$)/.test(route.fullPath)
    const dynamicPost = /^\/app\/post(\/|$)/.test(route.fullPath)

  //Check if user is logged in and page requires authentication
  if (userIsLoggedIn && urlRequiresAuth) {
    return route.fullPath;
    // redirect("/user")
  }
  else if (userIsLoggedIn && !urlRequiresAuth) {
    redirect("/app")
  }
  else if (!userIsLoggedIn && dynamicPost) {
    return route.fullPath;
  }
  else if (!userIsLoggedIn && urlRequiresAuth) {
    // return route.fullPath;
    redirect("/login")
  }
}
