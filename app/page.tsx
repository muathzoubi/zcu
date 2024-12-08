'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Facebook, Instagram, Twitter } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

export default function ArabicLandingPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div dir="rtl" className="flex flex-col min-h-screen">
      <header className="bg-[#002B5C] text-white fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="شعار كوبكو"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold">كوبكو</span>
          </div>
          <nav className="hidden md:flex space-x-4 space-x-reverse">
            <Link href="#products" className="hover:text-[#FF9E1B] transition-colors">المنتجات</Link>
            <Link href="#about" className="hover:text-[#FF9E1B] transition-colors">عن الشركة</Link>
            <Link href="#contact" className="hover:text-[#FF9E1B] transition-colors">اتصل بنا</Link>
          </nav>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#002B5C]">
            English
          </Button>
        </div>
      </header>

      <main className="flex-grow pt-16">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {[
              { title: "دواجن طازجة، توصيل يومي", description: "أجود منتجات الدواجن من كوبكو", image: "/placeholder.svg?height=600&width=1200&text=صورة+1" },
              { title: "جودة عالية منذ 1974", description: "ضمان الأمن الغذائي والتميز", image: "/placeholder.svg?height=600&width=1200&text=صورة+2" },
              { title: "منتجات متنوعة لتلبية احتياجاتك", description: "من الدجاج الكامل إلى القطع المختارة", image: "/placeholder.svg?height=600&width=1200&text=صورة+3" },
            ].map((slide, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative h-[calc(100vh-4rem)]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                    <Button className="bg-[#FF9E1B] hover:bg-[#e88c0d] text-white text-lg px-8 py-3">
                      استكشف منتجاتنا
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-[#002B5C] hover:bg-[#FF9E1B] hover:text-white"
          >
            &#x276E;
          </Button>
          <Button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-[#002B5C] hover:bg-[#FF9E1B] hover:text-white"
          >
            &#x276F;
          </Button>
        </div>

        <section id="products" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#002B5C] mb-12">منتجاتنا الممتازة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "دجاج كامل طازج", description: "دجاج كامل طازج من المزرعة ومصادر محلية" },
                { name: "صدور الدجاج", description: "صدور دجاج قليلة الدهون وغنية بالبروتين" },
                { name: "قطع الدجاج", description: "تشكيلة متنوعة من قطع الدجاج لتلبية جميع احتياجاتك الطهوية" },
              ].map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Image
                      src={`/placeholder.svg?height=200&width=300&text=${product.name}`}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{product.name}</CardTitle>
                    <p className="text-gray-600">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#F8F9FA] py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=منشأة+كوبكو"
                  alt="منشأة كوبكو"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-[#002B5C] mb-6">عن كوبكو</h2>
                <p className="text-gray-600 mb-6">
                  الشركة الكويتية المتحدة للدواجن (كوبكو) هي رائدة في صناعة الدواجن منذ عام 1974. نحن ملتزمون بتقديم منتجات دواجن عالية الجودة مع ضمان الأمن الغذائي للكويت ومنطقة الخليج.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "مرافق إنتاج حديثة",
                    "إجراءات صارمة لمراقبة الجودة",
                    "التزام بالممارسات المستدامة",
                    "شبكة توزيع واسعة",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronLeft className="text-[#FF9E1B] ml-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-[#002B5C] hover:bg-[#001F43] text-white">
                  تعرف علينا أكثر
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#002B5C] mb-6">تواصل معنا</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              هل لديك أسئلة حول منتجاتنا أو خدماتنا؟ نحن هنا للمساعدة!
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button className="bg-[#FF9E1B] hover:bg-[#e88c0d] text-white">
                اتصل بنا
              </Button>
              <Button variant="outline" className="border-[#002B5C] text-[#002B5C] hover:bg-[#002B5C] hover:text-white">
                ابحث عن موزع
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#002B5C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">كوبكو</h3>
              <p className="text-sm">نقدم منتجات دواجن عالية الجودة منذ عام 1974</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-[#FF9E1B] transition-colors">الرئيسية</Link></li>
                <li><Link href="#products" className="hover:text-[#FF9E1B] transition-colors">المنتجات</Link></li>
                <li><Link href="#about" className="hover:text-[#FF9E1B] transition-colors">عن الشركة</Link></li>
                <li><Link href="#contact" className="hover:text-[#FF9E1B] transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
              <p className="text-sm">مدينة الكويت، الكويت</p>
              <p className="text-sm">هاتف: 5678 1234 965+</p>
              <p className="text-sm">البريد الإلكتروني: info@kupco.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
              <div className="flex space-x-4 space-x-reverse">
                <Link href="#" className="hover:text-[#FF9E1B] transition-colors">
                  <Facebook />
                  <span className="sr-only">فيسبوك</span>
                </Link>
                <Link href="#" className="hover:text-[#FF9E1B] transition-colors">
                  <Twitter />
                  <span className="sr-only">تويتر</span>
                </Link>
                <Link href="#" className="hover:text-[#FF9E1B] transition-colors">
                  <Instagram />
                  <span className="sr-only">انستغرام</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">© 2024 الشركة الكويتية المتحدة للدواجن. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

