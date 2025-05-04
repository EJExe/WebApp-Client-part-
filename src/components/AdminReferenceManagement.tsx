import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BodyType } from "../models/car.models";
import { referenceService } from "../services/ReferenceService";
import { useAuth } from "../context/AuthContext";

const AdminReferenceManagement: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
    const [form, setForm] = useState<BodyType>({ id: 0, name: "" });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        if (user?.userRole !== "admin") {
            navigate("/");
            return;
        }

        const fetchBodyTypes = async () => {
            try {
                setBodyTypes(await referenceService.getBodyTypes());
            } catch (error) {
                console.error(error);
            }
        };

        fetchBodyTypes();
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await referenceService.updateBodyType(editingId, form);
            } else {
                await referenceService.createBodyType(form);
            }
            setForm({ id: 0, name: "" });
            setEditingId(null);
            setBodyTypes(await referenceService.getBodyTypes());
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (bodyType: BodyType) => {
        setEditingId(bodyType.id);
        setForm(bodyType);
    };

    const handleDelete = async (id: number) => {
        try {
            await referenceService.deleteBodyType(id);
            setBodyTypes(await referenceService.getBodyTypes());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={4}>Manage Body Types</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained">{editingId ? "Update" : "Add"} Body Type</Button>
            </form>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5">Existing Body Types</Typography>
                {bodyTypes.map((type) => (
                    <Box key={type.id} sx={{ border: "1px solid #ccc", p: 2, mt: 2, borderRadius: 2 }}>
                        <Typography>{type.name}</Typography>
                        <Button onClick={() => handleEdit(type)}>Edit</Button>
                        <Button onClick={() => handleDelete(type.id)} color="error">Delete</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AdminReferenceManagement;