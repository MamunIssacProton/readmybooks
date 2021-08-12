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
  this.syncData();

  
   
}

syncData=()=>{
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
    
}
 updateInState=(from,data,to)=>{
    //API.update(data,to)
   
        switch (from) {
            case 'currentlyReading':
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
              case 'currentlyReading':
                
                this.setState({
                    'currentList':currentReading.concat(data),
                })
                break;
            case 'wantToRead':
              
                this.setState({
                    'upcommingList':wantToRead.concat(data)
                })
                break;

            case 'read':
          
                this.setState({
                    'read':read.push(data)
                })
                break;
            default:
                break;
        }
    
    }

    addToShelf=(data,shelf)=>{
       API.update(data,shelf)
        
        try {
          let currentExist=currentReading.findIndex(x=>x.id===data.id)

          let wantExist=wantToRead.findIndex(x=>x.id===data.id)

          let readExist=read.findIndex(x=>x.id===data.id)
          
          if(currentExist>-1)
          {
            currentReading.splice(currentExist,1)

          }
          if(wantExist>-1)
          {
              wantToRead.splice(wantExist,1)
             
          }
          if(readExist>-1)
          {
              read.splice(readExist,1)
              
          }
        } catch (error) {
            console.log(error);
        }
        
         switch (shelf) {
            case 'currentlyReading':
               let cr=currentReading.push(data)
                this.setState=()=>({
                    'currentList':cr,
                })
                break;
            case 'wantToRead':
               let w= wantToRead.push(data)
                this.setState=()=>({
                    'upcommingList':w
                })
                break;

            case 'read':
               let r=read.push(data)
                this.setState({
                    'read':r
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
           
            <CurrentlyReading   dataSource={this.state.currentList} state='currentlyReading' update={this.updateInState}></CurrentlyReading>
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