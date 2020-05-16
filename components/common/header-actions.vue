<template>
    <div class="actions_buttons">
        <button class="button w-md blue">Login</button>
        <button class="button w-md white">Sign up</button>
    </div>
</template>

<style lang="scss" scoped>
.actions_buttons{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > *{
        min-height: 25px !important;
        padding: 3px;
        color: #fff;
        border: 1px solid transparent;
        box-shadow: none;
    }

    .blue{
        background-color: #0095f6ff;
        margin-right: 10px;
    }
    .white{
        background-color: transparent;
        color: #0095f6ff;
    }
}
</style>