import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AddPost() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [det, setDet] = useState({ place: "", bedrooms: "", bathrooms: "", price: "", description: "", address: "", sellerName: user.firstname, sellerEmail: user.email});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Input Validation
        if (parseInt(det.bedrooms) > 20 || parseInt(det.bathrooms) > 20 || parseInt(det.price) > 50000) {
          alert("Bedrooms, bathrooms, and price should not exceed 20, 20, and 50000 respectively.")
          return; // Stop submission if validation fails
        }
    
        axios.post(`http://localhost:5000/addposting/`, det)
          .then((response) => {
            alert("Posting added successfully");
            navigate("/seller");
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return (
        <div>
            <div style={{ border: '1px solid white', borderRadius: '20px', padding: '50px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px' }}>Add a new posting</h2>
                <table style={{ margin: '0 auto' }}>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="place" style={{ color: 'gray', fontSize: '14px' }}>Place:</label>
                            </td>
                            <td>
                                <input type="text" id="place" name="place" style={{ border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, place: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="bedrooms" style={{ color: 'gray', fontSize: '14px' }}>Bedrooms:</label>
                            </td>
                            <td>
                                <input type="text" id="bedrooms" name="bedrooms" style={{ border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, bedrooms: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="bathrooms" style={{ color: 'gray', fontSize: '14px' }}>Bathrooms:</label>
                            </td>
                            <td>
                                <input type="number" id="bathrooms" name="bathrooms" style={{ border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, bathrooms: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="price" style={{ color: 'gray', fontSize: '14px' }}>Price in $:</label>
                            </td>
                            <td>
                                <input type="number" id="price" name="price" style={{ border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, price: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="description" style={{ color: 'gray', fontSize: '14px' }}>Description:</label>
                            </td>
                            <td>
                                <input type="textbox" id="description" name="description" style={{ border: '1px solid gray', borderRadius: '5px', height: '50px' }} onChange={(e) => setDet({ ...det, description: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="address" style={{ color: 'gray', fontSize: '14px' }}>Address:</label>
                            </td>
                            <td>
                                <input type="textbox" id="address" name="address" style={{ border: '1px solid gray', borderRadius: '5px', height: '50px' }} onChange={(e) => setDet({ ...det, address: e.target.value })} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', margin:'20px', fontSize:'12px'}} onClick={handleSubmit}>Add Posting</button>
                <button style={{ padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',margin:'20px',fontSize:'12px'}} onClick={() => navigate('/seller')}>Back</button>
            </div>
        </div>
    );

}