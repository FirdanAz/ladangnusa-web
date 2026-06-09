"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { chatApi } from "@/lib/api";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    route?: { path: string; label: string } | null;
    loading?: boolean;
}

const WELCOME: Message = {
    id: "welcome",
    role: "assistant",
    content: "Halo! Saya **Nusa**, asisten pertanian LadangNusa 🌿\n\nSaya bisa membantu kamu dengan pertanyaan seputar pertanian, tanaman, lahan, dan fitur aplikasi. Coba tanya sesuatu!",
};

export function ChatWidget() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto scroll ke bawah saat pesan baru
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input saat chat dibuka
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 100);
    }, [open]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
        };

        const loadingMsg: Message = {
            id: "loading",
            role: "assistant",
            content: "",
            loading: true,
        };

        setMessages((prev) => [...prev, userMsg, loadingMsg]);
        setInput("");
        setLoading(true);

        // Build history untuk dikirim ke API (exclude welcome & loading)
        const history = messages
            .filter((m) => m.id !== "welcome" && !m.loading)
            .map((m) => ({
                role: m.role === "user" ? "user" as const : "model" as const,
                content: m.content,
            }));

        try {
            const res = await chatApi.send(text, history);

            const assistantMsg: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: res.data.reply,
                route: res.data.route,
            };

            setMessages((prev) => prev.filter((m) => m.id !== "loading").concat(assistantMsg));
        } catch {
            setMessages((prev) =>
                prev.filter((m) => m.id !== "loading").concat({
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "Maaf, saya tidak bisa merespons saat ini. Silakan coba lagi.",
                })
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRoute = (path: string) => {
        router.push(path);
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Render teks dengan bold markdown sederhana
    const renderText = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) =>
            part.startsWith("**") && part.endsWith("**")
                ? <strong key={i}>{part.slice(2, -2)}</strong>
                : part
        );
    };

    return (
        <>
            {/* ── Chat Window ── */}
            {open && (
                <div
                    style={{
                        position: "fixed", bottom: 88, right: 24, zIndex: 1000,
                        width: 360, height: 500,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: 20,
                        boxShadow: "0 20px 60px rgba(0,0,0,.15)",
                        display: "flex", flexDirection: "column",
                        overflow: "hidden",
                        animation: "chat-pop .2s ease",
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: "14px 18px",
                        background: "linear-gradient(135deg, #1d9a4e, #0d5a2e)",
                        display: "flex", alignItems: "center", gap: 10,
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: "rgba(255,255,255,.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18,
                        }}>
                            🌿
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Nusa</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>Asisten Pertanian AI</div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.6)", fontSize: 18 }}
                        >
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 0" }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: "flex",
                                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                    marginBottom: 10,
                                }}
                            >
                                {msg.role === "assistant" && (
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                        background: "var(--green-light)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 14, marginRight: 8, marginTop: 2,
                                    }}>
                                        🌿
                                    </div>
                                )}
                                <div style={{ maxWidth: "75%" }}>
                                    <div style={{
                                        padding: "10px 14px",
                                        borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                                        background: msg.role === "user" ? "var(--green-accent)" : "var(--bg-page)",
                                        color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                                        fontSize: 13.5,
                                        lineHeight: 1.6,
                                        border: msg.role === "assistant" ? "1px solid var(--border)" : "none",
                                    }}>
                                        {msg.loading ? (
                                            <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
                                                {[0, 1, 2].map((i) => (
                                                    <div key={i} style={{
                                                        width: 6, height: 6, borderRadius: "50%",
                                                        background: "var(--text-muted)",
                                                        animation: `bounce .8s ${i * 0.15}s infinite`,
                                                    }} />
                                                ))}
                                            </div>
                                        ) : (
                                            <span style={{ whiteSpace: "pre-wrap" }}>{renderText(msg.content)}</span>
                                        )}
                                    </div>

                                    {/* Route button */}
                                    {msg.route && (
                                        <button
                                            onClick={() => handleRoute(msg.route!.path)}
                                            style={{
                                                marginTop: 6,
                                                display: "flex", alignItems: "center", gap: 6,
                                                fontSize: 12, fontWeight: 600,
                                                color: "var(--green-accent)",
                                                background: "var(--green-light)",
                                                border: "1px solid rgba(29,154,78,.2)",
                                                borderRadius: 8, padding: "6px 12px",
                                                cursor: "pointer", transition: "all .15s",
                                            }}
                                        >
                                            <i className="bi bi-arrow-right-circle" />
                                            {msg.route.label}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
                        <div style={{
                            display: "flex", gap: 8, alignItems: "center",
                            background: "var(--bg-page)",
                            border: "1px solid var(--border)",
                            borderRadius: 12, padding: "6px 6px 6px 14px",
                        }}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Tanya sesuatu..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                style={{
                                    flex: 1, background: "none", border: "none", outline: "none",
                                    fontSize: 13.5, color: "var(--text-primary)", fontFamily: "inherit",
                                }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                style={{
                                    width: 34, height: 34, borderRadius: 9, border: "none",
                                    background: input.trim() && !loading ? "var(--green-accent)" : "var(--border)",
                                    color: "#fff", cursor: input.trim() && !loading ? "pointer" : "default",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    transition: "all .15s", flexShrink: 0,
                                }}
                            >
                                <i className="bi bi-send-fill" style={{ fontSize: 13 }} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Floating Button ── */}
            <button
                onClick={() => setOpen((v) => !v)}
                style={{
                    position: "fixed", bottom: 24, right: 24, zIndex: 1001,
                    width: 56, height: 56, borderRadius: 16, border: "none",
                    background: open
                        ? "var(--text-muted)"
                        : "linear-gradient(135deg, #1d9a4e, #0d5a2e)",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                    boxShadow: "0 4px 20px rgba(29,154,78,.4)",
                    transition: "all .2s",
                }}
                title={open ? "Tutup chat" : "Chat dengan Nusa"}
            >
                {open
                    ? <i className="bi bi-x-lg" style={{ fontSize: 20 }} />
                    : "🌿"
                }
            </button>

            <style jsx global>{`
        @keyframes chat-pop {
          from { opacity: 0; transform: scale(.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)  translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
        </>
    );
}