import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function EditPost() {
    // get the id of the posting from the state
    const id = useLocation().state.id;
    console.log(id);
    const [post , setPost] = useState({place: '', bedrooms: '', bathrooms: '', price: '', description: '', address: '', sellerName: '', sellerEmail: ''});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:5000/getPost/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/editPost/${id}`, post)
            .then(response => {
                alert('Posting edited successfully');
                navigate('/seller');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div style={{ border: '1px solid white', borderRadius: '20px', padding: '50px', textAlign: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px'}}>Edit Posting</h2>
                {post && (
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="place" style={{ color: 'gray', fontSize: '14px' }}>Place:</label></td>
                                    <td><input type="text" id="place" name="place" style={{padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.place} onChange={(e) => setPost({ ...post, place: e.target.value })} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="bedrooms" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Bedrooms:</label></td>
                                    <td><input type="text" id="bedrooms" name="bedrooms" style={{  padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.bedrooms} onChange={(e) => setPost({ ...post, bedrooms: e.target.value })} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="bathrooms" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Bathrooms:</label></td>
                                    <td><input type="number" id="bathrooms" name="bathrooms" style={{  padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.bathrooms} onChange={(e) => setPost({ ...post, bathrooms: e.target.value })} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="price" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Price in $:</label></td>
                                    <td><input type="number" id="price" name="price" style={{  padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.price} onChange={(e) => setPost({ ...post, price: e.target.value })} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="description" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Description:</label></td>
                                    <td><input type="textbox" id="description" name="description" style={{ padding: '5px', border: '1px solid gray', borderRadius: '5px', height: '50px' }} defaultValue={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="address" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Address:</label></td>
                                    <td><input type="textbox" id="address" name="address" style={{padding: '5px', border: '1px solid gray', borderRadius: '5px', height: '50px' }} defaultValue={post.address} onChange={(e) => setPost({ ...post, address: e.target.value })} /></td>
                                </tr>
                                <tr>
                                    <td><button type="submit" style={{ backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', fontSize:'12px', margin:'20px'}}>Edit Posting</button></td>
                                    <td><button style={{ backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', fontSize: '12px'}} onClick={() => navigate('/seller')}>Back</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                )}
            </div>
        </div>
        );
}