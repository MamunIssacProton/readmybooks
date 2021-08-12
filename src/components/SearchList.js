import SearchItem from "./SearchItem";
function SearchList(props){
    let move=(dt,shelf)=>{
        props.moved(dt,shelf)
    }
  let tr=(e,es)=>{
    console.log('e',e);
    props.moved(e,es)
  }
    return(
        
               <div className='searchlist'>
                {props.dataSource.map(d=>(
            <SearchItem t={tr} data={d} onMove={move} key={Math.random()}></SearchItem>
             ))}
            </div>
             )

}
export default SearchList;