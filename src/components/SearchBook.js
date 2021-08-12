import  { Component } from "react"
import {Link} from 'react-router-dom'
import SearchList from "./SearchList"
import * as API from '../apis/BooksApi'

class  SearchBook extends Component {
    state={
        showErr:false,
        results:[]
    }
     search = (text) => {
  
    let txt=text.target.value;
  
      if(txt.length>0&&txt[0]!==' ') {
            console.log('tx',txt);
           API.search(text.target.value).then((data)=>{
             console.log('in search',data);
              
            if(data===undefined||data.length===0||data.error){
                this.setState({
                    showErr:true,
                  //  results:[]
                })
            }
            else{
                
                    this.setState({
                   results:data,
                   showErr:false
                        })
                    console.log('added',data);
                 
                 }
           
    }).catch(r=>{
        console.log('error',r);
    })}
    else{
        this.setState({
            showErr:true
        })
    }
       
}
  move=(e,shelf)=>{
   this.props.addCollection(e,shelf)
 }
    render(){
        return(
            <div className='search-books'>
               
               <div className="search-books-bar">
                   
                   <Link to='/'>
                    <button className="close-search" >Close</button>
                </Link>
                
                    
              
             <div className="search-books-input-wrapper">
               
                <input type="text" id="searchText" onChange={this.search}  placeholder="Search by title or author"  />

              </div>
            </div>
            {this.state.showErr?(<div className='err'>
                <h1>Nothing has  found</h1>
            </div>):(
                   <SearchList dataSource={this.state.results} moved={this.move}></SearchList>
           
            )}
          </div>
        )
    }

        
    
}
export default SearchBook;