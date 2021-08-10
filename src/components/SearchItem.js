function SearchItem(props){

    let d=props.data
    let handleChange=(e)=>{
       
        props.onMove(d,e.target.value);
    }
    return(
    <div className='listitem'>
                <p>{d.Title}</p>
               <img src={d.imageLinks.thumbnail} alt='thumbnail'></img>
                   <select id='selection' onChange={handleChange}>
                      <option>Move to</option>
                       <option value='currentReading'>Current Reading</option>
                      <option value='wantToRead'>Want to Read</option>
                      <option value='read'>Read</option>
                      </select>
           </div>
    )
}
export default SearchItem;