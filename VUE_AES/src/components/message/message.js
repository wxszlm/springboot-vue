//引用模板文件
import Message from './message.vue';
//新建一个对象，用来保存实例
let plugin = {};
//删除dom元素
let removeDom =(el) => {
	el.classList.remove('open');
	setTimeout(()=>{
		el.parentNode.removeChild(el);
	},400);
};
plugin.install = function (Vue) {
	const ToastController = Vue.extend(Message);

	// 实现关闭方法
	// ToastController.prototype.close = function () {
	// 	removeDom(this.$el);
	// };
	// 在Vue的原型上实现toast的挂在以及功能实现
	// 用户可以再Vue实例通过this.$Toast来访问以下的内容
	Vue.prototype.$message = (option = {}) => {
		//toast实例挂在到刚创建的Div
		let instance = new ToastController().$mount(document.createElement('div'));
		instance.duration = option.duration || instance.duration;
		// 用户可以设置message属性也可以不设置，不设置时：则直接将option的内容作为message的信息进行toast内容展示
		instance.message = option.message || option;
		instance.type = option.type || instance.type;
		// 将toast挂在到DOM上
		document.body.appendChild(instance.$el);
		setTimeout(()=>{
			instance.$el.className = instance.$el.className+' '+'open';
		},10);
		//实现自动关闭
		setTimeout(function () {
			removeDom(instance.$el);
		}, instance.duration)
	}

};

export default plugin;
