//发布订阅模式
class EventEmiter {
    static _events = {};
    static on(eventName, callback) {
        if (this._events[eventName]) {
            //如果有就放一个新的
            this._events[eventName].push(callback);
        } else {
            //如果没有就创建一个数组
            this._events[eventName] = [callback]
        }
    }
    static emit(eventName, rest) {  
        if (this._events[eventName]) { //循环一次执行
            this._events[eventName].forEach((item) => {
                item.apply(this, rest)
            });
        }
    }
    static removeListener(eventName, callback) {
        if (this._events[eventName]) {
            //当前数组和传递过来的callback相等则移除掉
            this._events[eventName] =
                this._events[eventName].filter(item => item !== callback);
        }
    }
    static once(eventName, callback) {
        function one() {
            //在one函数运行原来的函数，只有将one清空
            callback.apply(this, arguments);
            //先绑定 执行后再删除
            this.removeListener(eventName, one);
        }
        this.on(eventName, one);
        //此时emit触发会执行此函数，会给这个函数传递rest参数
    }
}
export default EventEmiter;