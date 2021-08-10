import SearchItem from "./SearchItem";
function SearchList(props){
    let move=(dt,shelf)=>{
        props.moved(dt,shelf)
    }
  
    return(
        
               <div className='searchlist'>
                {props.dataSource.map(d=>(
            <SearchItem data={d} onMove={move} key={Math.random()}></SearchItem>
             ))}
            </div>
             )

}
export default SearchList;