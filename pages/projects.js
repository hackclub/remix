import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const projects = [
  { id: 1, name: 'Cool Project 1', author: 'User A', description: 'This is a cool project.' },
  { id: 2, name: 'Awesome Project 2', author: 'User B', description: 'Another awesome project.' },
  { id: 3, name: 'Remixable Project 3', author: 'User C', description: 'Feel free to remix this one.' },
];

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects - YSWS Remix</title>
        <meta name="description" content="Browse all submitted remix projects from the HackClub Remix Challenge" />
      </Head>

      <div className="bg-pink-500 heropattern-pianoman-red-100/50 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{fontFamily: "'Bitcount Grid Double', monospace"}}>
              Remix Projects
            </h1>
            <Link href="/">
              <button
                type="button"
                className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 shadow-md transform hover:scale-105 transition-transform"
              >
                ← Back Home
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg border-4 border-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
                <p className="text-sm text-gray-600 mb-3">by {project.author}</p>
                <p className="text-gray-800 mb-4">{project.description}</p>
                <button
                  type="button"
                  className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  View Project
                </button>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center bg-white rounded-lg border-4 border-gray-800 p-12">
              <p className="text-2xl text-gray-800 font-bold">No projects submitted yet!</p>
              <p className="text-gray-600 mt-2">Be the first to submit your remix!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
