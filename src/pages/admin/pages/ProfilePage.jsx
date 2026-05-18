import { useState, useEffect } from "react";
import { COLORS, Modal, FormInput } from "../constants";
import axiosInstance from "../../../axiosInstance/page";

export default function ProfilePage() {
    const [profile,  setProfile]  = useState(null);
    const [editing,  setEditing]  = useState(false);
    const [form,     setForm]     = useState({});
    const [loading,  setLoading]  = useState(true);
    const [saving,   setSaving]   = useState(false);
    const [preview,  setPreview]  = useState(null);
    const [imgFile,  setImgFile]  = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get("/admin/profile");
            if (res.data.success) {
                setProfile(res.data.profile);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const openEdit = () => {
        setForm({ ...profile });
        setPreview(null);
        setImgFile(null);
        setEditing(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const data = new FormData();
            data.append("name",       form.name       || "");
            data.append("email",      form.email      || "");
            data.append("phone",      form.phone      || "");
            data.append("restaurant", form.restaurant || "");
            data.append("address",    form.address    || "");
            if (imgFile) data.append("avatar", imgFile);

            const res = await axiosInstance.put("/admin/profile", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(res.data.message);
            fetchProfile();
            setEditing(false);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const getInitials = (name = "") =>
        name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: COLORS.muted, fontSize: 15 }}>
                Loading profile…
            </div>
        );
    }

    if (!profile) {
        return (
            <div style={{ textAlign: "center", color: COLORS.muted, padding: 40, fontSize: 15 }}>
                Could not load profile.
            </div>
        );
    }

    const stats = [
        { label: "Years Active", value: profile.since ? new Date().getFullYear() - +profile.since : "—" },
        { label: "Menu Items",   value: profile.menuCount    || "—" },
        { label: "Customers",    value: profile.customerCount || "—" },
        { label: "Orders Today", value: profile.ordersToday  || "—" },
    ];

    const infoRows = [
        ["📧 Email",      profile.email],
        ["📱 Phone",      profile.phone],
        ["🍽️ Restaurant", profile.restaurant],
        ["📍 Address",    profile.address],
    ];

    return (
        <div style={{ maxWidth: 700 }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>Admin Profile</h2>

            {/* ── Profile Card ── */}
            <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 20, overflow: "hidden", marginBottom: 20,
            }}>
                {/* Cover banner */}
                <div style={{
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                    height: 120, position: "relative",
                }}>
                    {/* Avatar */}
                    <div style={{
                        position: "absolute", bottom: -36, left: 28,
                        width: 72, height: 72, borderRadius: "50%",
                        background: COLORS.gold,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 24, color: "#fff",
                        border: "4px solid #fff", overflow: "hidden",
                    }}>
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            getInitials(profile.name)
                        )}
                    </div>
                </div>

                {/* Details */}
                <div style={{ padding: "44px 28px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <h3 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>{profile.name}</h3>
                            <span style={{
                                background: COLORS.accent + "22", color: COLORS.accent,
                                fontSize: 13, fontWeight: 700, padding: "3px 12px", borderRadius: 20,
                            }}>
                                {profile.role || "Restaurant Admin"}
                            </span>
                        </div>
                        <button
                            onClick={openEdit}
                            style={{
                                background: COLORS.accent, color: "#fff", border: "none",
                                borderRadius: 10, padding: "9px 18px", fontWeight: 700,
                                cursor: "pointer", fontSize: 13,
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
                        {infoRows.map(([label, value]) => (
                            <div key={label} style={{ background: COLORS.bg, borderRadius: 10, padding: "10px 14px" }}>
                                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 2 }}>{label}</div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{value || "—"}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Stats row ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {stats.map((s) => (
                    <div key={s.label} style={{
                        background: COLORS.card, border: `1px solid ${COLORS.border}`,
                        borderRadius: 14, padding: 16, textAlign: "center",
                    }}>
                        <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.accent }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Edit Modal ── */}
            <Modal open={editing} title="Edit Profile" onClose={() => setEditing(false)}>
                <FormInput label="Full Name"       value={form.name       || ""} onChange={(v) => setForm({ ...form, name:       v })} />
                <FormInput label="Email"           value={form.email      || ""} onChange={(v) => setForm({ ...form, email:      v })} />
                <FormInput label="Phone"           value={form.phone      || ""} onChange={(v) => setForm({ ...form, phone:      v })} />
                <FormInput label="Restaurant Name" value={form.restaurant || ""} onChange={(v) => setForm({ ...form, restaurant: v })} />
                <FormInput label="Address"         value={form.address    || ""} onChange={(v) => setForm({ ...form, address:    v })} />

                {/* Avatar upload */}
                <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 5 }}>
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImgFile(file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                        style={{
                            width: "100%", padding: 10,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 10, background: COLORS.bg,
                        }}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            style={{ marginTop: 10, width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${COLORS.accent}` }}
                        />
                    )}
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        width: "100%", background: COLORS.accent, color: "#fff",
                        border: "none", borderRadius: 10, padding: "12px 0",
                        fontWeight: 700, cursor: saving ? "not-allowed" : "pointer",
                        fontSize: 15, opacity: saving ? 0.7 : 1,
                    }}
                >
                    {saving ? "Saving…" : "Save Changes"}
                </button>
            </Modal>
        </div>
    );
}