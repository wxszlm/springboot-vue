<template>
    <div class="main_bg " :class="typ">
        <p v-html="message"></p>
    </div>
</template>
<script>
	export default{
		props:{
			message: {type:String,default:'提示消息'},
			duration:{type:Number,default:2000},
			type:{type:String,default:''}
		},
		data () {
			return {
				typ:''
			}
		},
		updated(){
			if(this.type === 'error')this.typ = 'ERROR';   //错误
			if(this.type === 'waring')this.typ = 'WARING';      //警告
			if(this.type === 'success')this.typ = 'SUCCESS';    //成功
		},
		methods:{
			closeToast: function () {
				this.close();
			}
		},
	}
</script>
<style scoped >

    .main_bg{
        position: fixed;
        top: 20px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        padding: 15px;
        min-width: 380px;
        text-align:center;
        background-color: #edf2fc;
        z-index:99999999;
        color:#999;
        left:50%;
        transition: opacity .3s ,transform .4s;
        transform:translate(-50%,-100%);
        opacity: 0;
    }
    .main_bg.open{
        transform:translate(-50%,0);
        opacity: 1;
    }

    .main_bg p{
        color:#999;
    }
    /*错误*/
    .main_bg.ERROR{
        background-color:#fef0f0;
        color:#f56c6c;
    }
    .main_bg.ERROR p{
        color:#f56c6c;
    }
    .main_bg.SUCCESS{
        background-color:#f0f9eb;
        color:#67c23a;
    }
    .main_bg.SUCCESS p{
        color:#67c23a;
    }
    .main_bg.WARING{
        background-color:#fdf6ec;
        color:#e6a23c;
    }
    .main_bg.WARING p{
        color:#e6a23c;
    }
    p{
        font-size: 14px;
    }
</style>
