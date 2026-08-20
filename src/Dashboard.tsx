import React, { useState } from 'react';
import config from './config.json';

const Dashboard = () => {
  const [formData, setFormData] = useState(config);
  const [generatedJson, setGeneratedJson] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      song: { ...prev.song, [name]: value },
    }));
  };
  
  const handleDiscordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      discord: { ...prev.discord, [name]: value },
    }));
  };

  const handleLinkChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLinks = [...formData.links];
    newLinks[index] = { ...newLinks[index], [name]: value };
    setFormData(prev => ({ ...prev, links: newLinks }));
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { name: '', url: '' }],
    }));
  };

  const removeLink = (index: number) => {
    const newLinks = [...formData.links];
    newLinks.splice(index, 1);
    setFormData(prev => ({ ...prev, links: newLinks }));
  };

  const generateJson = () => {
    setGeneratedJson(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">General</h2>
          <div className="mb-4">
            <label className="block mb-1">Background Image URL</label>
            <input type="text" name="background" value={formData.background} onChange={handleInputChange} className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 rounded bg-gray-700" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Song</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Title</label>
              <input type="text" name="title" value={formData.song.title} onChange={handleSongChange} className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label className="block mb-1">Artist</label>
              <input type="text" name="artist" value={formData.song.artist} onChange={handleSongChange} className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label className="block mb-1">Image URL</label>
              <input type="text" name="image" value={formData.song.image} onChange={handleSongChange} className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label className="block mb-1">Audio URL</label>
              <input type="text" name="url" value={formData.song.url} onChange={handleSongChange} className="w-full p-2 rounded bg-gray-700" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Discord</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Discord User ID</label>
              <input type="text" name="id" value={formData.discord.id} onChange={handleDiscordChange} className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label className="block mb-1">Username</label>
              <input type="text" name="username" value={formData.discord.username} onChange={handleDiscordChange} className="w-full p-2 rounded bg-gray-700" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          {formData.links.map((link, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input type="text" name="name" placeholder="Name" value={link.name} onChange={(e) => handleLinkChange(index, e)} className="w-1/2 p-2 rounded bg-gray-700" />
              <input type="text" name="url" placeholder="URL" value={link.url} onChange={(e) => handleLinkChange(index, e)} className="w-1/2 p-2 rounded bg-gray-700" />
              <button onClick={() => removeLink(index)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
            </div>
          ))}
          <button onClick={addLink} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Add Link</button>
        </div>

        <button onClick={generateJson} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-6">
          Generate & Save JSON
        </button>

        {generatedJson && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Generated config.json</h2>
            <p className="text-sm text-gray-400 mb-2">Copy this content and paste it into your `src/config.json` file.</p>
            <textarea
              readOnly
              value={generatedJson}
              className="w-full h-64 p-2 rounded bg-gray-900 text-mono"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;