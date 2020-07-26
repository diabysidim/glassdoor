

module.exports =  (inputObject, requiredInfo)=>{
    const missingInfo =[];
    for( let info of requiredInfo) {
        
       
            if(!inputObject[info]) {

                missingInfo.push(info);
            }

    }  
    
    return missingInfo;

}