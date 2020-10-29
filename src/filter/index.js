let filter={
    capitalize(value,position){
        return value.substring(0,position).toUpperCase()+value.substring(1);
    },
    formateTime(value){
        let date=new Date(value);
        let time=[date.getFullYear(),date.getMonth()+1,date.getDate()].join()
        return time;
    }
}



export default filter