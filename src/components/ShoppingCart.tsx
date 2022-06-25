import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';

interface ShoppingCartProps {
  isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { openOrCloseCart } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={openOrCloseCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
};

export default ShoppingCart;
