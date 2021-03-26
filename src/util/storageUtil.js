import store from 'store'


const storageUtil = {
    //保存user
    saveUser(user){
        //localStorage.setItem('user_key',JSON.stringify(user))
        store.set('user_key', user)
    },
    //读取user
    getUser(){
        //return JSON.parse(localStorage.getItem('user_key') || '{}')
        return store.get('user_key') || {}
    },
    //删除user
    removeUser(){
        //localStorage.removeItem('user_key')
        store.remove('user_key')
    }
}

export default storageUtil