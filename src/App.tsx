import config from './config.json';
import { LanyardVisualizer } from 'lanyard-visualizer';

function App() {
  return (
    <div 
      className="bg-cover bg-center min-h-screen text-white p-4 sm:p-8 flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${config.background})` }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        
        <div className="mb-4">
          <img src={config.song.image} alt={config.song.title} className="w-24 h-24 rounded-full mx-auto mb-2" />
          <h2 className="text-xl font-bold">{config.song.title}</h2>
          <p className="text-gray-300">{config.song.artist}</p>
          <audio src={config.song.url} controls className="w-full mt-2"></audio>
        </div>

        <div className="my-4">
          <LanyardVisualizer id={config.discord.id} />
        </div>

        <p className="my-4">{config.description}</p>

        <div className="flex flex-wrap justify-center gap-4">
          {config.links.map(link => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              {link.name}
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App;