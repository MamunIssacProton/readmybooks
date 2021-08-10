import {Component} from 'react';
import * as API from './apis/BooksApi'
import CurrentlyReading from './components/shelves/CurrentlyReadingShelve'
import WantToRead from './components/shelves/WantToReadShelve'
import SearchBook from './components/SearchBook'
import Read from './components/shelves/ReadShelve'
import {Link,Route} from 'react-router-dom'
let currentReading=[],wantToRead=[],read=[]

class BookShelves extends Component{

    state ={
        'currentList':currentReading,
        'upcommingList':wantToRead,
        'completedList':read,
        'inSearch':false
      }
    
  componentDidMount(){
   API.getAll().then((user)=>{
       const categories=new Set(( Object.values(user)).map(x=>x.shelf));
       categories.forEach(category => {
        
            let itm=new Set((Object.values(user).filter(x=>x.shelf===category)))
            itm.forEach(val=>{

                switch (category) {
                    case 'currentlyReading':
                        currentReading.push(val)
                       
                        break;
                    case 'wantToRead':

                        wantToRead.push(val)
                       break;

                    case 'read':
                        read.push(val)
                        break;
                    default:
                        break;
                }
                console.log(val.title);
                this.setState({
                    'currentList':currentReading,
                    'upcommingList':wantToRead,
                    'completedList':read,
                   })
            })
       });
      
   });
   
   console.log('component mounted',wantToRead);
  
   
}


 updateInState=(from,data,to)=>{

        switch (from) {
            case 'currentReading':
                let  index=this.state.currentList.findIndex(x=>x.id===data.id)
                console.log('idx',index);
                this.state.currentList.splice(index,1)
                console.log('cr',currentReading);
               this.setState({
                'currentList':currentReading,
               })
                break;
            case 'wantToRead':
                let indexx=this.state.upcommingList.findIndex(x=>x.id===data.id)
                console.log('idx',indexx);
                this.state.upcommingList.splice(indexx,1)

                this.setState({
                    'upcommingList':wantToRead
                })
                break;

            case 'read':
                let indexxx=this.state.completedList.findIndex(x=>x.id===data.id)
                console.log('idx',indexxx);
                this.state.completedList.splice(indexxx,1)
                this.setState({
                    'read':read
                })
                break;
            default:
                break;
        }
        switch (to) {
              case 'currentReading':
                this.state.currentList.push(data)
                this.setState({
                    'currentList':currentReading,
                })
                break;
            case 'wantToRead':
                this.state.upcommingList.push(data)
                this.setState({
                    'upcommingList':wantToRead
                })
                break;

            case 'read':
                this.state.completedList.push(data)
                this.setState({
                    'read':read
                })
                break;
            default:
                break;
        }
    }
  /*

 {this.state.inSearch?(
              <h6>Search</h6>
          ):(<div className='listcontainer'>
              <CurrentlyReading   dataSource={this.state.currentList} state='currentReading' update={this.updateInState}></CurrentlyReading>
              <WantToRead  dataSource={this.state.upcommingList} state='wantToRead' update={this.updateInState}></WantToRead>
              <Read dataSource={this.state.completedList} state='read' update={this.updateInState}></Read>
          </div>)}
  */

    addToShelf=(data,shelf)=>{
        console.log('shelf data',data);
        switch (shelf) {
            case 'currentReading':
                this.state.currentList.push(data)
                this.setState({
                    'currentList':currentReading,
                })
                break;
            case 'wantToRead':
                this.state.upcommingList.push(data)
                this.setState({
                    'upcommingList':wantToRead
                })
                break;

            case 'read':
                this.state.completedList.push(data)
                this.setState({
                    'read':read
                })
                break;
            default:
                break;
        }
    }

  render(){
      return(<div>
          <Route exact path='/search' render={()=>(
              <SearchBook addCollection={this.addToShelf}></SearchBook>
          )
        
        }></Route>
        <Route exact path='/' render={()=>(
            <div className='listcontainer'>
           
            <CurrentlyReading   dataSource={this.state.currentList} state='currentReading' update={this.updateInState}></CurrentlyReading>
            <WantToRead  dataSource={this.state.upcommingList} state='wantToRead' update={this.updateInState}></WantToRead>
            <Read dataSource={this.state.completedList} state='read' update={this.updateInState}></Read>
                 <div className='open-search'>
                     <Link to='/search' >  
                      <button>Search</button>
                     </Link>
                  
                  </div>
             </div>

        )}>

        </Route>
         
         
      </div>)
  }

}
export default BookShelves;