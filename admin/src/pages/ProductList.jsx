
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import './ProductList.css';

function ProductList({ token }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalImages, setModalImages] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // State for the editing product

  const authToken = token || localStorage.getItem('token');

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message || 'Failed to fetch product list.');
      }
    } catch (error) {
      console.error('Error fetching product list:', error.message);
      toast.error('An error occurred while fetching the product list.');
    } finally {
      setLoading(false);
    }
  };

  // Approve a product
  const handleApproveProduct = async (productId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/verify/${productId}`,
        { verified: true },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        toast.success('Product approved successfully!');
        setList((prevList) =>
          prevList.map((product) => {
            if (product._id === productId) {
              localStorage.setItem(productId, 'approved');
              return { ...product, verified: true };
            }
            return product;
          })
        );
      } else {
        toast.error(response.data.message || 'Failed to approve the product.');
      }
    } catch (error) {
      console.error('Error approving product:', error);
      toast.error('An error occurred while approving the product.');
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    if (!authToken) {
      toast.error('No authorization token found. Please log in.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: { token: authToken },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setList((prevList) => prevList.filter((product) => product._id !== id));
      } else {
        toast.error(response.data.message || 'Failed to delete the product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('An error occurred while deleting the product.');
    }
  };

  // Handle image click to show modal
  const handleImageClick = (images, index) => {
    setModalImages(images || []);
    setSelectedImageIndex(index);
  };

  const handlePrevImage = (event) => {
    event.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? modalImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (event) => {
    event.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      prevIndex === modalImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  // Open edit modal or form
  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  // Update product details
  const handleUpdateProduct = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/update/${editProduct._id}`,
        editProduct
      );
      if (response.data.success) {
        toast.success('Product updated successfully!');
        setList((prevList) =>
          prevList.map((product) => (product._id === editProduct._id ? editProduct : product))
        );
        setEditProduct(null); // Close the modal
      } else {
        toast.error('Failed to update the product.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the product.');
    }
  };

  return (
    <div className="container-fluid mt-0 px-4">
      <div className="header-box mt-3">
        <h2 className="mb-4">Admin Product List</h2>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rent Days</th>
                <th>Date Added</th>
                <th>Description</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    <img
                      src={item.image?.[0] || 'placeholder.png'}
                      alt="Product"
                      className="product-image"
                      onClick={() => handleImageClick(item.image, 0)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.rentDays}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.description}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {item.verified || localStorage.getItem(item._id) === 'approved' ? (
                        <span className="badge bg-success">Approved</span>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleApproveProduct(item._id)}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className="btn btn-info ml-2"
                        onClick={() => handleEditProduct(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => handleDeleteProduct(item._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedImageIndex !== null && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content">
            <div className="modal-image-container">
              <button className="swipe-btn prev" onClick={handlePrevImage}>
                &#10094;
              </button>
              <img
                src={modalImages[selectedImageIndex]}
                alt="Selected"
                className="modal-image"
              />
              <button className="swipe-btn next" onClick={handleNextImage}>
                &#10095;
              </button>
            </div>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="edit-product-modal">
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Edit Product</h3>
            <label>Name</label>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            />
            <label>Description</label>
            <textarea
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            />
            <label>Price</label>
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            />
            <label>Category</label>
            <input
              type="text"
              value={editProduct.category}
              onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
            />
            <label>Rent Days</label>
            <input
              type="number"
              value={editProduct.rentDays}
              onChange={(e) => setEditProduct({ ...editProduct, rentDays: e.target.value })}
            />
            <button type="button" onClick={handleUpdateProduct}>
              Update Product
            </button>
            <button type="button" onClick={() => setEditProduct(null)}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductList;
