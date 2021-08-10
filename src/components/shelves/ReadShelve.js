import ListView from "../listcomp/ListView";
function ReadShelve(props){
    let up=(from,index,to)=>{
        props.update(from,index,to)
    }
    return(
        <div>
            <p>{props.state}</p>
              <ListView update={up} dataSource={props.dataSource} state={props.state}></ListView>
  
        </div>
      
    )
}
export default ReadShelve