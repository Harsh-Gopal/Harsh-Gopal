import Link from "next/link";
import { Terminal, Gamepad2, Blocks, Bird } from "lucide-react";

export default function ArcadeHub() {
  const games = [
    {
      id: "01",
      title: "TIC-TAC-TOE",
      desc: "Strategic mode",
      icon: Gamepad2,
      path: "/games/tic-tac-toe",
    },
    {
      id: "02",
      title: "TETRIS",
      desc: "Block protocol",
      icon: Blocks,
      path: "/games/tetris",
    },
    {
      id: "03",
      title: "DINO RUN",
      desc: "Endless sequence",
      icon: Bird,
      path: "/games/dino",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-3xl border border-neutral-800 bg-neutral-900/50 p-8 rounded shadow-2xl relative overflow-hidden">
        {/* Decorative scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20"></div>
        
        <header className="mb-12 border-b border-neutral-800 pb-6 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="text-accent w-6 h-6" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-white">
              HARSH GOPAL <span className="text-neutral-500 font-normal">{"// ARCADE"}</span>
            </h1>
          </div>
          <p className="text-neutral-400 text-sm">SELECT SEQUENCE TO INITIALIZE</p>
        </header>

        <div className="space-y-4 relative z-10">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={game.path}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-neutral-800 hover:border-accent bg-neutral-900/80 hover:bg-neutral-800 transition-all cursor-pointer rounded"
            >
              <div className="flex items-center gap-6 mb-4 sm:mb-0">
                <span className="text-neutral-600 font-bold text-xl w-8">[{game.id}]</span>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-neutral-800 group-hover:bg-accent/20 rounded text-neutral-400 group-hover:text-accent transition-colors">
                    <game.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-neutral-200 group-hover:text-white tracking-wider">{game.title}</h2>
                    <p className="text-neutral-500 text-sm">{game.desc}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pl-[3.25rem] sm:pl-0">
                <span className="text-xs tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  INITIALIZE {'>'}
                </span>
                <div className="px-4 py-2 border border-neutral-700 group-hover:border-accent text-sm tracking-widest uppercase transition-colors">
                  PLAY
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-12 pt-6 border-t border-neutral-800 text-xs text-neutral-600 flex justify-between relative z-10">
          <span>SYSTEM.ONLINE</span>
          <span>v1.0.0</span>
        </footer>
      </div>
    </div>
  );
}
