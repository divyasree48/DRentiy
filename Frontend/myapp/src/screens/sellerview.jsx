import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function SellerView() {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [postings, setPostings] = useState([]);
    const [name, setName] = useState(user ? user.firstname : '');
    const [isLiking, setIsLiking] = useState(false);
    // postings are stored in an array which is a field in the user database
    useEffect(() => {
        // get the postings from the database
        if(user == null){
            navigate('/login');
        }
        else if(user.usertype !== 'seller'){
            navigate('/home');
        }
        else{
            const email = user.email;
            axios.get(`http://localhost:5000/ret/${email}`)
            .then(response => {
                setPostings(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
        
    }, [user, navigate]);
    // const name = user.firstname;
    // function to handle the view details button
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const handleAdd = () => {
        navigate('/addpost');
    }
    const handleEdit = (id) => {
        navigate(`/editpost`, { state: { id } });
    }
    const handleDel = (id) => {
        axios.delete(`http://localhost:5000/deletePost/${id}`)
            .then(response => {
                alert('Posting deleted successfully');
                window.location.reload();
            }) 
            .catch(error => {
                console.log(error);
            });
    }
    const handleLike = (id, likes) => {
        setIsLiking(true);
        axios.put(`http://localhost:5000/toggleLike/${id}`, { email: user.email })
        .then(response => {
            setPostings(postings.map(posting => {
                if (posting._id === id) {
                    return { ...posting, likes: response.data.likes };
                } else {
                    return posting;
                }
            }));
            setIsLiking(false);
        })
        .catch(error => {
            console.log(error);
            setIsLiking(false);
        });
    }
    const likedPost = (likes) => {
        console.log(likes);
        return likes.includes(user.email);
    }
    return (
        <div style={{  }}>
            <div style={{border: '1px solid white', borderRadius: '20px', padding:'50px'}}>
                <div style={{textAlign:'center'}}>
                    {/* <h2>Welcome {name}!</h2> */}
                    <button className='btn' onClick={handleAdd}>Add New Posting</button>
                    <button className='btn' style={{marginLeft:'20px'}} onClick={handleLogout}>
                        Logout
                    </button>
                    <h2 style={{textDecoration:'underline'}}>My Postings</h2>
                </div>
            <div style={{ justifyContent: 'center', flexWrap: 'wrap', display:'flex', flexDirection: 'row'}}>
                    {postings.map(posting => (
                        // posting contains the place, number of bedrooms, number of bathrooms, price and description, and also a link which will open another component with the details of the posting
                        <div key={posting.id} style={{ border: '1px solid gray', borderRadius: '5px', width: '160px',fontSize: '12px', padding: '10px'}}>
                            <div style={{textAlign:'center'}}>
                            <h2 style={{textDecoration:'underline'}}>{posting.place}</h2>
                            </div>
                            <ul>
                                <li>{posting.bedrooms} bedrooms</li>
                                <li>{posting.bathrooms} bathrooms</li>
                                <li>${posting.price} per month</li>
                                <li>{posting.description}</li>
                                <li>{posting.address}</li>
                            </ul>
                            <div style={{textAlign:'center'}}>
                            <button className='btn' onClick={() => handleEdit(posting._id)}>Edit</button>
                            <button className='btn' style={{marginLeft:'10px'}} onClick={() => handleDel(posting._id)}>Delete</button>
                            <button 
                            class="like"
                            disabled={isLiking}
                            style={{marginLeft:'10px'}}
                            onClick={() => handleLike(posting._id, posting.likes)}
                        >
                            <i style={{color: likedPost(posting.likes) ? 'red' : 'white'}} className="fa fa-heart"></i><span> {posting.likes.length}</span>
                        </button>
                            </div>
                        </div>
                    ))}
            </div>
            </div>
        </div>
    )
}