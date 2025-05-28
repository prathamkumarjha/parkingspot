import Image from 'next/image';

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/empty-parking-lot.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className="bg-zinc-800 p-8 rounded-lg shadow-md text-center w-[360px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
