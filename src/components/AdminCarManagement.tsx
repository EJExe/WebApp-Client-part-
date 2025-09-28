/**
 * @fileoverview Admin component for managing cars in the system
 * (Административный компонент для управления автомобилями в системе)
 * @module components/AdminCarManagement
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, CarCreateDto, BodyType, Brand, CarCategory, CarDriveType, FuelType, CarFeature } from "../models/car.models";
import { referenceService } from "../services/ReferenceService";
import { carService } from "../services/CarService";
import { useAuth } from "../context/AuthContext";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
    Grid,
    Container,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Pagination,
    styled
} from "@mui/material";
import {
    Edit,
    Delete,
    AddPhotoAlternate,
    CheckCircle,
    Cancel,
    DirectionsCar,
    MonetizationOn,
    Palette,
    EventSeat,
    MyLocation
} from "@mui/icons-material";

/**
 * @component
 * @description A styled button component with gradient background and hover effects
 * (Стилизованная кнопка с градиентным фоном и эффектами при наведении)
 */
const GradientButton = styled(Button)({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 8,
    color: 'white',
    padding: '8px 24px',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .2)',
    '&:hover': {
        background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
    },
});

/**
 * @component
 * @description A styled card component with enhanced visual effects and hover animation
 * (Стилизованная карточка с улучшенными визуальными эффектами и анимацией при наведении)
 */
const StyledCard = styled(Card)({
    borderRadius: 16,
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
    }
});

/**
 * @component
 * @description A styled section header with icon alignment
 * (Стилизованный заголовок раздела с выравниванием иконок)
 */
const SectionHeader = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    '& svg': {
        fontSize: 32
    }
});

/**
 * @component
 * @description Admin component for managing cars - adding, editing, and deleting cars
 * (Административный компонент для управления автомобилями - добавление, редактирование и удаление автомобилей)
 * @returns {JSX.Element} Rendered component
 * (Отрендеренный компонент)
 */
