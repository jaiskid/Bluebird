import {postRef} from "../firebass";
export default()=>{
    console.log("into the function");
    postRef.once("value",snap=>{
        return snap.val();
    });
};