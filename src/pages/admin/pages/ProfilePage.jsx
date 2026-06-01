import { useState, useEffect } from "react";
import { COLORS, Modal, FormInput } from "../constants";
import adminAxios from "../../../axiosInstance/adminAxios";

export default function ProfilePage() {
    const [profile,  setProfile]  = useState(null);
    const [editing,  setEditing]  = useState(false);
    const [form,     setForm]     = useState({});
    const [loading,  setLoading]  = useState(true);
    const [saving,   setSaving]   = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await adminAxios.get("/admin/profile");
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
        setEditing(true);
    };

const handleSave = async () => {

    setSaving(true);

    try {

        const res = await adminAxios.put(
            "/admin/profile",
            form
        );

        alert(res.data.message);

        fetchProfile();

        setEditing(false);

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Update failed"
        );

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

    const infoRows = [
        ["📧 Email",      profile.email],
        ["📱 Phone",      profile.phone],
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
                           { getInitials(profile.name)}
                    </div>
                </div>

                {/* Details */}
                <div style={{ padding: "44px 28px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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

            {/* ── Edit Modal ── */}
            <Modal open={editing} title="Edit Profile" onClose={() => setEditing(false)}>
                <FormInput label="Full Name"       value={form.name       || ""} onChange={(v) => setForm({ ...form, name:       v })} />
                <FormInput label="Email"           value={form.email      || ""} onChange={(v) => setForm({ ...form, email:      v })} />
                <FormInput label="Phone"           value={form.phone      || ""} onChange={(v) => setForm({ ...form, phone:      v })} />

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