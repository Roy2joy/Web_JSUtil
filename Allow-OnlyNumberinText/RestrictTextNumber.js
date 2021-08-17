function restrictTextNumber(ele) {
    //call this function with this element
    //helpful to transform type=text into number
    //as builting check of html such as minlength and maxlength only works on 
    //text not on contact
    var actualValue = ele.value

    if (actualValue.length > 0) {
        let filterVal="";
        for(let i=0;i<actualValue.length;i++){
            if(  actualValue[i].charCodeAt(0) >= 48 &&
                 actualValue[i].charCodeAt(0) <= 57
            ){
                filterVal=filterVal+actualValue[i]
            }
        }
        ele.value=filterVal;    
    }
}