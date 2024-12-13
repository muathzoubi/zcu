import Link from "next/link"
import Image from "next/image"

export function Navbar(props:{cart:any}) {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8 space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-gray-900">الرئيسية</Link>
          </div>
          
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/big-logo.png"
              alt="KUPCO Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-4 space-x-reverse">
{props.cart}          </div>
        </div>
      </div>
    </nav>
  )
}
