import {Component} from 'react';
class  ItemView extends Component{
 //  d=this.props.data
   
     prev=this.props.state
    state={
        selectedShelf:this.prev,
        prevShelf:''
    }

     handleChange=(event)=>{
        console.log(event.target.value);
        this.setState({
            selectedShelf:event.target.value,
            prevShelf:this.prev
        })
        this.props.delete(this.state.selectedShelf,this.props.data,event.target.value);
    }
    render(){
    return(
        <div className='listitem'>
        
            <p>{this.props.data.title}</p>
            {'imageLinks' in this.props.data?(
                 <img src={this.props.data.imageLinks.thumbnail} alt='thumbnail'></img>
            ):(
                <p>No Image Available</p>
            )}
           <h6>{this.props.data.authors}</h6>
            <select id='selection' onChange={this.handleChange} value={this.state.selectedShelf} >
            
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
export default ItemView;