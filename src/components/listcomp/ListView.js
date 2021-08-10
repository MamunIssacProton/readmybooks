import ItemView from "./ItemView"
function ListView(props){

    let  del=(from,data,to)=>{
     console.group('data from',from,data,to);
      
      console.groupEnd()
      console.log('props data ', props.dataSource)
      let index=props.dataSource.findIndex(x=>x.id===data.id)
      console.log('index', index);
      props.update(from,data,to)
    }
   
    return(
      props.dataSource.map(data=>(
            <ItemView data={data} state={props.state} key={Math.random()} delete={del}></ItemView>
        ))
      )
}
export default ListView;
