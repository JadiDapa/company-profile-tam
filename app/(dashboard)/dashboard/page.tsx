export default function DashboardGalleryPage() {
  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">Dashboard</h1>
          <p className="hidden lg:inline"></p>
        </div>
      </div>
    </section>
  );
}
