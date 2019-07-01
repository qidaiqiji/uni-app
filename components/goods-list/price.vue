<template>
    <view class="prices">{{ getPrice }}</view>
</template>

<script>
export default {
    props: {
        price: {
            default: 0
        },
        size: {
            default: 0
        }
    },
    computed: {
        getPrice() {
            if (!this.price) {
                return '';
            }
            let array = this.price.split('.');
            if (this.size > 0) {
                return '.' + array[this.size];
            }
            return array[this.size];
        }
    },
    data() {
        return {};
    }
};
</script>

<style>
.prices {
    display: inline-block;
}
</style>
