import Image from "next/image";
import Marquee from "react-fast-marquee";

const partners = [
  {
    name: "Hikvision",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Hikvision_logo.svg/1280px-Hikvision_logo.svg.png",
  },
  {
    name: "Alcatel-Lucent Enterprise",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Alcatel_Lucent_Enterprise_Logo.svg",
  },
  {
    name: "APC by Schneider Electric",
    logo: "https://download.logo.wine/logo/APC_by_Schneider_Electric/APC_by_Schneider_Electric-Logo.wine.png",
  },
  {
    name: "Pro-VAD",
    logo: "https://pro-vad.com/web/image/6650-f9cdeac0/8026c0fe-28ab-4e13-9f9f-fb00191e1c63.png",
  },
  {
    name: "Ruijie",
    logo: "https://ipa.co.id/wp-content/uploads/2025/05/ruijie.png",
  },
  {
    name: "Huawei",
    logo: "https://pngfile.net/files/preview/1280x418/4381749758593e7nnvybzytvribyqj5jaq2bqeiscoi1planhwqqjhhpqjfupvejxg62fsyxyzpucxg4v9ypynls4kjrsqaeafmemfqs3firnjlhu.png",
  },
  {
    name: "Palo Alto Networks",
    logo: "https://www.paloaltonetworks.com/content/dam/pan/en_US/images/logos/brand/primary-company-logo/Parent-logo.png?imwidth=480",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="bg-primary/5 relative py-4">
      <p className="text-muted-foreground text-center font-medium">
        We Trusted By <strong>200+</strong> Companies
      </p>
      <div className="mt-6 flex w-full items-center justify-between">
        <Marquee speed={45} pauseOnHover pauseOnClick gradient={false}>
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative mx-6 flex h-6 w-24 items-center justify-center p-4 lg:mx-12 lg:h-10 lg:w-32"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain object-center grayscale-100 transition hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
