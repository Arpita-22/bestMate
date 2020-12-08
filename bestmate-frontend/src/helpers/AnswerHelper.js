
//This is just a direct string match.. can be much more!!
const AnswerHelper = (question, user) => {
    if(question.includes("relative")){
        let relativesString = "";
        user.relatives.map(relative =>{
            if(relative){
                relativesString += relative.name + ", ";
            }            
        });
        if(!relativesString || relativesString.length === 0){
            return "You have no relatives."
        } else {
            return "Your relatives are " + relativesString; 
        }
    }
    if(question.includes("food")){
        let foods = "";
        user.allowed_foods.map(food =>{
            if(food){
                foods += food.name + ", ";
            }            
        });
        if(!foods || foods.length === 0){
            return "You have no allowed foods."
        } else {
            return "Your foods are " + foods; 
        }
    }
    if(question.includes("address")){
        return "Your address is " + user.address;
    }

}
export default AnswerHelper;