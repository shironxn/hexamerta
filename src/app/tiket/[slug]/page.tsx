export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="space-y-3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <button className="btn btn-outline w-full">Download</button>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Pementasan Drama Musikal Seni Budaya
          </h1>
          <div className="flex gap-3">
            <div>
              <p>Nama lengkap</p>
              <p className="p-3 bg-base-200">shironxn</p>
            </div>
            <div>
              <p>Tanggal</p>
              <p className="p-3 bg-base-200">21 MEI 2024</p>
            </div>
          </div>
          <div>
            <p>Lokasi acara</p>
            <p className="p-3 bg-base-200">Bunker X6</p>
          </div>
        </div>
      </div>
    </div>
  );
}