const AdminCarManagement: React.FC = () => {
    /**
     * @type {Object} User authentication context
     * (Контекст аутентификации пользователя)
     */
    const { user } = useAuth();
    /**
     * @type {Function} React Router navigate function
     * (Функция навигации React Router)
     */
    const navigate = useNavigate();
    /**
     * @type {[Car[], React.Dispatch<React.SetStateAction<Car[]>>]} State for car list
     * (Состояние для списка автомобилей)
     */
    const [cars, setCars] = useState<Car[]>([]);
    /**
     * @type {[Brand[], React.Dispatch<React.SetStateAction<Brand[]>>]} State for brand list
     * (Состояние для списка брендов)
     */
    const [brands, setBrands] = useState<Brand[]>([]);
    /**
     * @type {[BodyType[], React.Dispatch<React.SetStateAction<BodyType[]>>]} State for body type list
     * (Состояние для списка типов кузова)
     */
    const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
    /**
     * @type {[CarCategory[], React.Dispatch<React.SetStateAction<CarCategory[]>>]} State for category list
     * (Состояние для списка категорий)
     */
    const [categories, setCategories] = useState<CarCategory[]>([]);
    /**
     * @type {[CarDriveType[], React.Dispatch<React.SetStateAction<CarDriveType[]>>]} State for drive type list
     * (Состояние для списка типов привода)
     */
    const [driveTypes, setDriveTypes] = useState<CarDriveType[]>([]);
    /**
     * @type {[FuelType[], React.Dispatch<React.SetStateAction<FuelType[]>>]} State for fuel type list
     * (Состояние для списка типов топлива)
     */
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
    /**
     * @type {[CarFeature[], React.Dispatch<React.SetStateAction<CarFeature[]>>]} State for feature list
     * (Состояние для списка особенностей)
     */
    const [features, setFeatures] = useState<CarFeature[]>([]);
    /**
     * @type {Object} Pagination state
     * (Состояние пагинации)
     */
    const [pagination, setPagination] = useState({
        totalCount: 0,
        pageNumber: 1,
        pageSize: 9
    });
    /**
     * @type {[CarCreateDto, React.Dispatch<React.SetStateAction<CarCreateDto>>]} Form state for car data
     * (Состояние формы для данных автомобиля)
     */
    const [form, setForm] = useState<CarCreateDto>({
        brandId: 0,
        model: "",
        year: 0,
        mileage: 0,
        color: "",
        seats: 0,
        pricePerDay: 0,
        latitude: 0,
        longitude: 0,
        bodyTypeId: 0,
        categoryId: 0,
        driveTypeId: 0,
        fuelTypeId: 0,
        featureIds: [],
        image: null,
        isLeasingAvailable: false,
    });
    /**
     * @type {[number | null, React.Dispatch<React.SetStateAction<number | null>>]} ID of car being edited
     * (ID редактируемого автомобиля)
     */
    const [editingId, setEditingId] = useState<number | null>(null);
    /**
     * @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]} Error message state
     * (Состояние сообщения об ошибке)
     */
    const [error, setError] = useState<string | null>(null);
    /**
     * @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]} Success message state
     * (Состояние сообщения об успехе)
     */
    const [success, setSuccess] = useState<string | null>(null);
    /**
     * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} Loading state
     * (Состояние загрузки)
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * @description Effect hook to load initial data and check user permissions
     * (Хук эффекта для загрузки начальных данных и проверки прав пользователя)
     */
    useEffect(() => {
        if (user?.userRole !== "admin") {
            navigate("/");
            return;
        }

        /**
         * @async
         * @function fetchData
         * @description Fetches all necessary data for the component
         * (Получает все необходимые данные для компонента)
         */
        const fetchData = async () => {
            try {
                const [
                    result,
                    brandsData,
                    bodyTypesData,
                    categoriesData,
                    driveTypesData,
                    fuelTypesData,
                    featuresData,
                ] = await Promise.all([
                    carService.getCars({
                        pageNumber: pagination.pageNumber,
                        pageSize: pagination.pageSize
                    }),
                    referenceService.getBrands(),
                    referenceService.getBodyTypes(),
                    referenceService.getCategories(),
                    referenceService.getDriveTypes(),
                    referenceService.getFuelTypes(),
                    referenceService.getFeatures(),
                ]);
                console.log("Fetched cars:", result.cars);
                setCars(result.cars);
                setBrands(brandsData);
                setBodyTypes(bodyTypesData);
                setCategories(categoriesData);
                setDriveTypes(driveTypesData);
                setFuelTypes(fuelTypesData);
                setFeatures(featuresData);
                setPagination(prev => ({
                    ...prev,
                    totalCount: result.totalCount
                }));
            } catch (error) {
                setError("Failed to load data");
                console.error(error);
            }
        };

        fetchData();
    }, [user, navigate, pagination.pageNumber, pagination.pageSize]);

    /**
     * @function handleEdit
     * @description Sets up form for editing an existing car
     * (Настраивает форму для редактирования существующего автомобиля)
     * @param {Car} car - Car object to edit
     * (Объект автомобиля для редактирования)
     */
    const handleEdit = (car: Car) => {
        console.log("Editing car:", car);
        console.log("Setting isLeasingAvailable to:", car.isLeasingAvailable);
        setEditingId(car.id);
        setForm({
            brandId: car.brandId,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            color: car.color,
            seats: car.seats,
            pricePerDay: car.pricePerDay,
            latitude: car.latitude,
            longitude: car.longitude,
            bodyTypeId: car.bodyTypeId,
            categoryId: car.categoryId,
            driveTypeId: car.driveTypeId,
            fuelTypeId: car.fuelTypeId,
            featureIds: car.featureIds || [],
            image: null,
            isLeasingAvailable: car.isLeasingAvailable,
        });
    };

    /**
     * @async
     * @function handleLeasingToggle
     * @description Toggles the leasing availability status of a car
     * (Переключает статус доступности лизинга автомобиля)
     * @param {number} id - ID of the car
     * (ID автомобиля)
     * @param {boolean} isLeasingAvailable - Current leasing status
     * (Текущий статус лизинга)
     */
    const handleLeasingToggle = async (id: number, isLeasingAvailable: boolean) => {
        try {
            const newLeasingStatus = !isLeasingAvailable;
            console.log(`Toggling leasing status for car ID ${id} to: ${newLeasingStatus}`);
            const carsData = await carService.getCars({
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            });
            console.log("Updated cars after toggle:", carsData.cars);
            setCars(carsData.cars);
            setPagination({
                pageNumber: pagination.pageNumber, // Preserve current page number
                pageSize: pagination.pageSize,
                totalCount: carsData.totalCount
            });
            setSuccess(`Leasing status ${newLeasingStatus ? "enabled" : "disabled"} successfully!`);
        } catch (error: any) {
            setError(error.message || "Failed to toggle leasing status");
            console.error("Error in handleLeasingToggle:", error);
        }
    };

    /**
     * @async
     * @function handleSubmit
     * @description Handles form submission for creating or updating a car
     * (Обрабатывает отправку формы для создания или обновления автомобиля)
     * @param {React.FormEvent} e - Form event
     * (Событие формы)
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handleSubmit called with form:", form);
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        if (!form.brandId || form.brandId === 0) {
            setError("Please select a valid brand");
            setIsLoading(false);
            return;
        }
        if (!form.model) {
            setError("Model is required");
            setIsLoading(false);
            return;
        }
        if (!form.year || form.year < 1900) {
            setError("Valid year is required");
            setIsLoading(false);
            return;
        }
        if (!form.bodyTypeId || form.bodyTypeId === 0) {
            setError("Please select a valid body type");
            setIsLoading(false);
            return;
        }
        if (!form.categoryId || form.categoryId === 0) {
            setError("Please select a valid category");
            setIsLoading(false);
            return;
        }
        if (!form.driveTypeId || form.driveTypeId === 0) {
            setError("Please select a valid drive type");
            setIsLoading(false);
            return;
        }
        if (!form.fuelTypeId || form.fuelTypeId === 0) {
            setError("Please select a valid fuel type");
            setIsLoading(false);
            return;
        }
        if (form.isLeasingAvailable === undefined || form.isLeasingAvailable === null) {
            setError("Leasing status is required");
            setIsLoading(false);
            return;
        }

        try {
            const carData: CarCreateDto = {
                brandId: form.brandId,
                model: form.model,
                year: form.year,
                mileage: form.mileage,
                color: form.color,
                seats: form.seats,
                pricePerDay: form.pricePerDay,
                latitude: form.latitude,
                longitude: form.longitude,
                bodyTypeId: form.bodyTypeId,
                categoryId: form.categoryId,
                driveTypeId: form.driveTypeId,
                fuelTypeId: form.fuelTypeId,
                featureIds: form.featureIds,
                image: form.image,
                isLeasingAvailable: form.isLeasingAvailable,
            };

            if (editingId) {
                await carService.update(editingId, carData);
                setSuccess("Успех!");
            } else {
                await carService.create(carData);
                setSuccess("Успех");
            }

            setForm({
                brandId: 0,
                model: "",
                year: 0,
                mileage: 0,
                color: "",
                seats: 0,
                pricePerDay: 0,
                latitude: 0,
                longitude: 0,
                bodyTypeId: 0,
                categoryId: 0,
                driveTypeId: 0,
                fuelTypeId: 0,
                featureIds: [],
                image: null,
                isLeasingAvailable: false,
            });
            setEditingId(null);
            const carsData = await carService.getCars({
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            });
            console.log("Updated cars:", carsData.cars);
            setCars(carsData.cars);
            setPagination({
                pageNumber: pagination.pageNumber, // Preserve current page number
                pageSize: pagination.pageSize,
                totalCount: carsData.totalCount
            });
        } catch (error: any) {
            setError(error.message || "Failed to save car");
            console.error("Error in handleSubmit:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @async
     * @function handleDelete
     * @description Deletes a car from the system
     * (Удаляет автомобиль из системы)
     * @param {number} id - ID of the car to delete
     * (ID автомобиля для удаления)
     */
    const handleDelete = async (id: number) => {
        try {
            await carService.delete(id);
            setSuccess("Car deleted successfully!");
            const carsData = await carService.getCars({
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            });
            setCars(carsData.cars);
            setPagination({
                pageNumber: pagination.pageNumber, // Preserve current page number
                pageSize: pagination.pageSize,
                totalCount: carsData.totalCount
            });
        } catch (error: any) {
            setError(error.message || "Failed to delete car");
            console.error(error);
        }
    };

    /**
     * @function handlePageChange
     * @description Handles pagination page changes
     * (Обрабатывает изменения страницы пагинации)
     * @param {React.ChangeEvent<unknown>} _ - Change event (unused)
     * (Событие изменения (не используется))
     * @param {number} value - New page number
     * (Новый номер страницы)
     */
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPagination(prev => ({ ...prev, pageNumber: value }));
    };

    return (
        <Container maxWidth="xl" sx={{ p: 4, bgcolor: '#f8f9fa' }}>
            <SectionHeader variant="h4">
                <DirectionsCar /> Управление Автомобилями
            </SectionHeader>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>{success}</Alert>}

            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, bgcolor: 'white' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {editingId ? <Edit /> : <AddPhotoAlternate />}
                    {editingId ? 'Редактирование' : 'Добавить новый автомобиль'}
                </Typography>
                <Divider sx={{ mb: 4 }} />

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Марка и модель */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Марка</InputLabel>
                                <Select
                                    value={form.brandId}
                                    onChange={(e) => setForm({ ...form, brandId: Number(e.target.value) })}
                                    sx={{ borderRadius: 2 }}
                                >
                                    {brands.map((brand) => (
                                        <MenuItem key={brand.id} value={brand.id}>
                                            <img 
                                                
                                                alt={brand.name} 
                                                style={{ width: 24, height: 24, marginRight: 8 }}
                                            />
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Модель"
                                variant="outlined"
                                size="small"
                                value={form.model}
                                onChange={(e) => setForm({ ...form, model: e.target.value })}
                                InputProps={{
                                    endAdornment: <Edit color="action" />,
                                }}
                            />
                        </Grid>

                        {/* Характеристики */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                Основные характеристики
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Год выпуска"
                                        type="number"
                                        size="small"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Пробег"
                                        type="number"
                                        size="small"
                                        value={form.mileage}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">км</InputAdornment>,
                                        }}
                                        onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Места"
                                        type="number"
                                        size="small"
                                        value={form.seats}
                                        InputProps={{
                                            endAdornment: <EventSeat fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Цвет"
                                        size="small"
                                        value={form.color}
                                        InputProps={{
                                            endAdornment: <Palette fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, color: e.target.value })}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Цена и местоположение */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Цена за день"
                                type="number"
                                size="small"
                                value={form.pricePerDay}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                                    endAdornment: <MonetizationOn color="action" />,
                                }}
                                onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Широта"
                                        type="number"
                                        size="small"
                                        value={form.latitude}
                                        InputProps={{
                                            endAdornment: <MyLocation fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Долгота"
                                        type="number"
                                        size="small"
                                        value={form.longitude}
                                        InputProps={{
                                            endAdornment: <MyLocation fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Дополнительные опции */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Тип кузова</InputLabel>
                                <Select
                                    value={form.bodyTypeId}
                                    onChange={(e) => setForm({ ...form, bodyTypeId: Number(e.target.value) })}
                                >
                                    {bodyTypes.map((bodyType) => (
                                        <MenuItem key={bodyType.id} value={bodyType.id}>
                                            {bodyType.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Категория</InputLabel>
                                <Select
                                    value={form.categoryId}
                                    onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Тип привода</InputLabel>
                                <Select
                                    value={form.driveTypeId}
                                    onChange={(e) => setForm({ ...form, driveTypeId: Number(e.target.value) })}
                                >
                                    {driveTypes.map((driveType) => (
                                        <MenuItem key={driveType.id} value={driveType.id}>
                                            {driveType.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Тип топлива</InputLabel>
                                <Select
                                    value={form.fuelTypeId}
                                    onChange={(e) => setForm({ ...form, fuelTypeId: Number(e.target.value) })}
                                >
                                    {fuelTypes.map((fuelType) => (
                                        <MenuItem key={fuelType.id} value={fuelType.id}>
                                            {fuelType.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Особенности и фото */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Особенности</InputLabel>
                                <Select
                                    multiple
                                    value={form.featureIds}
                                    onChange={(e) => setForm({ ...form, featureIds: e.target.value as number[] })}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip 
                                                    key={value} 
                                                    label={features.find(f => f.id === value)?.name} 
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {features.map((feature) => (
                                        <MenuItem key={feature.id} value={feature.id}>
                                            {feature.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1.5,
                                borderRadius: 3,
                                bgcolor: form.isLeasingAvailable ? 'success.light' : 'error.light',
                                transition: 'all 0.3s ease'
                                }}>
                                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                    Статус аренды:
                                    <Box component="span" sx={{ ml: 1, fontWeight: 600 }}>
                                    {form.isLeasingAvailable ? 'Доступен' : 'Недоступен'}
                                    </Box>
                                </Typography>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    sx={{
                                    borderRadius: 2,
                                    minWidth: 120,
                                    bgcolor: form.isLeasingAvailable ? 'success.main' : 'error.main',
                                    '&:hover': {
                                        bgcolor: form.isLeasingAvailable ? 'success.dark' : 'error.dark'
                                    }
                                    }}
                                    onClick={() => setForm({...form, isLeasingAvailable: !form.isLeasingAvailable})}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {form.isLeasingAvailable ? (
                                        <>
                                        <CheckCircle fontSize="small" />
                                        Включено
                                        </>
                                    ) : (
                                        <>
                                        <Cancel fontSize="small" />
                                        Выключено
                                        </>
                                    )}
                                    </Box>
                                </Button>
                                </Box>
                            </FormControl>
                            </Grid>

                        <Grid item xs={12} md={6}>
                            <Button
                                component="label"
                                variant="outlined"
                                fullWidth
                                startIcon={<AddPhotoAlternate />}
                                sx={{ py: 1.5, borderRadius: 2 }}
                            >
                                Загрузить фото
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => setForm({ ...form, image: e.target.files ? e.target.files[0] : null })}
                                />
                            </Button>
                        </Grid>

                        {/* Кнопки управления */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                {editingId && (
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        onClick={() => setEditingId(null)}
                                        startIcon={<Cancel />}
                                    >
                                        Отмена
                                    </Button>
                                )}
                                <GradientButton
                                    type="submit"
                                    disabled={isLoading}
                                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                                >
                                    {editingId ? 'Сохранить изменения' : 'Добавить автомобиль'}
                                </GradientButton>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Список автомобилей */}
            <SectionHeader variant="h5">
                <DirectionsCar /> Текущие Автомобили
            </SectionHeader>

            <Grid container spacing={3}>
                {cars.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car.id}>
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip 
                                        label={car.isLeasingAvailable ? 'Доступен лизинг' : 'Лизинг закрыт'}
                                        color={car.isLeasingAvailable ? 'success' : 'error'}
                                        size="small"
                                        icon={car.isLeasingAvailable ? <CheckCircle /> : <Cancel />}
                                    />
                                    <Box>
                                        <IconButton onClick={() => handleEdit(car)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(car.id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography variant="h6" gutterBottom>
                                    {brands.find((b) => b.id === car.brandId)?.name} {car.model}
                                </Typography>

                                <Grid container spacing={1} sx={{ mb: 2 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            <EventSeat fontSize="small" /> Места: {car.seats}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            <Palette fontSize="small" /> {car.color}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            Год: {car.year}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            {car.mileage.toLocaleString()} км
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" color="primary">
                                        {car.pricePerDay.toLocaleString()} ₽/день
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {cars.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                    <Pagination
                        count={Math.ceil(pagination.totalCount / pagination.pageSize)}
                        page={pagination.pageNumber}
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                        size="large"
                    />
                </Box>
            )}
        </Container>
    );
};

export default AdminCarManagement;