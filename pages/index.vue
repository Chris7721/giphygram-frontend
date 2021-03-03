<template>
  <div class="login" />
</template>

<script>
export default {
  asyncData({redirect}) {
    return redirect('/login')
  }
}
</script>
