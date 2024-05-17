export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Pementasan Drama Musikal Seni Budaya
          </h1>
          <label htmlFor=""></label>
          <p className="py-3 bg-base-300">shironxn</p>
          <p className="py-3 bg-base-300">21 MEI 2024</p>
          <p className="py-3 bg-base-300">Bunker X6</p>
        </div>
      </div>
    </div>
  );
}
