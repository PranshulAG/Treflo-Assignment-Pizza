import React from 'react';
import './header.scss'
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
function Header() {
    const navigate = useNavigate()
    const onCartClick = () => {
        navigate('/cart');
    }
    return (
        <div className='header'>
            <div>
                <img class="pizza-logo" src="https://iili.io/HvNYVJ1.jpg"/>
            </div>
            <div onClick={onCartClick}>
            <AiOutlineShoppingCart size={30}/>
            </div>
        </div>
    );
}

export default Header;