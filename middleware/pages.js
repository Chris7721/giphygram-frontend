export default function(context) {
    // updates store with current page
    console.log(context.route.fullPath)
    context.store.commit('updatePage', context.route.path?.split('/')[2] || 'app')
  }
  