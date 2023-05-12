import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeIsShowCart } from "../../store/slices/cart.slice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {

  const {token} = useSelector(store => store.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickChangeShowCart = () => {
    if(!token) return navigate("/login")
    dispatch(changeIsShowCart())
  }
  
  return (
    <section className="">
      <Link to="/">
        <h1 className=" text-center text-4xl text-red-500 font-bold px-4 py-4 shadow-sm shadow-gray-300">e-comerce</h1>
      </Link>

      <nav className="grid grid-cols-3 place-items-center p-4 text-xl text-red-500 shadow-sm shadow-gray-300">
        <Link to="/login">
          <i className="bx bx-user"></i>
        </Link>
        <Link to="/purchases">
          <i className="bx bx-box"></i>
        </Link>
        <button onClick={handleClickChangeShowCart}>
          <i className="bx bx-cart"></i>
        </button>
      </nav>
    </section>
  );
};

export default Header;
