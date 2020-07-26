

module.exports =  (inputObject, rules)=>{
    const NotAllowedItems =[];
    for( let rule of rules) {
        
       
            if(inputObject[rule]) {

                NotAllowedItems.push(rule);
            }

    }  
    
    return NotAllowedItems;

}