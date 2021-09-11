import  mongoose  from "mongoose"


mongoose.connect('mongodb://localhost:27017/todolist', {

})
.then(()=>{
	console.log('connected');
})
.catch((e)=>{
	console.log("Something went wrong", e);
})