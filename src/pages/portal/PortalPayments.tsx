import { payments } from "@/data/mockData";
import { Download, CreditCard, Smartphone, Globe } from "lucide-react";

const methodIcon: Record<string, typeof CreditCard> = {
  "Credit Card": CreditCard,
  "Debit Card": CreditCard,
  "UPI": Smartphone,
  "Net Banking": Globe,
};

export default function PortalPayments() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Payments & Invoices</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card-premium text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-foreground">₹18,998</p>
        </div>
        <div className="card-premium text-center">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-gold">₹3,500</p>
        </div>
        <div className="card-premium text-center">
          <p className="text-xs text-muted-foreground mb-1">Transactions</p>
          <p className="text-2xl font-bold text-foreground">6</p>
        </div>
      </div>

      <div className="card-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Invoice", "Date", "Type", "Method", "Amount", "Status", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => {
              const Icon = methodIcon[p.method] || CreditCard;
              return (
                <tr key={p.id} className="border-b border-border/50">
                  <td className="py-2.5 font-medium text-foreground">{p.invoice}</td>
                  <td className="py-2.5 text-muted-foreground">{p.date}</td>
                  <td className="py-2.5 text-muted-foreground">{p.type}</td>
                  <td className="py-2.5"><span className="flex items-center gap-1 text-muted-foreground"><Icon size={12} /> {p.method}</span></td>
                  <td className="py-2.5 font-medium text-foreground">₹{p.amount.toLocaleString()}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.status === "Completed" ? "bg-primary/10 text-primary" :
                      p.status === "Pending" ? "bg-gold/10 text-gold" :
                      "bg-destructive/10 text-destructive"
                    }`}>{p.status}</span>
                  </td>
                  <td className="py-2.5">
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground" title="Download Invoice">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
