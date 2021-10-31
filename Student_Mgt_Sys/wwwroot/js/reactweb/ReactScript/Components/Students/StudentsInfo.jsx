

import React, { Fragment,Component } from 'react';  
import { Dropdown, Menu } from 'semantic-ui-react'
 import { Table, Button, Pagination,Grid,Icon,Form,Input, TableBody} from 'semantic-ui-react';
 import PersonalInfo from './PersonalInfo';
 import DeleteStudent from'./DeleteStudent';

 


export default class StudentsInfo extends Component {  

  constructor(props) {  
      super(props);  
      this.state = {
           business:[],
           openCreateModal: false,
           openDeleteModal: false,
           editstudentId:"",
           addeOrUpdate: "",

          
            addStudent: {
                id:"",
                Name:"",
                LastName:"",
                age:"",
                Date:"",
                Address:"",
                Room_No:"",
                Teacher_name:"",
                Year:""

                },
                displaystu:false,
                showEditSection: false,

        }; 
        
        this.saveData=this.saveData.bind(this)
        this.deleteLanguage=this.deleteLanguage.bind()
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit=this.closeEdit.bind(this)
        this.updateStateData = this.updateStateData.bind(this)
        this.openNew=this.openNew.bind(this)
        this.StudentSelect=this.StudentSelect.bind(this)
        this.CreateData=this.CreateData.bind(this)
        
    }  
    componentDidMount(){  
        this.StudentSelect();
         debugger;  
         
        console.log("Customers:fetchCustomerData")
      
    }
   
   
    StudentSelect()
    { 
        $.ajax({
        url: 'https://localhost:44306/api/student',
        headers: {
           // 'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "GET",
        success: function (res) {
            console.log("load data",res)
            this.setState({ business: res.data });  
            debugger;  
           
        }.bind(this)
    })

    }

    saveData()
    {
        console.log("saveData",this.state.addStudent)
    
        
        $.ajax({
          url: 'https://localhost:44306/api/student/updateStudent',
          headers: {
                         'Content-Type': 'application/json'
          },
          type: "POST",
          data: JSON.stringify(this.state.addStudent),
          success: function (res) {

          console.log("Load Data",res)
          if (res.success == true) {
            console.log("getData",res.data)
           this.StudentSelect();
        } 
        else {
            }
         }.bind(this),
          error: function (res, a, b) {
            console.log(res)
            console.log(a)
            console.log(b)
            
        }  
        }); 
       this.setState({showEditSection: false}) 
       this.setState({ editstudentId:" "})   
        }

  CreateNew()
    {
  console.log("New Student")

    }



  CreateData()
        {
            console.log("Create",this.state.addStudent)
        
            
            $.ajax({
             
            url: 'https://localhost:44306/api/student/createStudent',
              headers: {
             
                  'Content-Type': 'application/json'
              },
              type: "POST",
              data: JSON.stringify(this.state.addStudent),
              success: function (res) {
    
              console.log("Load Data",res)
              if (res.success == true) {
                console.log("getData",res.data)
                this.StudentSelect();
            } 
            else {
                
            }
             }.bind(this),
              error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }  
            }); 
           this.setState({showEditSection: false}) 
           this.setState({ editstudentId:" "})   
            }
    

