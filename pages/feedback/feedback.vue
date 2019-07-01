<template>
    <view class="feedback-page">
        <!-- auto-height="true" -->
        <view class="feedback-textarea">
            <textarea class="textarea" v-model="textareaValue" maxlength="-1" placeholder-style="color:#D4D4D4" placeholder="请输入反馈意见内容"></textarea>
        </view>
        <view class="action-box feedback-btn"><text class="btn send-btn" :class="{ 'unsend-btn': getTextareaValue }" @tap="getContent()">提交</text></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            unContent: true,
            textareaValue: ''
        };
    },
    computed: {
        getTextareaValue() {
            //this.unContent = this.textareaValue.length >= 20 ? false : true;
            // return this.textareaValue.length >= 20 ? false : true;
			return false;
        }
    },
    onLoad() { },
    methods: {
        async getContent() {
            // if (this.textareaValue.length < 20) {
            //     return;
            // }
			if(!this.textareaValue || this.textareaValue == " "){
				this.$api.showMessage('请输入反馈意见内容');
				return;
			}
            let res = await this.$api.request({
                method: 'POST',
                url: this.$api.user_serviceMessage,
                data: { content: this.textareaValue }
            });
            if (res && res.code == 0) {
                this.$api.showMessage('反馈成功');
                this.textareaValue = '';
            }
        }
    }
};
</script>

<style lang="less">
@import url('./feedback.less');
</style>
