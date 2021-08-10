import ListView from "../listcomp/ListView";
function CurrentlyReadingShelve(props){
    let up=(from,index,to)=>{
        props.update(from,index,to)
    }
    return(
            <div>
                <p>{props.state}</p>
                 <ListView update={up}  dataSource={props.dataSource} state={props.state} category={props.category}></ListView>
   
            </div>
            
        )
}
export default CurrentlyReadingShelve;