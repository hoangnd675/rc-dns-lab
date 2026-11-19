"use client";

import { useState } from "react";
import {
  Activity, AlertCircle, ArrowDownToLine, CheckCircle2, ChevronRight,
  Clipboard, Cloud, Database, Gauge, Globe2, LockKeyhole, RefreshCw,
  Server, ShieldCheck, Smartphone, Sparkles, Wifi,
} from "lucide-react";

type CheckResult = { ok: boolean; app?: string; mode?: string; dns?: string; revenuecat?: string; timestamp?: string };

const initialChecks = [
  { label: "DNS DoH / DoT", detail: "Chưa cấu hình máy chủ", state: "Chờ thiết lập" },
  { label: "RevenueCat Sandbox", detail: "Chưa kết nối project thử nghiệm", state: "Chờ thiết lập" },
  { label: "Supabase", detail: "Chưa cấu hình biến môi trường", state: "Chờ thiết lập" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-3xl border border-line bg-panel/80 p-5 shadow-2xl shadow-black/20 sm:p-6 ${className}`}>{children}</section>;
}

export default function Home() {
  const [checking, setChecking] = useState(false);
  const [health, setHealth] = useState<CheckResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function runCheck() {
    setChecking(true);
    try {
      const response = await fetch("/api/health", { cache: "no-store" });
      const data = (await response.json()) as CheckResult;
      setHealth(data);
    } catch {
      setHealth({ ok: false });
    } finally {
      setChecking(false);
    }
  }

  async function copyText(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-7 sm:px-7 sm:py-10">
      <div className="rounded-[2rem] border border-amber-500/40 bg-[#10182a] p-4 shadow-gold sm:p-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex items-center gap-4">
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl border-2 border-gold text-gold">
              <Server size={28} />
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-panel bg-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-tight sm:text-2xl">RC DNS LAB</p>
              <p className="mt-1 text-sm text-slate-400">DNS & RevenueCat QA Console</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-xl border border-gold/40 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-gold">Sandbox Lab</span>
            <span className="rounded-xl border border-line bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-300">v0.1.0</span>
          </div>
        </header>

        <Panel className="mt-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-400">Trạng thái hệ thống</p>
              <div className="mt-2 flex items-center gap-2 text-lg font-bold text-amber-300">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                Đang ở chế độ thiết lập
              </div>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Giao diện đã khởi tạo. Các dịch vụ DNS, Supabase và RevenueCat sẽ chuyển sang trạng thái hoạt động sau khi cấu hình thông tin kết nối.</p>
            </div>
            <button onClick={runCheck} disabled={checking} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-gold/50 bg-gold/10 px-5 font-semibold text-gold transition hover:bg-gold/20 disabled:opacity-60">
              <RefreshCw size={17} className={checking ? "animate-spin" : ""} /> {checking ? "Đang kiểm tra" : "Kiểm tra hệ thống"}
            </button>
          </div>
          {health && <div className="mt-5 rounded-2xl border border-line bg-slate-950/60 p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold">{health.ok ? <CheckCircle2 className="text-emerald-400" size={18} /> : <AlertCircle className="text-rose-400" size={18} />} {health.ok ? "Ứng dụng phản hồi bình thường" : "Không thể kiểm tra ứng dụng"}</div>
            {health.timestamp && <p className="mt-1 text-slate-400">Thời điểm: {new Date(health.timestamp).toLocaleString("vi-VN")}</p>}
            <p className="mt-1 text-slate-400">DNS: {health.dns ?? "unknown"} · RevenueCat: {health.revenuecat ?? "unknown"}</p>
          </div>}
        </Panel>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Globe2, label: "DNS Resolver", value: "Chưa kết nối", color: "text-sky-300" },
            { icon: Database, label: "Sandbox Data", value: "Chưa kết nối", color: "text-emerald-300" },
            { icon: Gauge, label: "Độ trễ", value: "Chưa đo", color: "text-gold" },
          ].map((item) => <Panel key={item.label} className="p-5">
            <item.icon className={item.color} size={22} />
            <p className="mt-4 text-sm text-slate-400">{item.label}</p>
            <p className="mt-1 font-bold">{item.value}</p>
          </Panel>)}
        </div>

        <Panel className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div className="flex items-center gap-3"><Activity className="text-emerald-300" size={22} /><h2 className="font-bold tracking-wide text-gold">KIỂM ĐỊNH DỊCH VỤ</h2></div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">KIỂM TRA SẴN SÀNG</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {initialChecks.map((check) => <div key={check.label} className="rounded-2xl border border-line bg-slate-950/40 p-4">
              <p className="font-semibold">{check.label}</p>
              <p className="mt-1 text-sm text-slate-400">{check.detail}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-amber-300">{check.state}</p>
            </div>)}
          </div>
        </Panel>

        <Panel className="mt-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-gold" size={23} /><h2 className="font-bold text-gold">REVENUECAT SUBSCRIPTION QA</h2></div>
          <p className="mt-3 text-sm leading-6 text-slate-400">Khu vực này dùng để kiểm thử trạng thái entitlement bằng RevenueCat Sandbox/Test Store trên ứng dụng và tài khoản thử nghiệm do bạn sở hữu.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["FREE", "Không có entitlement", "border-slate-600 text-slate-300"],
              ["GOLD_ACTIVE", "Gói thử nghiệm còn hiệu lực", "border-emerald-500/40 text-emerald-300"],
              ["GOLD_EXPIRED", "Gói thử nghiệm hết hạn", "border-amber-500/40 text-amber-300"],
            ].map(([name, desc, style]) => <div key={name} className={`rounded-2xl border bg-slate-950/40 p-4 ${style}`}>
              <p className="font-extrabold tracking-wide">{name}</p><p className="mt-1 text-xs text-slate-400">{desc}</p>
            </div>)}
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500"><LockKeyhole size={15} className="mt-0.5 shrink-0" /> Trạng thái hiển thị ở bản đầu là mô tả kịch bản QA, chưa phải dữ liệu thuê bao trực tiếp từ RevenueCat.</p>
        </Panel>

        <Panel className="mt-6">
          <div className="flex items-center gap-3"><Smartphone className="text-gold" size={23} /><h2 className="font-bold text-gold">CÀI ĐẶT DNS TRÊN IPHONE</h2></div>
          <p className="mt-3 text-sm leading-6 text-slate-400">Sau khi máy chủ DoH được triển khai và có chứng chỉ HTTPS hợp lệ, hệ thống sẽ tạo profile DNS mã hóa để cài trên iOS.</p>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-line bg-slate-950/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-400"><Wifi size={17} /> Endpoint DoH <span className="font-mono text-sky-300">Chưa cấu hình</span></div>
            <button onClick={() => copyText("DoH endpoint chưa được cấu hình")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700"><Clipboard size={16} /> {copied ? "Đã sao chép" : "Sao chép"}</button>
          </div>
          <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-slate-300"><p className="flex items-center gap-2 font-semibold text-gold"><AlertCircle size={17} /> An toàn chứng chỉ</p><p className="mt-1 text-slate-400">Profile DNS chỉ cần TLS server certificate hợp lệ. Không yêu cầu người dùng cài hoặc tin cậy CA gốc để sử dụng DoH/DoT thông thường.</p></div>
        </Panel>

        <footer className="mt-7 flex flex-col gap-2 border-t border-line pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2"><Sparkles size={14} className="text-gold" /> RC DNS LAB · QA environment</span>
          <span>Chưa kết nối máy chủ production</span>
        </footer>
      </div>
    </main>
  );
}
