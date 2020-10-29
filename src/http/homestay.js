import instance from "./http";

function homestaySave() {

}
function homestayIndex() {

}
function homestayUpdate(sid,data) {
    return new  Promise((resolve, reject) => {
        instance.put('/api/homestay/'+sid,data).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}
function homestayRead(sid) {
    return new Promise((resolve, reject) => {
        instance.get('/api/homestay/'+sid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}
function homestayDelete() {

}

export {homestaySave,homestayDelete,homestayUpdate,homestayIndex,homestayRead}