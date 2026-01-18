import './App.css';
import { employedata } from './Employeedata';
import { useEffect, useState } from 'react';

function App() {

const [data, setdata]=useState([]);
const [firstname, setfirstname]=useState('');
const [lastname, setlastname]=useState('');
const [age, setage]=useState(0);
const [id, setid]=useState(0);
const [isupdate, setisupdate]=useState(false);

useEffect(()=>{
   setdata(employedata)
},[]);

const handleEdit = (id)=>{
  const dt = data.filter(item=> item.id === id);
  if(dt !==undefined){
    setisupdate(true)
    setid(dt[0].id)
    setfirstname(dt[0].Firstname)
    setlastname(dt[0].Lastname)
    setage(dt[0].age)
  }
}

const handleDelete = (id)=>{
  if(id>0)
  {
    if(window.confirm("are you sure to delete this")){
    const dt = data.filter(item => item.id !==id);
    setdata(dt);
    }
  }
}

const handleSave = (e)=>{
let error='';

if (firstname === '')
 error += 'firstname is require, ';

if (lastname === '')
 error += 'lastname is require, ';

if (age <= 0)
 error += 'age is require, ';


if(error === ''){

  e.preventDefault();
  const dt = [...data];
  const newobject = 
    {
        id: employedata.length + 1,
        Firstname: firstname,
        Lastname : lastname,
        age: age
    }
  dt.push(newobject);
  setdata(dt);
  }
  else {
    alert(error)
  }
}

const handleUpdate = ()=>{

    let error = '';

        if (firstname==='') error += 'Firstname is required. ';
        if (lastname==='') error += 'Lastname is required. ';
        if (age==='' || age <= 0) error += 'Enter valid age. ';

        if (error) {
          alert(error);
          return; // Stop update if validation fails
        }
  
     const index = data.map ((item)=>{ return item.id}).indexOf(id);

     const dt = [...data];
     dt[index].Firstname = firstname;
     dt[index].Lastname = lastname;
     dt[index].age = age;
     setdata(dt);
     handleClear();

    }

const handleClear = ()=>{
    setid(0)
    setfirstname('')
    setlastname('')
    setage(' ')
    setisupdate(false)
}

  return (
    <div className="App">
      <div className="container mt-4 mb-3">
        <div className="row justify-content-center align-items-end g-3">

          <div className="col-12 col-md-3">
            <label className="w-100">
              Firstname:
              <input
                type="text"
                className="form-control"
                placeholder="ENTER FIRST NAME"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />
            </label>
          </div>

          <div className="col-12 col-md-3">
            <label className="w-100">
              Lastname:
              <input
                type="text"
                className="form-control"
                placeholder="ENTER LAST NAME"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
            </label>
          </div>

          <div className="col-12 col-md-2">
            <label className="w-100">
              Age:
              <input type="number"
                className="form-control"
                placeholder="ENTER AGE"
                value={age}
                onChange={(e) => setage(e.target.value)}
              />
            </label>
          </div>

          <div className="col-12 col-md-2 d-flex gap-2">
            {
              !isupdate ?
                <button className="btn btn-primary  wd-100" onClick={(e) => handleSave(e)}>Save</button>
              :
                <button className="btn btn-primary  wd-100" onClick={handleUpdate}>Update</button>
            }
            <button className="btn btn-danger wd-100" onClick={handleClear}>Clear</button>
          </div>

        </div>
      </div>

      <div className='table-responsive'>
       <table className='table table.hover table-bordered'>
        <thead>
          <tr>
            <td>id</td>
            <td>Firstname</td>
            <td>Lastname</td>
            <td>age</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,index)=>{
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.Firstname}</td>
                  <td>{item.Lastname}</td>
                  <td>{item.age}</td>
                 <td>
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <button className="btn btn-primary btn-sm" onClick={()=> handleEdit(item.id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={()=> handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </td>
                </tr>
              )
            })
          }
        </tbody>
       </table>
       </div>
    </div>
  );
}

export default App;
