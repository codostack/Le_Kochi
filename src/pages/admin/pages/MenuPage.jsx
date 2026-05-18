import { useState, useMemo, useEffect } from "react";
import { COLORS, CATEGORIES, QUALITY_OPTIONS, Modal, FormInput } from "../constants";
import axiosInstance from "../../../axiosInstance/page";

export default function MenuPage() {
    const [items, setItems] = useState([]);
    const [catFilter, setCatFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        name: "",
        category: "Rice",
        price: "",
        quality: "Regular",
        stock: "",
        description: "",
        rating: "",
        cooking_time: "",
        image: null,
        available: true,
    });
    console.log(form.available);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const res = await axiosInstance.get("/admin/menu");

            if (res.data.success) {
                setItems(res.data.items);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const openAdd = () => {
        setForm({ name: "", category: "Rice", price: "", quality: "Regular", stock: "", image: null, available: true });
        setEditId(null);
        setModal(true);
    };

    const openEdit = (item) => {
        setForm({ ...item });
        setEditId(item.id);
        setModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const res = await axiosInstance.delete(
                `/admin/menu/${id}`
            );

            alert(res.data.message);

            fetchMenuItems();

        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            const data = new FormData();

            data.append("name", form.name);
            data.append("category", form.category);
            data.append("price", form.price);
            data.append(
                "description",
                form.description
            );

            data.append(
                "rating",
                form.rating
            );

            data.append(
                "cooking_time",
                form.cooking_time
            );
            data.append("quality", form.quality);
            data.append("stock", form.stock);
            data.append(
                "available",
                form.available ? 1 : 0
            );
            // SINGLE IMAGE
            if (form.image) {
                data.append("image", form.image);
            }

            let res;

            // UPDATE
            if (editId) {
                res = await axiosInstance.put(
                    `/admin/menu/${editId}`,
                    data,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
            } else {

                // CREATE
                res = await axiosInstance.post(
                    "/admin/menu/add",
                    data,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
            }

            alert(res.data.message);

            fetchMenuItems();

            setModal(false);
        }
        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );
        }
    };

    const filtered = useMemo(() => {
        let list = items;
        if (catFilter !== "All") list = list.filter((i) => i.category === catFilter);
        if (search) list = list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
        return [...list].sort((a, b) => {
            if (sortBy === "price") return a.price - b.price;
            if (sortBy === "priceDesc") return b.price - a.price;
            if (sortBy === "stock") return b.stock - a.stock;
            return a.name.localeCompare(b.name);
        });
    }, [items, catFilter, search, sortBy]);

    return (
        <div>
            {/* ── Header ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Menu Management</h2>
                <button onClick={openAdd} style={{
                    background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10,
                    padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14,
                }}>
                    + Add Item
                </button>
            </div>

            {/* ── Filters ── */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                    <input
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search menu items…"
                        style={{
                            flex: 1, minWidth: 180, padding: "8px 14px",
                            border: `1px solid ${COLORS.border}`, borderRadius: 9,
                            fontSize: 14, background: COLORS.bg,
                        }}
                    />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 9, fontSize: 13, background: COLORS.bg }}>
                        <option value="name">Sort: Name A–Z</option>
                        <option value="price">Sort: Price Low–High</option>
                        <option value="priceDesc">Sort: Price High–Low</option>
                        <option value="stock">Sort: Stock</option>
                    </select>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {CATEGORIES.map((c) => (
                        <button key={c} onClick={() => setCatFilter(c)} style={{
                            padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                            fontSize: 13, fontWeight: 600,
                            background: catFilter === c ? COLORS.accent : COLORS.bg,
                            color: catFilter === c ? "#fff" : COLORS.muted,
                        }}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Menu Grid ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 14 }}>
                {filtered.map((item) => (
                    <div key={item.id} style={{
                        background: COLORS.card, border: `1px solid ${COLORS.border}`,
                        borderRadius: 16, overflow: "hidden",
                    }}>
                        <div
                            style={{
                                background: `${COLORS.accent}12`,
                                height: 160,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            {Number(item.available) === 0 && (
                                <span style={{
                                    position: "absolute", top: 8, right: 8,
                                    background: "#ef4444", color: "#fff",
                                    fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
                                }}>
                                    Unavailable
                                </span>
                            )}
                        </div>
                        <div style={{ padding: "12px 14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                                <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                                <div style={{ fontWeight: 800, color: COLORS.accent, fontSize: 16 }}>₹{item.price}</div>
                            </div>
                            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                                <span style={{ background: COLORS.bg, fontSize: 11, padding: "2px 8px", borderRadius: 10, color: COLORS.muted, fontWeight: 600 }}>
                                    {item.category}
                                </span>
                                <span style={{
                                    background: item.quality === "Special" ? "#fef9c3" : item.quality === "Premium" ? "#ede9fe" : "#f3f4f6",
                                    fontSize: 11, padding: "2px 8px", borderRadius: 10, color: COLORS.muted, fontWeight: 600,
                                }}>
                                    {item.quality}
                                </span>
                            </div>
                            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>
                                Stock: <strong style={{ color: item.stock < 30 ? "#ef4444" : COLORS.text }}>{item.stock}</strong> units
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={() => openEdit(item)} style={{
                                    flex: 1, background: COLORS.info + "18", color: COLORS.info,
                                    border: "none", borderRadius: 8, padding: "7px 0",
                                    fontWeight: 600, cursor: "pointer", fontSize: 13,
                                }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)} style={{
                                    flex: 1, background: "#fee2e2", color: "#dc2626",
                                    border: "none", borderRadius: 8, padding: "7px 0",
                                    fontWeight: 600, cursor: "pointer", fontSize: 13,
                                }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Add / Edit Modal ── */}
            <Modal open={modal} title={editId ? "Edit Menu Item" : "Add Menu Item"} onClose={() => setModal(false)}>
                <FormInput label="Item Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                        <FormInput label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })}
                            options={["Rice", "Dosa", "Curry", "Sides", "Beverages", "Snacks"]} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <FormInput label="Quality" value={form.quality} onChange={(v) => setForm({ ...form, quality: v })}
                            options={QUALITY_OPTIONS} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                        <FormInput label="Price (₹)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <FormInput label="Stock (units)" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} type="number" />
                    </div>
                </div>
                <FormInput
                    label="Description"
                    value={form.description}
                    onChange={(v) =>
                        setForm({
                            ...form,
                            description: v,
                        })
                    }
                />

                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                        <FormInput
                            label="Rating"
                            value={form.rating}
                            type="number"
                            onChange={(v) =>
                                setForm({
                                    ...form,
                                    rating: v,
                                })
                            }
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <FormInput
                            label="Cooking Time"
                            value={form.cooking_time}
                            onChange={(v) =>
                                setForm({
                                    ...form,
                                    cooking_time: v,
                                })
                            }
                            placeholder="25 min"
                        />
                    </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: 6,
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        Upload Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                image: e.target.files[0],
                            })
                        }
                        style={{
                            width: "100%",
                            padding: 10,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 10,
                            background: COLORS.bg,
                        }}
                    />
                </div>        <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>Available</label>
                    <input type="checkbox" checked={Boolean(form.available)}
                        onChange={(e) => setForm({ ...form, available: e.target.checked })}
                        style={{ width: 18, height: 18, cursor: "pointer" }} />
                </div>
                <button onClick={handleSave} style={{
                    width: "100%", background: COLORS.accent, color: "#fff",
                    border: "none", borderRadius: 10, padding: "12px 0",
                    fontWeight: 700, cursor: "pointer", fontSize: 15,
                }}>
                    {editId ? "Update Item" : "Add Item"}
                </button>
            </Modal>
        </div>
    );
}