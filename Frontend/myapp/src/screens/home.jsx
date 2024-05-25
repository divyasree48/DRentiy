import React, { useState, useEffect } from 'react';
import axios from 'axios';
// font awesome
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Modal from './modal';
// import css
export default function Home() {
    const [postings, setPostings] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50000);
    const [isLiking, setIsLiking] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [place, setPlace] = useState('');
    const [bedrooms, setBedrooms] = useState([0, 100]);
    const [bathrooms, setBathrooms] = useState([0, 100]);
    const [showModal, setShowModal] = useState(false);
    const [sellerDetails, setSellerDetails] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/allPost')
            .then(response => {
                setPostings(response.data);
                
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // [1
    const loggedIn = user !== null; // [2
    const name = loggedIn ? user.firstname : ''; // [3

    const navigate = useNavigate();
    const handleView = link => () => {
        navigate(link);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    const filterPostings = () => {
        return postings.filter(posting => {
            const priceMatch = parseInt(posting.price) >= minPrice && parseInt(posting.price) <= maxPrice;
            const placeMatch = posting.place.toLowerCase().includes(place.toLowerCase());
            const bedroomsMatch = parseInt(posting.bedrooms) >= bedrooms[0] && parseInt(posting.bedrooms) <= bedrooms[1];
            const bathroomsMatch = parseInt(posting.bathrooms) >= bathrooms[0] && parseInt(posting.bathrooms) <= bathrooms[1];
            return priceMatch && placeMatch && bedroomsMatch && bathroomsMatch;
            // return 1;
        });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    const handleInterest = (sellerEmail) => {
        axios.get(`http://localhost:5000/getSeller/${sellerEmail}`)
          .then(seller => {
            const sellerName = `${seller.data[0].firstname} ${seller.data[0].lastname}`;
            const buyerName = `${user.firstname} ${user.lastname}`;
            const buyerEmail = user.email;
      
            // Send the email request to the server
            axios.post('http://localhost:5000/send-interest-email', {
              sellerEmail,
              buyerEmail,
              sellerName,
              buyerName
            })
              .then(() => {
                setSellerDetails({
                  firstname: seller.data[0].firstname,
                  lastname: seller.data[0].lastname,
                  email: seller.data[0].email,
                  phonenumber: seller.data[0].phonenumber
                });
                setShowModal(true);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      };
    const likedPost = (likes) => {
        console.log(likes);
        return likes.includes(user.email);
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
    return (
        <div style={{border: '1px solid white', borderRadius: '20px', padding:'50px'}}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            {sellerDetails && (
                <div style={{fontSize:'20px'}}>
                    <h3>Thank you!</h3>
                    <h5>your details have been sent to the seller</h5>
                    <h5>seller's details:</h5>
                    <ul>
                        <li>Name: {sellerDetails.firstname} {sellerDetails.lastname}</li>
                        <li>Email: {sellerDetails.email}</li>
                        <li>Phone Number: {sellerDetails.phonenumber}</li>
                    </ul>
                </div>
            )}
            </Modal>
            <div style={{textAlign: 'center'}}>
            {loggedIn ? (
                <div>
                    <h2>Hi {name}!, welcome to your Buyer Portal</h2>
                    <button 
                        className='btn'
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Welcome to Rentify</h2>
                    <button 
                        className='btn'
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button 
                        className='btn'
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            )}
                
                <h3 style={{textDecoration:'underline'}}>Available Postings</h3>
                <button onClick={toggleFilters} style={{ backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px',  margin: '4px', fontSize:'12px' }}>
                    Filters
                </button>
            </div>

            {showFilters && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Place:</label>
                        <input
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Price Range:</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <span style={{ marginRight: '5px' }}>${minPrice}</span>
                            <span>to</span>
                            <span style={{ marginLeft: '5px' }}>${maxPrice}</span>
                        </div>
                        <Slider
                            range
                            min={0}
                            max={50000}
                            value={[minPrice, maxPrice]}
                            onChange={(value) => {
                                setMinPrice(value[0]);
                                setMaxPrice(value[1]);
                            }}
                            style={{ width: '200px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Bedrooms:</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <span style={{ marginRight: '5px' }}>{bedrooms[0]}</span>
                            <span>to</span>
                            <span style={{ marginLeft: '5px' }}>{bedrooms[1]}</span>
                        </div>
                        <Slider
                            range
                            min={0}
                            max={100}
                            value={bedrooms}
                            onChange={(value) => setBedrooms(value)}
                            style={{ width: '200px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Bathrooms:</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <span style={{ marginRight: '5px' }}>{bathrooms[0]}</span>
                            <span>to</span>
                            <span style={{ marginLeft: '5px' }}>{bathrooms[1]}</span>
                        </div>
                        <Slider
                            range
                            min={0}
                            max={100}
                            value={bathrooms}
                            onChange={(value) => setBathrooms(value)}
                            style={{ width: '200px' }}
                        />
                    </div>
                </div>
            )}

            <div style={{ justifyContent: 'center', flexWrap: 'wrap', display:'flex', flexDirection: 'row'}}>
                {filterPostings().map(posting => (
                    <div key={posting.id} style={{ border: '1px solid gray', borderRadius: '5px', width: '160px',fontSize: '12px', padding: '10px'}}>
                        <div style={{textAlign:'center'}}>
                            <h2 style={{textDecoration:'underline'}}>{posting.place}</h2>
                        </div>
                        <ul>
                            <li>{posting.bedrooms} bedrooms</li>
                            <li>{posting.bathrooms} bathrooms</li>
                            <li>${posting.price}</li>
                            <li>{posting.description}</li>
                        </ul>
                        <div style={{textAlign:'center'}}>
                        <button 
                            className='btn' onClick={() => (loggedIn) ? handleInterest(posting.sellerEmail) : navigate('/login')}>
                            Interested
                        </button>
                        {loggedIn && // like button with logo from font awesome
                            <button 
                            class="like"
                            disabled={isLiking}
                            onClick={() => handleLike(posting._id, posting.likes)}
                        >
                            <i style={{color: likedPost(posting.likes) ? 'red' : 'white'}} className="fa fa-heart"></i><span> {posting.likes.length}</span>
                        </button>
                        }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
// styling edit
