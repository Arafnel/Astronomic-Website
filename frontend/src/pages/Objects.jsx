import { useState, useEffect } from 'react';
import ObjectCard from '../components/UI/ObjectCard.jsx';
import { objectsAPI } from '../api/objects.jsx';

const Objects = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadObjects = async () => {
      try {
        const response = await objectsAPI.getObjects();
        setObjects(response.data || []);
      } catch (err) {
        console.error('Ошибка загрузки объектов:', err);
        setError('Не удалось загрузить объекты. Попробуйте обновить страницу позже.');
      } finally {
        setLoading(false);
      }
    };

    loadObjects();
  }, []);

  if (loading) return <div className="py-10 text-center text-gold-100">⏳ Загрузка объектов...</div>;
  if (error) return <div className="py-10 text-center text-red-400">{error}</div>;

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16">
      <section className="mb-12 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">
          Catalog
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[0.18em] text-gold-100">
          Featured Astronomic Objects
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-gold-100/75">
          Подборка ярких туманностей, звезд и галактик из вашего астрономического атласа.
        </p>
      </section>

      {objects.length === 0 ? (
        <div className="mx-auto rounded-2xl border border-gold-500/40 bg-black/40 px-6 py-10 text-center text-sm text-gold-100/75">
          <p>База данных пуста. Добавьте объекты через API.</p>
          <p className="mt-2 text-[0.78rem] text-gold-200/60">
            POST http://localhost:8000/objects/
          </p>
        </div>
      ) : (
        <section className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-6xl xl:grid-cols-4">
          {objects.map((obj) => (
            <div key={obj.id} className="h-full">
              <ObjectCard object={obj} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Objects;