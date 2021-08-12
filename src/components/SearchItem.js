import { Component } from "react";

class  SearchItem extends Component{
    state={
       selectedOption:'none'
    }
    handleChange=(e)=>{
     
     this.setState({
        selectedOption:e.target.value
     })
    
      
        this.props.onMove(this.props.data,e.target.value);
       }
       render(){
         return(
    <div className='listitem'>
                <h1>{this.props.data.title}</h1>
                {('imageLinks' in this.props.data)?(
                    <img src={this.props.data.imageLinks.thumbnail} alt='thumbnail'></img>)
                 :(
                    <p>No image Available</p>
                 )
                } 
 
                <p>{this.props.data.authors}</p>

                   <select   id='selection' onChange={this.handleChange} value={this.state.selectedOption}>
                      <option disabled>Move to</option>
                       <option value='currentlyReading'>Current Reading</option>
                      <option value='wantToRead'>Want to Read</option>
                      <option value='read'>Read</option>
                      <option value='none'>None</option>
                      </select>
           </div>
    )
 }
   
}
export default SearchItem;