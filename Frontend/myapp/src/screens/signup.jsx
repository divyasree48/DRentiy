import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Signup(){
    const [det, setdet] = useState({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "", userType: "", postings: []});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        if(det.firstName === '' || det.lastName === '' || det.email === '' || det.password === '' || det.phoneNumber === '' || det.userType === '' || det.userType === 'select') {
            alert('Please fill all the fields');
            return;
        }
        e.preventDefault();
        axios.post('http://localhost:5000/signup',det).then(res => {
            alert('Signup successful');
            navigate('/login');
        }).catch(err => {
            console.log(err.response.data);
        })
    }
    return(
        <div>
            <div style={{border: '1px solid white', borderRadius: '20px', padding:'50px', textAlign:'center'}}>
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <table style={{textAlign:'center'}}>
                        <tr>
                            <td><label>First Name:</label></td>
                            <td><input max={20} type='text' value={det.firstName} onChange={(e)=>setdet({...det,firstName:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Last Name:</label></td>
                            <td><input max={20} type='text' value={det.lastName} onChange={(e)=>setdet({...det,lastName:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input type='email' value={det.email} onChange={(e)=>setdet({...det,email:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input min={6} max={20} type='password' value={det.password} onChange={(e)=>setdet({...det,password:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Phone Number:</label></td>
                            <td><input min={10} max={10} type='text' value={det.phoneNumber} onChange={(e)=>setdet({...det,phoneNumber:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td>User Type:</td>
                            <td>
                                <select style={{width:'100px', height:'25px'}} value={det.userType} onChange={(e)=>setdet({...det,userType:e.target.value})}>
                                    <option value='select'>Select</option>
                                    <option value='buyer'>Buyer</option>
                                    <option value='seller'>Seller</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <br></br>
                    <button className='btn' type='submit'>SignUp</button>
                    <button className='btn' style={{marginLeft:'20px'}} onClick={() => navigate('/login')}>Login</button>
                </form>
            </div>
        </div>
    )
}