import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const resolvedParams = await searchParams;
  const plan = resolvedParams.plan || "Выбранный тариф";

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 pt-20 px-4">
      <div className="bg-transparent backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Оплата прошла успешно!</h1>
        <p className="text-zinc-400 mb-8 text-lg">
          Спасибо за выбор Nexus Web Studio. Ваш тариф <strong>«{plan}»</strong> успешно оплачен и активирован. Мы отправили чек и детали заказа вам на почту.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all group w-full"
        >
          Вернуться на главную
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