    deleteLanguage(studentid) {
    
         console.log("stud",+ studentid);
       
        $.ajax({
            url: 'https://localhost:44306/api/student/DeleteStudent',
            headers: {
              
                'Content-Type': 'application/json'
            },
            type: "POST",
           data: JSON.stringify(studentid),
            success: function (res) {
                console.log(res)
                if (res.success == true) 
                { 
                  if (this.state.addeOrUpdate === "Create")
                        {
                            console.log("Deleted  sucessfully", "success", null, null)
                        }                    
                        else
                        {
                           
                        }                    
                      //  this.props.loadData()
                    } else {
                     
                    }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }
    openEdit(student) 
    {
      

console.log("Open Edit" ,this.state.displaystu)
 this.setState({
              showEditSection:true,

           })
        this.setState({
            showEditSection: true,
            editstudentId:student.id,
            addStudent: {
              id: student.id,
              Name: student.name,
              LastName:student.lastName,
              age:student.age,
              Date:student.date,
              Address:student.address,
              Room_No:student.room_No,
              Teacher_name:student.teacher_name,
              Year:student.year
             
          },  
         
        
         // addeOrUpdate:"Update"
       })
        console.log("Open Edit",this.state.showEditSection)
        console.log("id" ,this.state.addStudent)
    }

    updateStateData(event) {
        const data = Object.assign({}, this.state.addStudent)
        console.log("Data",data)
         data[event.target.name] = event.target.value
         
         this.setState({
           addStudent:data
           
         })
         console.log("set",this.state.addStudent);
     }
 
     closeEdit() {
        console.log("close")
              this.setState({
                  showEditSection: false,
                
                  editstudentId:"",
              })
          }


          openNew() {
       
            console.log("new Open",this.state.showEditSection),
            this.setState({
                showEditSection:true,
                addStudent: {
                    id:"",
                    Name:"",
                    lastname:"",
                    age:"",
                    Date:"",
                    Address:"",
                    Room_No:"",
                    Teacher_name:"",
                    Year:""
                  
               },
              addeOrUpdate:"Create"
            })
           
            console.log("Open new",this.state.showEditSection)
        }
    
   
    render() {
       
        console.log("id" ,this.state.editstudentId)
        console.log("bui",this.state.business)  
        return (
            
        this.state.showEditSection ? this.renderNew() : this.renderDisplay()

          //this.state.showEditSection ? this.renderDisplay() : this.renderNew()
        )
    }

        renderNew() {
            
           
            console.log("set render new",this.state.showEditSection)
            return(
                <div>
  
           
             
          <Table >
             <Table.Row>
      <Table.Cell>
      <input Type="text"
                         name="Name"
                         value={this.state.addStudent.Name}
                         onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add Name"
                         errorMessage="Please enter a valid name"/>
      </Table.Cell>

      <Table.Cell>
         <input Type="text"
                        name="lastname"
                         value={this.state.addStudent.lastname}
                         onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add Last Name"
                         errorMessage="Please enter a valid Last Name"/>
      </Table.Cell>

      <Table.Cell>
      <input Type="text"
                        name="Address"
                        value={this.state.addStudent.Address}
                         onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add Address"
                         errorMessage="Please enter a valid Address"/>
      </Table.Cell>

      <Table.Cell>
            <input Type="text"
                        name="Date"
                        value={this.state.addStudent.Date}
                         onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add  Date"
                         errorMessage="Please enter a valid Date"/>
      </Table.Cell>

      
    </Table.Row>
  
  

     <Table.Row >
        
                 <Table.Cell>
                

                 <input Type="text"
                        name="age"
                        value={this.state.addStudent.age}
                        onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add  Age"
                         errorMessage="Please enter a valid Age"/>
                
                           
      </Table.Cell>
      <Table.Cell>
      

      <input Type="text"
                        name="Year"
                        value={this.state.addStudent.Year}
                        onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add  Year"
                         errorMessage="Please enter a valid Year"/>
    
      </Table.Cell>


      <Table.Cell>
            <input Type="text"
                        name="Date"
                        value={this.state.addStudent.Date}
                        onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add  Date"
                         errorMessage="Please enter a valid Date"/>
      </Table.Cell>
</Table.Row>

      <Table.Cell>
                  <input Type="text"
                        name="room_no"
                        value={this.state.addStudent.Room_No}
                        onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add Address"
                         errorMessage="Please enter a valid Room No"/>
      </Table.Cell>

      <Table.Cell>
                  <input Type="text"
                         name="teacher_name"
                         value={this.state.addStudent.Teacher_name}
                         onChange={this.updateStateData}
                         maxLength={80}
                         placeholder="Add Address"
                         errorMessage="Please enter a valid Teacher Name"/>
      </Table.Cell>


 <Table.Row>
      <Table.Cell>
      <button type="button" class="ui blue basic button" onClick={this.saveData}>Update</button>
      <button type="button" className="ui teal button"onClick={this.CreateData}>New</button>
      <button type="button"class="ui red basic button" onClick={this.closeEdit}>Cancel</button>
      </Table.Cell>
    </Table.Row>
 </Table>
           
                
                 {this.renderDisplay()}
              
                   
                
               
               
                </div>
               

            )
       
        }

    renderDisplay(){
            
       
            console.log("display render display",this.state.showEditSection)
      return (  

        <div className='ui sixteen wide column'>
             <h2>Student Management System</h2>
                 <form>
            <Table> 
            <Table.Header> 



           
            <Table.Row>
                             <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Last Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell> Age</Table.HeaderCell>
                                <Table.HeaderCell>Birth Date</Table.HeaderCell>
                                <Table.HeaderCell> Year</Table.HeaderCell>
                                <Table.HeaderCell>Room No</Table.HeaderCell>
                                <Table.HeaderCell>Teacher</Table.HeaderCell>
                                <Table.HeaderCell>
                                <button type="button" className="ui teal button" onClick={this.openNew}>
             <Icon name='plus'/>
              Add</button>
                               </Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                           
                               
                           {this.state.business.map((object) =>(

                         <Fragment>
                            
                             {this.state.editstudentId===Object.id ?(
                                <Table.Row>
                                <Table.Cell>
                                
                   <input Type="text"
                   name="Name"
                   value={this.state.addStudent.Name}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add Student Name"
                   errorMessage="Please enter a valid name"/>
                                    </Table.Cell>
                                    <Table.Cell>
                                    
                  < input Type="text"
                   name="LastName"
                   value={this.state.addStudent.LastName}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add student Last Name"
                   errorMessage="Please enter a valid Lastname"/>
                   </Table.Cell>

                   <Table.Cell>
                                
                   <input Type="text"
                   name="age"
                   value={this.state.addStudent.age}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add Age"
                   errorMessage="Please enter a valid name"/>
                                    </Table.Cell>
                                    <Table.Cell>
                             
                   <input Type="text"
                   name="Bdate"
                   value={this.state.addStudent.Date}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add Date"
                   errorMessage="Please enter a valid name"/>
                                    </Table.Cell>

                                    <Table.Cell>
                               
                   <input Type="text"
                   name="Address"
                   value={this.state.addStudent.Address}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add Address"
                   errorMessage="Please enter a valid name"/>
                                    </Table.Cell>

                                    <Table.Cell>
                               
                   <input Type="text"
                   name="Roomno"
                   value={this.state.addStudent.Room_No}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add Room No"
                   errorMessage="Please enter a valid name"/>
                                    </Table.Cell>

                                    <Table.Cell>
                                
                   <input Type="text"
                   name="Teachername"
                   value={this.state.addStudent.Teachername}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add Teacher Name"
                   errorMessage="Please enter a valid name"/>
                                    </Table.Cell>
                                    <Table.Cell>
                                
                   <input Type="text"
                   name="Year"
                   value={this.state.addStudent.Year}
                   onChange={this.updateStateData}
                   maxLength={80}
                   placeholder="Add Year"
                   errorMessage="Please enter a valid name"/>
                                    </Table.Cell>
                                    <Table.Cell>

<button type="button" class="ui blue basic button" onClick={this.saveData}>Update</button>
<button type="button"class="ui red basic button" onClick={this.closeEdit}>Cancel</button>

</Table.Cell>
                                    </Table.Row>
                          
                           ) :(
                            <Table.Row key={object.id}>

                            <Table.Cell>{object.name}</Table.Cell>
                           <Table.Cell>
                               {object.lastName} 
                           </Table.Cell> 
                           <Table.Cell>
                               {object.address} 
                           </Table.Cell>
                           <Table.Cell>
                               {object.age} 
                           </Table.Cell>
                           <Table.Cell>
                              {object.date}
                             
                           </Table.Cell>
                           <Table.Cell>
                               {object.year} 
                           </Table.Cell>
                           <Table.Cell>
                               {object.room_No} 
                           </Table.Cell>
                           <Table.Cell>
                               {object.teacher_name} 
                           </Table.Cell>
                           <Table.Cell>
                               <Button color='yellow' content='Edit' icon='edit'  onClick={()=>this.openEdit(object)}/></Table.Cell>
                               <Table.Cell>  <Button color='red' content='Delete' icon ='trash' onClick={() => this.deleteLanguage(object.id)} />
                           </Table.Cell>
                       </Table.Row>
                               )}
                           </Fragment>
                           ))}
                   </Table.Body>
       </Table>
       </form>
       </div>
        );  
    }  
  }  

             {/*     <div className='ui sixteen wide column'> 
                    <Grid columns='equal'>
                     <Grid.Column>
                      <ChildSingleInput
                        inputType="text"
                        name="Name"
                        value={this.state.addStudent.Name}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add student First name"
                        errorMessage="Please enter a valid Lastname"/>
                        
                        </Grid.Column> 
                        <Grid.Column>
                      <ChildSingleInput
                        inputType="text"
                        name="LastName"
                        value={this.state.addStudent.LastName}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add student Last name"
                        errorMessage="Please enter a valid Lastname"/>
                        </Grid.Column>


                        <Grid.Column> 
                        <ChildSingleInput
                        inputType="text"
                        name="age"
                       value={this.state.addStudent.age}
                        maxLength={80}
                        placeholder="Add student Age"
                        errorMessage="Please enter a valid Lastname"
                        />
                        </Grid.Column>
                   <Grid.Column>

                     <ChildSingleInput
                        inputType="text"
                        name="Date"
                       value={this.state.addStudent.Date}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add student date"
                        errorMessage="Please enter a valid Lastname"/>
                        </Grid.Column> 


                       <Grid.Column>
                        <ChildSingleInput
                        inputType="text"
                        name="Address"
                       value={this.state.addStudent.Address}
                        controlFunc={this.updateStateData}
                        maxLength={80}

                        placeholder="Add student Address"
                        errorMessage="Please enter a valid Lastname"/>
                        </Grid.Column>

                       <Grid.Column>
                        <ChildSingleInput
                        inputType="text"
                        name="Room_No"
                        value={this.state.addStudent.Room_No}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add student roomno"
                        errorMessage="Please enter a valid Lastname"/>
                        </Grid.Column>

                        <Grid.Column>
                        <ChildSingleInput
                        inputType="text"
                        name="Teacher_name"
                        value={this.state.addStudent.Teacher_name}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add student teacher Name"
                        errorMessage="Please enter a valid Lastname"/>
                        </Grid.Column>
                        <Grid.Column>
                        <ChildSingleInput
                        inputType="text"
                        name="Year"
                        value={this.state.addStudent.Year}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add student year"
                        errorMessage="Please enter a valid Lastname"/>
                        </Grid.Column>
                       
                         <Grid.Column>  
                        <button type="button" className="ui teal button" onClick={this.saveData}>New</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Grid.Column>

                        
                        </Grid>
                        {this.renderDisplay()}
 */}
 
 


         {/* <div>  
          <h4 align="center">Student List</h4>  
          
        
          

          <Table celled>
                        <Table.Header>
                            <Table.Row>
 
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Last Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell> Age</Table.HeaderCell>
                                <Table.HeaderCell>Birth Date</Table.HeaderCell>
                                <Table.HeaderCell> Year</Table.HeaderCell>
                                <Table.HeaderCell>Room No</Table.HeaderCell>
                                <Table.HeaderCell>Teacher</Table.HeaderCell>
                               
                                <Table.HeaderCell>
             <button type="button" className="ui teal button" onClick={this.openNew}>
             <Icon name='plus'/>
              Add</button>
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
  
            
           
            <Table.Body>
                           
                               
                                {this.state.business.map((object) =>(

                              <Fragment>
                                 
                                  {this.state.editstudentId===Object.id ?(
                                     <Table.Row>
                                     <Table.Cell>
                                     <ChildSingleInput
                        inputType="text"
                        name="Name"
                        value={this.state.addStudent.name}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid name"/>
                                         </Table.Cell>
                                         <Table.Cell>
                                         <ChildSingleInput
                        inputType="text"
                        name="LastName"
                        value={this.state.addStudent.lastname}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add student"
                        errorMessage="Please enter a valid Lastname"/>
                        </Table.Cell>

                        <Table.Cell>
                                     <ChildSingleInput
                        inputType="text"
                        name="age"
                        value={this.state.addStudent.age}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid name"/>
                                         </Table.Cell>
                                         <Table.Cell>
                                     <ChildSingleInput
                        inputType="text"
                        name="Bdate"
                        value={this.state.addStudent.date}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid name"/>
                                         </Table.Cell>

                                         <Table.Cell>
                                     <ChildSingleInput
                        inputType="text"
                        name="Address"
                        value={this.state.addStudent.address}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid name"/>
                                         </Table.Cell>

                                         <Table.Cell>
                                     <ChildSingleInput
                        inputType="text"
                        name="Roomno"
                        value={this.state.addStudent.room_No}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid name"/>
                                         </Table.Cell>

                                         <Table.Cell>
                                     <ChildSingleInput
                        inputType="text"
                        name="Teachername"
                        value={this.state.addStudent.teachername}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid name"/>
                                         </Table.Cell>
                                         <Table.Cell>
                                     <ChildSingleInput
                        inputType="text"
                        name="Year"
                        value={this.state.addStudent.year}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid name"/>
                                         </Table.Cell>
                                         <Table.Cell>

<button type="button" class="ui blue basic button" onClick={this.saveData}>Update</button>
<button type="button"class="ui red basic button" onClick={this.closeEdit}>Cancel</button>

</Table.Cell>
                                         </Table.Row>
                               
                                ) :(
                                 <Table.Row key={object.id}>
 
                                 <Table.Cell>{object.name}</Table.Cell>
                                <Table.Cell>
                                    {object.lastName} 
                                </Table.Cell> 
                                <Table.Cell>
                                    {object.address} 
                                </Table.Cell>
                                <Table.Cell>
                                    {object.age} 
                                </Table.Cell>
                                <Table.Cell>
                                   {object.date}
                                  
                                </Table.Cell>
                                <Table.Cell>
                                    {object.year} 
                                </Table.Cell>
                                <Table.Cell>
                                    {object.room_No} 
                                </Table.Cell>
                                <Table.Cell>
                                    {object.teacher_name} 
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='yellow' content='Edit' icon='edit'  onClick={()=>this.openEdit(object)}/></Table.Cell>
                                    <Table.Cell>  <Button color='red' content='Delete' icon ='trash' onClick={() => this.deleteLanguage(object.id)} />
                                </Table.Cell>
                            </Table.Row>
                                    )}
                                </Fragment>
                                ))}
                        </Table.Body>
             
          </Table>  
        </div>  */} 


        
   