const storageUntil = {
    //保存user
    saveUser(user){
        localStorage.setItem('user_key',JSON.stringify(user))
        
    },
    //读取user
    getUser(){
        return JSON.parse(localStorage.getItem('user_key') || '{}')
    },
    //删除user
    removeUser(){
        localStorage.removeItem('user_key')
    }
}

export default storageUntil