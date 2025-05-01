import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CarContext } from "../context/ProjectContext";
import { Car } from "../models/car";

const UpdateCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(CarContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Car>>({
    brandName: "",
    model: "",
    pricePerDay: 0,
    bodyTypeName: "",
    imageUrl: "",
    year: 0,
    color: "",
    seats: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const loadCarData = async () => {
      try {
        const car = context?.cars.find((c) => c.id === parseInt(id || ""));
        if (car) {
          setFormData({
            brandName: car.brandName,
            model: car.model,
            pricePerDay: car.pricePerDay,
            bodyTypeName: car.bodyTypeName,
            imageUrl: car.imageUrl || "",
            year: car.year,
            color: car.color,
            seats: car.seats,
          });
        } else {
          setError("Car not found");
        }
      } catch (err) {
        setError("Failed to load car data");
      } finally {
        setIsLoading(false);
      }
    };

    loadCarData();
  }, [id, context?.cars]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerDay" || name === "year" || name === "seats" ? Number(value) || 0 : value,
    }));
  };

  const isValidImageUrl = (url: string) => {
    if (!url) return true; // Allow empty URLs
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    } catch {
      return false;
    }
  };

  const validateCarData = (data: Partial<Car>): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    const validTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
    const brandRegex = /^[a-zA-Z0-9\s-]+$/;

    if (!data.brandName || data.brandName.trim().length < 2) {
      errors.brandName = ["Brand must be at least 2 characters"];
    } else if (!brandRegex.test(data.brandName)) {
      errors.brandName = ["Brand contains invalid characters"];
    }

    if (!data.model || data.model.trim().length < 1) {
      errors.model = ["Model is required"];
    }

    if (!data.bodyTypeName || !validTypes.includes(data.bodyTypeName)) {
      errors.bodyTypeName = [`Type must be one of: ${validTypes.join(", ")}`];
    }

    if (!data.pricePerDay || data.pricePerDay <= 0) {
      errors.pricePerDay = ["Price must be positive"];
    }

    if (data.imageUrl && !isValidImageUrl(data.imageUrl)) {
      errors.imageUrl = ["Please enter a valid image URL"];
    }

    if (!data.year || data.year < 1900 || data.year > new Date().getFullYear() + 1) {
      errors.year = ["Year must be between 1900 and next year"];
    }

    if (!data.color || data.color.trim().length < 1) {
      errors.color = ["Color is required"];
    }

    if (!data.seats || data.seats < 1) {
      errors.seats = ["Seats must be at least 1"];
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    const errors = validateCarData(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      if (context?.updateCar && id) {
        await context.updateCar(parseInt(id), {
          ...formData,
          pricePerDay: Math.round(formData.pricePerDay || 0),
        });
        navigate(`/cars/${id}`);
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
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Edit Car</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Brand:</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName || ""}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {validationErrors.brandName?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model || ""}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {validationErrors.model?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Price per day:</label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay || 0}
            onChange={handleChange}
            min="1"
            step="1"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {validationErrors.pricePerDay?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Type:</label>
          <select
            name="bodyTypeName"
            value={formData.bodyTypeName || ""}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Select type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
          </select>
          {validationErrors.bodyTypeName?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {validationErrors.imageUrl?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year || 0}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {validationErrors.year?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color || ""}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {validationErrors.color?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Seats:</label>
          <input
            type="number"
            name="seats"
            value={formData.seats || 0}
            onChange={handleChange}
            min="1"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {validationErrors.seats?.map((err, i) => (
            <div key={i} style={{ color: "red", fontSize: "12px" }}>
              {err}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(`/cars/${id}`)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCar;