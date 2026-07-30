import { useSearchParams } from 'react-router-dom';

export default function RoomGlow() {
  const [searchParams] = useSearchParams();
  const session = searchParams.get('session');

  const src = session
    ? `https://roomglow-tau.vercel.app/new-design?session=${session}`
    : 'https://roomglow-tau.vercel.app';

  return (
    <iframe
      src={src}
      title="RoomGlow - עיצוב חדרים עם AI"
      className="w-full border-0"
      style={{ height: 'calc(100vh - 64px)' }}
      allow="camera; microphone"
    />
  );
}
