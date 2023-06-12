import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Select, Button, TextField } from '@mui/material';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import  { firestore } from '../config/firebase';


const useStyles = makeStyles({
  root: {
    padding: '16px',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  list: {
    maxHeight: '300px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '8px',
  },
});

const SalesPage = () => {
  const classes = useStyles();
  const [sales, setSales] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      const salesSnapshot = await getDocs(collection(firestore, 'sales'));
      const salesData = salesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSales(salesData);
    };

    fetchSales();

    const unsubscribe = onSnapshot(collection(firestore, 'sales'), () => {
      fetchSales();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (paymentMethod) {
      try {
        await addDoc(collection(firestore, 'sales'), {
          paymentMethod,
        });

        setPaymentMethod('');
      } catch (error) {
        console.error('Error adding sale:', error);
      }
    }
  };

  const handleDeleteSale = async (saleId) => {
    try {
      await deleteDoc(collection(firestore, 'sales', saleId));
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  const handleUpdateSale = async (saleId, newData) => {
    try {
      await updateDoc(collection(firestore, 'sales', saleId), newData);
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const filteredSales = sales.filter((sale) =>
    sale.paymentMethod.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <Typography variant="h4">Sales Page</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="">Select a payment method</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="cash">Cash</option>
          <option value="pix">PIX</option>
          <option value="boleto">Boleto</option>
        </Select>
        <Button variant="contained" type="submit" disabled={!paymentMethod}>
          Register Sale
        </Button>
      </form>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <div className={classes.list}>
        {filteredSales.map((sale) => (
          <div key={sale.id}>
            <Typography>{sale.paymentMethod}</Typography>
            <Button variant="outlined" onClick={() => handleDeleteSale(sale.id)}>
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handleUpdateSale(sale.id, {
                  paymentMethod: `${sale.paymentMethod} - Updated`,
                })
              }
            >
              Update
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesPage;
