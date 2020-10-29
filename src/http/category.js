import instance from "./http";

function categorySave(data) {
    return new Promise((resolve,reject)=>{
        instance.post('/admin/category/save',data).then(res=>{
            resolve(res)
        }).catch(error=>{
               reject(error)
        })
    })
}
function categoryIndex() {
    return new Promise((resolve,reject)=>{
        instance.get('/admin/category').then(res=>{
            resolve(res)
        }).catch((error)=>{
            reject(error)
        })
    })
}
function categoryUpdate() {

}
function categoryRead(id) {
    return new Promise((resolve,reject)=>{
        instance.get('/admin/category',id).then(res=>{
            resolve(res)
        }).catch((error)=>{
            reject(error)
        })
    })
}
function categoryDelete(id) {
    return new Promise((resolve,reject)=>{
        instance.post('/admin/cat',[id]).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export {categorySave,categoryDelete,categoryUpdate,categoryIndex,categoryRead}