"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Users,
  DollarSign,
  Clock,
  Download,
  LogOut,
  Send,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/Badge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils/cn";
import type { Registration } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"registrations" | "dates" | "email">("registrations");
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    setRegistrations((data as Registration[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleExportCSV = async () => {
    const res = await fetch("/api/admin/export-csv");
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingEmail(true);
    setEmailStatus(null);

    const res = await fetch("/api/admin/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: emailTo, subject: emailSubject, body: emailBody }),
    });

    if (res.ok) {
      setEmailStatus("Email sent successfully!");
      setEmailTo("");
      setEmailSubject("");
      setEmailBody("");
    } else {
      setEmailStatus("Failed to send email.");
    }
    setSendingEmail(false);
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      !search ||
      `${r.first_name} ${r.last_name} ${r.email} ${r.phone}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = registrations
    .filter((r) => r.payment_status === "completed")
    .length * 950;
  const completedCount = registrations.filter(
    (r) => r.payment_status === "completed"
  ).length;
  const pendingCount = registrations.filter(
    (r) => r.payment_status === "pending"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-7 w-7 text-gold-500" />
            <h1 className="text-xl font-bold font-heading text-navy-800">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Registrations", value: registrations.length, icon: Users, color: "text-blue-600" },
            { label: "Completed Payments", value: completedCount, icon: DollarSign, color: "text-green-600" },
            { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-gold-600" },
            { label: "Pending Payments", value: pendingCount, icon: Clock, color: "text-yellow-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-navy-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {(["registrations", "dates", "email"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-navy-700 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              )}
            >
              {tab === "registrations" && "Registrations"}
              {tab === "dates" && "Course Dates"}
              {tab === "email" && "Send Email"}
            </button>
          ))}
        </div>

        {activeTab === "registrations" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or phone..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2.5 bg-navy-700 text-white rounded-lg text-sm font-medium hover:bg-navy-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Course Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((reg) => (
                    <>
                      <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-navy-800">
                          {reg.first_name} {reg.last_name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{reg.email}</td>
                        <td className="px-4 py-3 text-gray-600">{reg.phone}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{reg.course_date}</td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              reg.payment_status === "completed"
                                ? "success"
                                : reg.payment_status === "pending"
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {reg.payment_status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              setExpandedRow(expandedRow === reg.id ? null : reg.id)
                            }
                            className="text-gray-400 hover:text-navy-700"
                          >
                            {expandedRow === reg.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedRow === reg.id && (
                        <tr key={`${reg.id}-details`}>
                          <td colSpan={7} className="px-4 py-4 bg-gray-50">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                              <div>
                                <p className="text-gray-500">Address</p>
                                <p className="text-navy-800">
                                  {reg.street}
                                  {reg.street2 && `, ${reg.street2}`}
                                  <br />
                                  {reg.city}, {reg.state} {reg.zip}
                                  <br />
                                  {reg.country}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Course</p>
                                <p className="text-navy-800">{reg.course_selection}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Message</p>
                                <p className="text-navy-800">{reg.message || "—"}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Stripe Session</p>
                                <p className="text-navy-800 break-all">
                                  {reg.stripe_session_id || "—"}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setActiveTab("email");
                                setEmailTo(reg.email);
                              }}
                              className="mt-3 flex items-center gap-1 text-xs text-gold-600 hover:text-gold-500"
                            >
                              <Send className="h-3 w-3" /> Email this student
                            </button>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                        No registrations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "dates" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold font-heading text-navy-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold-500" />
              Course Dates
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Manage course dates directly in your Supabase dashboard&apos;s{" "}
              <code className="bg-gray-100 px-1 rounded">course_dates</code> table, or use the API endpoints.
            </p>
            <div className="bg-navy-50 rounded-lg p-4 text-sm">
              <p className="text-navy-800 font-medium mb-2">Current Course Dates:</p>
              <p className="text-gray-600">June 12, 13, 14 &amp; 16, 2026 — 9:00 AM – 5:00 PM PST</p>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
            <h2 className="text-lg font-bold font-heading text-navy-800 mb-4 flex items-center gap-2">
              <Send className="h-5 w-5 text-gold-500" />
              Send Email
            </h2>
            {emailStatus && (
              <div
                className={cn(
                  "mb-4 p-3 rounded-lg text-sm",
                  emailStatus.includes("success")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                )}
              >
                {emailStatus}
                <button onClick={() => setEmailStatus(null)} className="float-right">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  required
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  placeholder="student@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  placeholder="Subject line"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm resize-none"
                  placeholder="Email message..."
                />
              </div>
              <button
                type="submit"
                disabled={sendingEmail}
                className="flex items-center gap-2 px-6 py-2.5 bg-navy-700 text-white rounded-lg text-sm font-medium hover:bg-navy-600 transition-colors disabled:opacity-50"
              >
                {sendingEmail ? (
                  <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {sendingEmail ? "Sending..." : "Send Email"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
