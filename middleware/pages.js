export default function(context) {
    // updates store with current page
    context.store.commit('updatePage', context.route.path?.split('/')[2] || 'app')
  }
  