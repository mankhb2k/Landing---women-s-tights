"use client";
import NavBottom from "@/components/NavBottom";
import FormSelectModal from "@/components/FormSelectModal";
import { Star, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section với ảnh lớn */}
      <section className="relative h-[70vh] bg-[url('https://images.unsplash.com/photo-1582880985227-445b21458383?q=80&w=1000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-10 left-6 text-white">
          <h1 className="mb-2 text-4xl font-extrabold uppercase italic">
            Quần Tất Silk Pro
          </h1>
          <p className="text-lg opacity-90">
            Mỏng nhẹ như mây - Bền bỉ gấp 10 lần
          </p>
        </div>
      </section>

      {/* Thông tin sản phẩm */}
      <section className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-red-600">199.000đ</span>
            <span className="ml-2 text-sm text-gray-400 line-through">
              350.000đ
            </span>
          </div>
          <div className="flex items-center gap-1 rounded bg-yellow-100 px-2 py-1">
            <Star className="fill-yellow-500 text-yellow-500" size={16} />
            <span className="text-sm font-bold text-yellow-700">
              4.9 (1.2k bán)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="border-l-4 border-black pl-3 text-xl font-bold italic">
            TẠI SAO NÊN CHỌN SILK PRO?
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Sợi lụa tơ tằm siêu bền, không rút sợi",
              "Công nghệ chống tĩnh điện, không dính váy",
              "Thiết kế ôm dáng, nâng vòng 3 tự nhiên",
              "Thoáng khí, không gây bí bách mùa hè",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="text-green-500" size={18} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Đoạn text dài để test hiệu ứng scroll kính mờ */}
        <div className="space-y-6 py-10 leading-relaxed text-gray-600">
          <p>
            Quần tất Silk Pro là sự lựa chọn hàng đầu cho các quý cô công sở.
            Với độ mỏng chỉ 15D, sản phẩm mang lại cảm giác "mặc như không mặc",
            giúp đôi chân trông thật và đều màu hơn bao giờ hết...
          </p>
          <img
            src="https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=1000"
            alt="Feedback"
            className="w-full rounded-2xl shadow-lg"
          />
          <p>
            Đặc biệt, công nghệ dệt 3D giúp sản phẩm có khả năng đàn hồi cực
            cao, phù hợp với mọi dáng người từ 40kg đến 70kg mà không lo bị chật
            hay tụt đũng...
          </p>
        </div>
      </section>

      {/* Modals & Navigation */}
      <FormSelectModal />
      <NavBottom />
    </main>
  );
}
