import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login(){
    const [det, setdet] = useState({email:'',password:'', type:''});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        if(det.email === '' || det.password === '' || det.type === '' || det.type === 'select') {
            alert('Please fill all the fields');
            return;
        }
        e.preventDefault();
        axios.post('http://localhost:5000/login',det)
        .then(res => {
            if(res.status == 200){
                alert('Login successful');
                localStorage.setItem('user',JSON.stringify(res.data[0]));
                navigate(det.type == 'buyer' ? '/home' : '/seller');
            }
            else alert('enter valid details')
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }
    return(
        <div>
            <div style={{border: '1px solid white', borderRadius: '20px', padding:'50px', textAlign:'center'}}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <table style={{textAlign:'center'}}>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input type='email' value={det.email} onChange={(e)=>setdet({...det,email:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type='password' value={det.password} onChange={(e)=>setdet({...det,password:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td>User Type:</td>
                            <td>
                                <select style={{width:'100px', height:'25px'}} value={det.type} onChange={(e)=>setdet({...det,type:e.target.value})}>
                                    <option value='select'>Select</option>
                                    <option value='buyer'>Buyer</option>
                                    <option value='seller'>Seller</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <br></br>
                    <button className='btn' type='submit'>Login</button>
                    <button className='btn' style={{marginLeft:'20px'}} onClick={() => navigate('/signup')}>Sign up</button>
                </form>
            </div>
        </div>
    )
}