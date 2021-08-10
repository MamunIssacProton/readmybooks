import {Component} from 'react';
class  ItemView extends Component{
     d=this.props.data
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
        this.props.delete(this.state.selectedShelf,this.d,event.target.value);
    }
    render(){
    return(
        <div className='listitem'>
            <p>{this.d.Title}</p>
            <img src={this.d.imageLinks.thumbnail} alt='thumbnail'></img>
            <select id='selection' onChange={this.handleChange} value={this.state.selectedShelf} >
            <option disabled>Move to</option>
            <option value='currentReading'>Current Reading</option>
            <option value='wantToRead'>Want to Read</option>
           <option value='read'>Read</option>
        </select>
        </div>
    )
    }
}
export default ItemView;