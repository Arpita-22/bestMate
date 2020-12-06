
//This is just a direct string match.. can be much more!!
const AnswerHelper = (question, user) => {
    if(question.includes("relative")){
        let relatives = "";
        user.relatives.map(relative =>{
            if(relative){
                relatives += relative.name + " ";
            }            
        });
        if(!relatives || relatives.length === 0){
            return "You have no relatives."
        } else {
            return "Your relatives are " + relatives; 
        }
    }
    if(question.includes("food")){
        let foods = "";
        user.allowed_foods.map(food =>{
            if(food){
                foods += food.name + " ";
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