import React from 'react';

const projects = [
  { id: 1, name: 'Cool Project 1', author: 'User A', description: 'This is a cool project.' },
  { id: 2, name: 'Awesome Project 2', author: 'User B', description: 'Another awesome project.' },
  { id: 3, name: 'Remixable Project 3', author: 'User C', description: 'Feel free to remix this one.' },
];

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Submitted Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
            <p className="text-gray-700 mb-4">by {project.author}</p>
            <p className="mb-4">{project.description}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Remix
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
