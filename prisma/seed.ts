import { MediaTable, MediaType, UserRole } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

const activities = [
  {
    title: "Pemasangan Jaringan WiFi Sekolah",
    category: "Instalasi",
    slug: "pemasangan-jaringan-wifi-sekolah",
    content:
      "<p>Kegiatan pemasangan jaringan WiFi untuk mendukung proses belajar mengajar di lingkungan sekolah mitra.</p>",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Pelatihan Perawatan Perangkat IT",
    category: "Pelatihan",
    slug: "pelatihan-perawatan-perangkat-it",
    content:
      "<p>Pelatihan dasar perawatan dan troubleshooting perangkat IT bagi staf teknis mitra kerja.</p>",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Maintenance Server Bulanan",
    category: "Maintenance",
    slug: "maintenance-server-bulanan",
    content:
      "<p>Kegiatan pemeliharaan rutin server dan infrastruktur jaringan untuk menjaga performa dan keamanan sistem.</p>",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Kunjungan Survei Lokasi Klien",
    category: "Survei",
    slug: "kunjungan-survei-lokasi-klien",
    content:
      "<p>Survei lokasi untuk perencanaan instalasi jaringan dan kebutuhan infrastruktur IT klien baru.</p>",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Instalasi CCTV Area Perkantoran",
    category: "Instalasi",
    slug: "instalasi-cctv-area-perkantoran",
    content:
      "<p>Pemasangan dan konfigurasi sistem CCTV untuk meningkatkan keamanan area perkantoran klien.</p>",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1170&auto=format&fit=crop",
  },
];

const galleries = [
  {
    title: "Instalasi Jaringan Kantor Pusat",
    slug: "instalasi-jaringan-kantor-pusat",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Pelatihan Tim Teknisi",
    slug: "pelatihan-tim-teknisi",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Kunjungan Klien Korporat",
    slug: "kunjungan-klien-korporat",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Pemasangan CCTV Area Gudang",
    slug: "pemasangan-cctv-area-gudang",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Perawatan Server Data Center",
    slug: "perawatan-server-data-center",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Survei Lokasi Proyek Baru",
    slug: "survei-lokasi-proyek-baru",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop",
  },
];

async function ensureImage(entityId: number, mediaTable: MediaTable, url: string) {
  const existing = await prisma.media.findFirst({
    where: { entityId, mediaTable, mediaType: MediaType.IMAGE },
  });

  if (existing) return;

  await prisma.media.create({
    data: {
      entityId,
      mediaTable,
      mediaType: MediaType.IMAGE,
      url,
    },
  });
}

async function main() {
  await prisma.user.upsert({
    where: { username: 'administrator' },
    update: {},
    create: {
        fullName : 'Administrator',
        username: 'administrator',
        role: UserRole.ADMIN
    },
  })

  console.log("Admin user created");

  for (const { image, ...activity } of activities) {
    const created = await prisma.activity.upsert({
      where: { slug: activity.slug },
      update: {},
      create: activity,
    });

    await ensureImage(created.id, MediaTable.ACTIVITY, image);
  }

  console.log(`${activities.length} activities seeded`);

  for (const { image, ...gallery } of galleries) {
    const created = await prisma.gallery.upsert({
      where: { slug: gallery.slug },
      update: {},
      create: gallery,
    });

    await ensureImage(created.id, MediaTable.GALLERY, image);
  }

  console.log(`${galleries.length} galleries seeded`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })