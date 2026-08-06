import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const conciergeItems = [
    "Transportación Privada",
    "Personal Concierge",
    "Private Chef",
    "Tours en Yate",
  ];

  const stayItems = [
    "Beach Access",
    "Wellness Rituals",
    "Private Boat Charters",
    "Airport Transfers",
    "All-Inclusive Option",
    "Excursiones Locales",
  ];

  const mapPhoto = "/media/figma-map.png";

  return (
    <div className="w-full space-y-24">
      <div className="mx-auto w-full max-w-[1180px] space-y-24 pb-24 pt-2">
      {/* Hero — Figma node 6038:2393 (mobile, 390w default) */}
      <div className="relative flex h-[780px] w-full items-start justify-center overflow-hidden rounded-2xl lg:h-[900px]">
        <Image
          src="/media/figma/hero-mobile.jpg"
          alt="Coco B Isla villa terrace among palm trees at golden hour, Isla Mujeres"
          fill
          priority
          sizes="100vw"
          className="object-cover lg:hidden"
        />
        <Image
          src="/media/figma/hero-desktop.jpg"
          alt="Coco B Isla villa terrace among palm trees at golden hour, Isla Mujeres"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover lg:block"
        />
        <div className="relative z-10 flex flex-col items-center px-6 pt-[329px] text-center text-white lg:pt-[380px]">
          <h1 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] lg:text-[30.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            Coco B Isla
          </h1>
          <p className="mt-[31px] text-[16.4px] font-light uppercase leading-[16.87px] tracking-[1.863px] lg:mt-[34px] lg:text-[18.1px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            Isla Mujeres
          </p>
          <p className="text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] lg:text-[18.7px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            Mexico
          </p>
        </div>
      </div>

      {/* Coco B Isla intro — Figma 6038:2410 (mobile) / 6020:8465 (desktop) */}
      <div className="flex flex-col items-center gap-8 text-center lg:gap-[34px]">
        <div className="order-1">
          <h2 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            Coco B Isla
          </h2>
          <p className="mt-[31px] text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:mt-[34px] lg:text-[17.7px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            <span className="lg:hidden">
              Luxury Villas &nbsp;&nbsp; Boutique Hotels
              <br />
              Destination Retreats
            </span>
            <span className="hidden lg:inline">Luxury Villas &nbsp;&nbsp; Boutique Hotels &nbsp;&nbsp; Destination Retreats</span>
          </p>
        </div>

        <div className="order-2 flex flex-wrap items-stretch justify-center gap-4 lg:order-4 lg:gap-6">
          <Link
            href="/solicitud"
            className="flex items-center justify-center border border-black bg-[#f5f5f5] px-9 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:px-6 lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]"
          >
            <span className="lg:hidden">
              Private
              <br />
              Villa
              <br />
              Inquiry
            </span>
            <span className="hidden lg:inline">Private Villa Inquiry</span>
          </Link>
          <Link
            href="/solicitud"
            className="flex items-center justify-center border border-black bg-[#f5f5f5] px-6 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]"
          >
            <span className="lg:hidden">
              Hotel
              <br />
              Reservations
            </span>
            <span className="hidden lg:inline">Hotel Reservations</span>
          </Link>
          <Link
            href="/solicitud"
            className="hidden items-center justify-center border border-black bg-[#f5f5f5] px-6 py-[18px] text-center text-[11.9px] font-medium uppercase leading-none tracking-[2.86px] text-black transition-colors hover:bg-white lg:flex"
          >
            Retreat Host Inquiry
          </Link>
        </div>

        <hr className="order-3 w-full border-t border-primary" />

        <p className="order-5 max-w-md text-[16.9px] font-light leading-[33.56px] text-muted lg:order-2 lg:max-w-3xl lg:text-[19.8px] lg:leading-[40.65px]">
          Set on the shores of Isla Mujeres, in one of Mexico and the Caribbean&rsquo;s most idyllic settings.
        </p>
        <p className="order-6 max-w-md text-[16.9px] font-light leading-[33.56px] text-muted lg:order-3 lg:max-w-3xl lg:text-[20.2px] lg:leading-[40.65px]">
          A collection of luxury villas, retreat center, &amp; pop-up boutique hotel
        </p>

        <hr className="order-7 w-full border-t border-primary lg:order-5" />

        <div className="order-8 space-y-4 lg:order-6">
          <h3 className="text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:text-[18.7px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            We Live For:
          </h3>
          <p className="text-[13.5px] font-light leading-[27.2px] text-muted lg:text-[14.3px] lg:leading-[28.9px]">
            Friends &amp; Family
            <br />
            Wellness &amp; Team Retreats
            <br />
            Weddings &amp; Celebrations
          </p>
          <p className="text-base font-light leading-[27.2px] text-muted lg:text-[17px] lg:leading-[28.9px]">We Bring::</p>
          <p className="text-[13.5px] font-light leading-[27.2px] text-muted lg:text-[14.3px] lg:leading-[28.9px]">
            Exceptional Service for Exceptional Experiences
          </p>
        </div>

        <Link
          href="/solicitud"
          className="order-9 flex items-center justify-center border border-black bg-[#f5f5f5] px-9 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:hidden"
        >
          Retreat
          <br />
          Host
          <br />
          Inquiry
        </Link>
      </div>

      {/* Luxury Villa Collection — Figma node 6038:2455 */}
      <div className="flex flex-col items-center gap-8 text-center">
        <div>
          <h2 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[29.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            <span className="lg:hidden">
              Luxury Villa
              <br />
              Collection
            </span>
            <span className="hidden lg:inline">Luxury Villa Collection</span>
          </h2>
          <p className="mt-[31px] text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:mt-[34px] lg:text-[18.1px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            <span className="lg:hidden">
              Coco &nbsp;&nbsp; Lola &nbsp;&nbsp; Encantada
              <br />
              Cielo
            </span>
            <span className="hidden lg:inline">Coco &nbsp;&nbsp; Lola &nbsp;&nbsp; Encantada &nbsp;&nbsp; Cielo</span>
          </p>
        </div>

        <hr className="w-full border-t border-primary" />

        <div className="flex flex-wrap items-stretch justify-center gap-4 lg:gap-6">
          <Link
            href="/villas"
            className="flex items-center justify-center border border-black bg-[#f5f5f5] px-7 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:px-6 lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]"
          >
            <span className="lg:hidden">
              Explore
              <br />
              Villas
            </span>
            <span className="hidden lg:inline">Explore Villas</span>
          </Link>
          <Link
            href="/solicitud"
            className="flex items-center justify-center border border-black bg-[#f5f5f5] px-7 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:px-6 lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]"
          >
            <span className="lg:hidden">
              Inquire
              <br />
              Villas
            </span>
            <span className="hidden lg:inline">Inquire Villas</span>
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="relative aspect-[343/234] w-full overflow-hidden lg:aspect-[670/429]">
            <Image
              src="/media/figma/villa-encantada-1.jpg"
              alt="Villa Encantada exterior with private pool, Isla Mujeres"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[343/269] w-full overflow-hidden lg:aspect-[670/429]">
            <Image
              src="/media/figma/casa-coco-1.jpg"
              alt="Casa Coco palapa terrace and pool"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl space-y-4">
          <h3 className="text-[16.8px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:text-[18.4px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            Our Villa Collection
          </h3>
          <p className="mx-auto max-w-md text-[13.5px] font-light leading-[27.2px] text-muted lg:max-w-none lg:text-[14.3px] lg:leading-[28.9px]">
            Our exclusive collection includes four exquisite villas: Lola, Encantada, Coco, and Cielo.
          </p>
          <p className="mx-auto max-w-md text-[13.4px] font-light leading-[27.2px] text-muted lg:max-w-none lg:text-[13.9px] lg:leading-[28.9px]">
            Each villa offers a unique blend of indoor and outdoor living spaces, perfect for families, friends,
            corporate retreats, weddings, or wellness getaways. With direct access to calm waters and breathtaking
            sunsets over the Mexican Caribbean, Coco B Isla Villas promises an exceptional and unforgettable
            experience.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="relative aspect-[343/234] w-full overflow-hidden lg:aspect-[670/429]">
            <Image
              src="/media/figma/villa-encantada-2.jpg"
              alt="Isla Mujeres Villa Encantada facade with palm trees"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[343/234] w-full overflow-hidden lg:aspect-[670/429]">
            <Image
              src="/media/figma/img-1029.jpg"
              alt="Villa infinity pool overlooking the Caribbean Sea"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Retreats — Figma 6038:2509 (mobile) / 6020:8561 (desktop) */}
      <div className="flex flex-col items-center gap-8 text-center lg:gap-[34px]">
        <div className="order-10">
          <h2 className="text-[23.3px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.4px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            Retreats
          </h2>
          <p className="mt-[31px] text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:mt-[34px] lg:text-[17.8px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            <span className="lg:hidden">
              Weddings &nbsp;&nbsp; Yoga &nbsp;&nbsp; Wellness
              <br />
              Culinary &nbsp;&nbsp; Fitness &nbsp;&nbsp; Corporate
            </span>
            <span className="hidden lg:inline">
              Weddings &nbsp;&nbsp; Yoga &nbsp;&nbsp; Wellness &nbsp;&nbsp; Culinary &nbsp;&nbsp; Fitness &nbsp;&nbsp; Corporate
            </span>
          </p>
        </div>

        <hr className="order-20 w-full border-t border-primary" />

        {/* Buttons: stacked/split on mobile, one row on desktop */}
        <Link
          href="/retiros"
          className="order-30 flex items-center justify-center border border-black bg-[#f5f5f5] px-6 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:hidden"
        >
          Inquire Retreat
        </Link>
        <div className="order-30 hidden flex-wrap items-stretch justify-center gap-6 lg:flex">
          <Link
            href="/retiros"
            className="flex items-center justify-center border border-black bg-[#f5f5f5] px-6 py-[18px] text-center text-[11.9px] font-medium uppercase leading-none tracking-[2.86px] text-black transition-colors hover:bg-white"
          >
            Inquire Retreat
          </Link>
          <Link
            href="/retiros"
            className="flex items-center justify-center border border-black bg-[#f5f5f5] px-6 py-[18px] text-center text-[11.9px] font-medium uppercase leading-none tracking-[2.86px] text-black transition-colors hover:bg-white"
          >
            Retreat Calendar
          </Link>
        </div>

        {/* Videos: after the intro on mobile, at the very end on desktop */}
        {[
          { src: "/media/figma/retreat-video-1.jpg", alt: "Yoga retreat session preview", order: "order-[40]" },
          { src: "/media/figma/retreat-video-2.jpg", alt: "Ocean paddleboard retreat preview", order: "order-[41]" },
          { src: "/media/figma/retreat-video-3.jpg", alt: "Culinary retreat gathering preview", order: "order-[42]" },
        ].map((video) => (
          <div key={video.src} className={`relative ${video.order} aspect-[343/193] w-full overflow-hidden lg:hidden`}>
            <Image src={video.src} alt={video.alt} fill sizes="100vw" className="object-cover" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-black/90">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="white" aria-hidden="true">
                  <path d="M0 0L16 9L0 18V0Z" />
                </svg>
              </span>
            </span>
          </div>
        ))}
        <div className="order-[90] hidden w-full grid-cols-3 gap-4 lg:grid">
          {[
            { src: "/media/figma/retreat-video-1.jpg", alt: "Yoga retreat session preview" },
            { src: "/media/figma/retreat-video-2.jpg", alt: "Ocean paddleboard retreat preview" },
            { src: "/media/figma/retreat-video-3.jpg", alt: "Culinary retreat gathering preview" },
          ].map((video) => (
            <div key={video.src} className="relative aspect-[443/249] w-full overflow-hidden">
              <Image src={video.src} alt={video.alt} fill sizes="33vw" className="object-cover" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-black/90">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="white" aria-hidden="true">
                    <path d="M0 0L16 9L0 18V0Z" />
                  </svg>
                </span>
              </span>
            </div>
          ))}
        </div>

        <h3 className="order-[50] text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:text-[18.1px] lg:leading-[18.65px] lg:tracking-[2.06px]">
          <span className="lg:hidden">
            Full Service Planning and
            <br />
            Support for Your Destination
            <br />
            Retreat
          </span>
          <span className="hidden lg:inline">Full Service Planning and Support for Your Destination Retreat</span>
        </h3>

        {/* Images: couple-beach solo + [lola, img9359] pair on mobile; [couple-beach, lola] + [dining, img9359] pairs on desktop */}
        <div className="order-[80] relative aspect-[343/199] w-full overflow-hidden lg:hidden">
          <Image
            src="/media/figma/retreat-couple-beach.jpg"
            alt="Couple walking the beach at sunset during a Coco B retreat"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="order-[90] grid w-full grid-cols-2 gap-3 lg:hidden">
          <div className="relative aspect-[166/234] overflow-hidden">
            <Image
              src="/media/figma/retreat-lola-yoga.jpg"
              alt="Yoga session at Villa Lola"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[166/234] overflow-hidden">
            <Image
              src="/media/figma/retreat-img9359.jpg"
              alt="Retreat group gathering by the water"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="order-[40] hidden w-full grid-cols-2 gap-4 lg:grid">
          <div className="relative aspect-[670/429] overflow-hidden">
            <Image
              src="/media/figma/retreat-couple-beach.jpg"
              alt="Couple walking the beach at sunset during a Coco B retreat"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[670/429] overflow-hidden">
            <Image
              src="/media/figma/retreat-lola-yoga.jpg"
              alt="Yoga session at Villa Lola"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="order-[70] hidden w-full grid-cols-2 gap-4 lg:grid">
          <div className="relative aspect-[670/429] overflow-hidden">
            <Image
              src="/media/figma/retreat-dining.jpg"
              alt="Outdoor dining set up for a Coco B yoga teacher training"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[670/429] overflow-hidden">
            <Image
              src="/media/figma/retreat-img9359.jpg"
              alt="Retreat group gathering by the water"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="order-[100] relative aspect-[343/199] w-full overflow-hidden lg:hidden">
          <Image
            src="/media/figma/retreat-dining.jpg"
            alt="Outdoor dining set up for a Coco B yoga teacher training"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Press quote + Jill testimonial: stacked on mobile, side by side on desktop */}
        <div className="contents lg:grid lg:order-[60] lg:grid-cols-2 lg:items-start lg:gap-16 lg:text-left">
          <p className="order-[60] max-w-md text-[17.5px] italic font-light leading-[33.56px] text-muted lg:mx-0 lg:max-w-none lg:text-[21.1px] lg:leading-[40.65px]">
            &ldquo;Best Island Retreat Center in the Americas&rdquo;
            <br />
            <span className="text-[15.9px] not-italic lg:text-[17px]">Luxe Life Magazine</span>
          </p>

          <figure className="order-[70] max-w-md space-y-3 lg:max-w-none">
            <blockquote className="text-[12.5px] italic font-light leading-[27.2px] text-muted lg:text-[13.3px] lg:leading-[28.9px]">
              Incredible Memories Made! I have been leading yoga retreats for almost 15 years and this was by far one
              of the very best EVER. Casa Coco is stunning. The dedicated staff were professional, attentive to the
              many details and moving parts, they were so much fun + kind, more than accommodating and after five
              days with our group of fifteen guests, they became our friends. Honestly, I was just blown away by
              every aspect of this retreat. I&rsquo;m already looking for the right time to head back down for round
              two. THANK YOU ALL FOR EVERYTHING.
            </blockquote>
            <figcaption className="text-right text-[13.3px] font-light leading-[27.2px] text-muted lg:text-[14.1px] lg:leading-[28.9px]">
              — Jill Knouse - Trip Advisor
            </figcaption>
          </figure>
        </div>

        {/* Paul Gould + Alice R testimonials: stacked on mobile, side by side on desktop */}
        <div className="contents lg:grid lg:order-[80] lg:grid-cols-2 lg:items-start lg:gap-16 lg:text-left">
          <figure className="order-[110] max-w-md space-y-3 lg:max-w-none">
            <blockquote className="text-[12.6px] italic font-light leading-[27.2px] text-muted lg:text-[13.1px] lg:leading-[28.9px]">
              &ldquo;What a beautiful oasis with warm, wonderful staff, stunning rooms and a yoga studio with
              magnificent views from every angle makes you feel as if you are part of nature. We look forward to
              returning next year and so appreciate the care and time spent with owner Jeff and our host,
              Lisa.&rdquo;
            </blockquote>
            <figcaption className="text-right text-[13.4px] font-light leading-[27.2px] text-muted lg:text-[14.2px] lg:leading-[28.9px]">
              — Paul Gould and Jennifer Fox NamaStay Yoga
            </figcaption>
          </figure>

          <figure className="order-[120] max-w-md space-y-3 lg:max-w-none">
            <blockquote className="text-[12.4px] italic font-light leading-[27.2px] text-muted lg:text-[13.1px] lg:leading-[28.9px]">
              &ldquo;The energy here is so incredible that it will heal you completely and energize you, and maybe
              even change your life.&rdquo;
            </blockquote>
            <figcaption className="text-right text-[14px] font-light leading-[27.2px] text-muted lg:text-[14.7px] lg:leading-[28.9px]">
              — Alice R. Mexico City
            </figcaption>
          </figure>
        </div>

        <hr className="order-[130] w-full border-t border-primary lg:hidden" />

        <Link
          href="/retiros"
          className="order-[140] flex items-center justify-center border border-black bg-[#f5f5f5] px-6 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:hidden"
        >
          Retreat Calendar
        </Link>
      </div>

      {/* Oceanfront Boutique (Pop-Up) Hotels — Figma 6038:2670 (mobile) / 6020:8720 (desktop) */}
      <div className="flex flex-col items-center gap-8 text-center lg:gap-[34px]">
        <div>
          <h2 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.4px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            <span className="lg:hidden">
              Oceanfront Boutique
              <br />
              (Pop-Up) Hotels
            </span>
            <span className="hidden lg:inline">Oceanfront Boutique (Pop-Up) Hotels</span>
          </h2>
          <p className="mt-[31px] text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:mt-[34px] lg:text-[18.7px] lg:leading-[18.65px] lg:tracking-[2.06px]">
            Coco &amp; Lola
          </p>
        </div>

        <hr className="w-full border-t border-primary" />

        <p className="max-w-md text-[13.5px] font-light leading-[27.2px] text-muted lg:max-w-2xl lg:text-[14.3px] lg:leading-[28.9px]">
          Coco B Isla is a Pop-Up Hotel Serving Guests Looking for Last Minute Stays.
        </p>
        <p className="max-w-md text-[13.5px] font-light leading-[27.2px] text-muted lg:max-w-2xl lg:text-[14.3px] lg:leading-[28.9px]">
          (Book stays inside 30 days from arrival or contact us{" "}
          <Link href="/solicitud" className="font-bold text-accent">
            HERE
          </Link>{" "}
          to be on our call list)
        </p>

        <div className="flex flex-wrap items-stretch justify-center gap-4 lg:gap-6">
          <Link
            href="/villas"
            className="order-1 flex items-center justify-center border border-black bg-[#f5f5f5] px-7 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:order-2 lg:px-6 lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]"
          >
            <span className="lg:hidden">
              Book Hotel
              <br />
              Coco
            </span>
            <span className="hidden lg:inline">Book Hotel Coco</span>
          </Link>
          <Link
            href="/villas"
            className="order-2 flex items-center justify-center border border-black bg-[#f5f5f5] px-7 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:order-3 lg:px-6 lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]"
          >
            <span className="lg:hidden">
              Book Hotel
              <br />
              Lola
            </span>
            <span className="hidden lg:inline">Book Hotel Lola</span>
          </Link>
          <Link
            href="/villas"
            className="order-3 flex items-center justify-center border border-black bg-[#f5f5f5] px-7 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:order-1 lg:px-6 lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]"
          >
            Explore Hotels
          </Link>
        </div>
      </div>

      {/* Gallery + press awards — Figma 6038:2707 (mobile) / 6020:8755 (desktop) */}
      <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
        <h2 className="order-1 text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:order-[45] lg:text-[30.1px] lg:leading-[29.84px] lg:tracking-[3.391px]">
          <span className="lg:hidden">
            &middot; Luxury Villas
            <br />
            Boutique Hotels &middot;
            <br />
            Destination Retreats &middot;
          </span>
          <span className="hidden lg:inline">&middot; Luxury Villas &middot; Boutique Hotels &middot; Destination Retreats &middot;</span>
        </h2>

        {/* 8 gallery photos: stacked/paired on mobile, two rows of 4 on desktop */}
        <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <div className="relative order-2 col-span-2 aspect-[343/164] overflow-hidden lg:order-[80] lg:col-span-1 lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-dea277ac.jpg" alt="Villa interior detail" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
          </div>
          <div className="relative order-3 aspect-[166/199] overflow-hidden lg:order-[50] lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-encantada-83.jpg" alt="Villa Encantada poolside" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative order-4 aspect-[166/199] overflow-hidden lg:order-[70] lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-cc-pool-sunset.jpg" alt="Casa Coco pool at sunset" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative order-5 col-span-2 aspect-[343/164] overflow-hidden lg:order-[60] lg:col-span-1 lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-encantada-122.jpg" alt="Villa Encantada exterior" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
          </div>
          <div className="relative order-6 col-span-2 aspect-[343/164] overflow-hidden lg:order-[10] lg:col-span-1 lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-encantada-81.jpg" alt="Villa Encantada aerial view" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
          </div>
          <div className="relative order-7 aspect-[166/199] overflow-hidden lg:order-[20] lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-encantada-64.jpg" alt="Villa Encantada bedroom" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative order-8 aspect-[166/199] overflow-hidden lg:order-[40] lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-encantada-54.jpg" alt="Villa Encantada terrace" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative order-9 col-span-2 aspect-[343/164] overflow-hidden lg:order-[30] lg:col-span-1 lg:aspect-[329/189]">
            <Image src="/media/figma/gallery-img1519.jpg" alt="Villa dining setup" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
          </div>
        </div>

        {/* Press logos: stacked on mobile, one row on desktop */}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          <Image
            src="/media/figma/award-boutique-hotel.jpg"
            alt="2016 World Boutique Hotel Awards winner medallion"
            width={166}
            height={164}
            className="h-auto w-[166px] lg:w-[159px]"
          />
          <Image src="/media/figma/logo-tripadvisor.png" alt="Tripadvisor" width={166} height={199} className="h-auto w-[140px] lg:w-[180px]" />
          <Image
            src="/media/figma/logo-travelmyth.png"
            alt="TravelMyth — Featured in the Honeymoon Hotels Collection, Casa Coco by Coco B Isla"
            width={255}
            height={234}
            className="h-auto w-[200px] lg:w-[159px]"
          />
          <Image
            src="/media/figma/logo-conde-nast.png"
            alt="Cond&eacute; Nast Traveler"
            width={255}
            height={164}
            className="h-auto w-[200px] lg:w-[180px]"
          />
        </div>

        <p className="text-[12.6px] italic font-light leading-[27.2px] text-muted lg:max-w-md lg:text-[13.8px] lg:leading-[28.9px]">
          &ldquo;Best Newcomer Boutique Hotel in the Americas&rdquo;
        </p>

        <div className="flex flex-col gap-8 lg:w-full lg:flex-row lg:items-start lg:justify-center lg:gap-16">
          <div className="space-y-1 lg:order-2 lg:flex-1">
            <h3 className="text-[15.3px] italic font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:text-[16.5px] lg:leading-[18.65px] lg:tracking-[2.06px]">
              &ldquo;Best Island Retreat Center&rdquo; in
              <br />
              the Caribbean&rdquo; 2022
            </h3>
            <h4 className="text-[17.9px] font-light uppercase leading-[17.73px] tracking-[1.966px] text-foreground lg:text-[20.5px] lg:leading-[20.29px] lg:tracking-[2.25px]">
              LUXlife Magazine
            </h4>
          </div>

          <div className="space-y-1 lg:order-1 lg:flex-1">
            <h3 className="text-[15.2px] italic font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:text-[16.8px] lg:leading-[18.65px] lg:tracking-[2.06px]">
              &ldquo;Best Luxury Villa Collection&rdquo;
            </h3>
            <h3 className="text-[16.9px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground lg:text-[18.7px] lg:leading-[18.65px] lg:tracking-[2.06px]">
              Q Roo. Mexico 2023
            </h3>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface px-8 py-12">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Coco B Services</p>
          <h2 className="text-3xl font-medium tracking-[0.06em] text-foreground">FULL SERVICE PLANNING FOR YOUR RETREAT</h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {conciergeItems.map((item) => (
            <article key={item} className="rounded-xl border border-border bg-background px-5 py-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:border-primary hover:bg-primary/5">
              {item}
            </article>
          ))}
        </div>

        <div className="mt-10">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">COMPLEMENT YOUR STAY</p>
          <div className="grid grid-cols-6 gap-4">
            {stayItems.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border bg-background px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-foreground hover:border-border/60"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location + map */}
      <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_590px] lg:gap-10">
        <article className="flex flex-col items-center gap-6 border border-border bg-[#f5f5f5] px-8 py-10 text-center lg:items-start lg:justify-center lg:px-12 lg:py-12 lg:text-left">
          <h2 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.4px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            Isla Mujeres
          </h2>
          <p className="max-w-md text-[13.5px] font-light leading-[27.2px] text-muted lg:max-w-[520px] lg:text-[14.3px] lg:leading-[28.9px]">
            A short ferry ride from Canc&uacute;n, Coco B Isla sits on the calm western shore of Isla Mujeres.
            Private waterfront villas and curated local experiences, minutes from town.
          </p>
          <Link
            href="/solicitud"
            className="inline-flex items-center justify-center border border-black bg-[#f5f5f5] px-7 py-4 text-center text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] text-black transition-colors hover:bg-white lg:px-6 lg:py-[18px] lg:text-[11.9px] lg:tracking-[2.86px]"
          >
            Get in Touch
          </Link>
        </article>

        <div className="relative aspect-[343/234] w-full overflow-hidden border border-border lg:aspect-[590/429]">
          <Image src={mapPhoto} alt="Map of Isla Mujeres showing the Coco B Isla location" fill sizes="(min-width: 1024px) 590px, 100vw" className="object-cover" />
        </div>
      </section>
      </div>

      {/* Newsletter strip */}
      <section className="w-full bg-primary px-6 py-10 text-white lg:px-12 lg:py-11">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 className="text-center text-[18px] font-light uppercase leading-tight tracking-[1.86px] lg:max-w-2xl lg:text-left lg:text-[20px]">
            Sign up today for Coco B Isla&rsquo;s exclusive newsletter
          </h2>
          <form className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row lg:mx-0 lg:max-w-[460px]">
            <input
              type="email"
              required
              placeholder="Your email"
              aria-label="Email address"
              className="w-full border border-white/45 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/65 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap border border-white bg-white px-6 py-3 text-[11.9px] font-medium uppercase tracking-[2.86px] text-primary transition-colors hover:bg-transparent hover:text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer columns */}
      <footer className="w-full bg-[#0f1113] px-6 py-12 text-white lg:px-12 lg:py-14">
        <div className="grid grid-cols-1 gap-9 text-sm lg:grid-cols-4 lg:gap-8">
          <div className="space-y-3">
            <p className="text-[18px] font-medium uppercase tracking-[1.8px]">Coco B</p>
            <p className="max-w-xs text-white/65">Private villas and retreat planning in Isla Mujeres.</p>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[2.2px] text-white/45">Explore</p>
            <nav className="space-y-2 text-white/82">
              <Link href="/villas" className="block transition-colors hover:text-white">Villas</Link>
              <Link href="/retiros" className="block transition-colors hover:text-white">Retiros</Link>
              <Link href="/solicitud" className="block transition-colors hover:text-white">Solicitud</Link>
            </nav>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[2.2px] text-white/45">Contact</p>
            <div className="space-y-2 text-white/82">
              <p>
                <a href="mailto:hello@cocobisla.com" className="transition-colors hover:text-white">hello@cocobisla.com</a>
              </p>
              <p>Isla Mujeres, Mexico</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[2.2px] text-white/45">Follow</p>
            <nav className="space-y-2 text-white/82">
              <a href="#" className="block transition-colors hover:text-white">Instagram</a>
              <a href="#" className="block transition-colors hover:text-white">Google Maps</a>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/45 lg:mt-10 lg:pt-7">
          <p>&copy; 2026 Coco B Isla + Coco B Wellness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
