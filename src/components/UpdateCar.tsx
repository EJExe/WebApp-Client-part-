import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CarContext } from '../context/ProjectContext';
import { Car } from '../models/car';

const UpdateCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(CarContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Car>>({
    brand: '',
    model: '',
    pricePerDay: 0,
    type: '',
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const loadCarData = async () => {
      try {
        const car = context?.cars.find(c => c.id === parseInt(id || ''));
        if (car) {
          setFormData({
            brand: car.brand,
            model: car.model,
            pricePerDay: car.pricePerDay,
            type: car.type,
            imageUrl: car.imageUrl || ''
          });
        }
      } catch (err) {
        setError('Failed to load car data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCarData();
  }, [id, context?.cars]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pricePerDay' ? parseFloat(value) || 0 : value
    }));
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    } catch {
      return false;
    }
  };

  const validateCarData = (data: Partial<Car>): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    const validTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible'];
    const brandRegex = /^[a-zA-Z0-9\s-]+$/;

    if (!data.brand || data.brand.trim().length < 2) {
      errors.brand = ["Brand must be at least 2 characters"];
    } else if (!brandRegex.test(data.brand)) {
      errors.brand = ["Brand contains invalid characters"];
    }

    if (!data.model || data.model.trim().length < 1) {
      errors.model = ["Model is required"];
    }

    if (!data.type || !validTypes.includes(data.type)) {
      errors.type = [`Type must be one of: ${validTypes.join(', ')}`];
    }

    if (!data.pricePerDay || data.pricePerDay <= 0) {
      errors.pricePerDay = ["Price must be positive"];
    }

    if (!data.imageUrl || !isValidImageUrl(data.imageUrl)) {
      errors.imageUrl = ["Please enter a valid image URL"];
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const errors = validateCarData(formData);
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) return;

    try {
      if (context?.updateCar && id) {
        await context.updateCar(parseInt(id), {
          ...formData,
          pricePerDay: Math.round(formData.pricePerDay || 0)
        });
        navigate('/');
      }
    } catch (error) {
      let errorMessage = "Failed to update car. Please check the data.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="update-form-container">
      <h2>Edit Car</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand || ''}
            onChange={handleChange}
            required
          />
          {validationErrors.brand?.map((err, i) => (
            <div key={i} className="text-red-500 text-sm">{err}</div>
          ))}
        </div>

        <div className="form-group">
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model || ''}
            onChange={handleChange}
            required
          />
          {validationErrors.model?.map((err, i) => (
            <div key={i} className="text-red-500 text-sm">{err}</div>
          ))}
        </div>

        <div className="form-group">
          <label>Price per day:</label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay || 0}
            onChange={handleChange}
            min="1"
            step="1"
            required
          />
          {validationErrors.pricePerDay?.map((err, i) => (
            <div key={i} className="text-red-500 text-sm">{err}</div>
          ))}
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl || ''}
            onChange={handleChange}
          />
          {validationErrors.imageUrl?.map((err, i) => (
            <div key={i} className="text-red-500 text-sm">{err}</div>
          ))}
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
          </select>
          {validationErrors.type?.map((err, i) => (
            <div key={i} className="error-message">{err}</div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;