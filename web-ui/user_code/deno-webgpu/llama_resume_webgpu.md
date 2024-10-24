import React from 'react';

const TailwindResume = () => {
  return (
    <div className="bg-white p-8 shadow-md rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">John Doe</h1>
        <div className="text-right">
          <p className="text-gray-600">123 Main Street</p>
          <p className="text-gray-600">Anytown, USA 12345</p>
          <p className="text-gray-600">johndoe@email.com</p>
          <p className="text-gray-600">(123) 456-7890</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Education</h2>
        <div>
          <p className="font-bold">University of Example</p>
          <p className="text-gray-600">Bachelor of Science in Computer Science</p>
          <p className="text-gray-600">Graduated: May 2020</p>
          <p className="text-gray-600">GPA: 3.8</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Experience</h2>
        <div>
          <p className="font-bold">Software Engineer</p>
          <p className="text-gray-600">Example Company, Inc.</p>
          <p className="text-gray-600">June 2020 - Present</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Developed and maintained web applications using React and Node.js</li>
            <li>Collaborated with cross-functional teams to design and implement new features</li>
            <li>Participated in code reviews and pair programming sessions</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Skills</h2>
        <div className="flex flex-wrap">
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">React</span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Node.js</span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">JavaScript</span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">CSS</span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Git</span>
        </div>
      </div>
    </div>
  );
};

export default TailwindResume;

//react strings + htmx -- more servery + llamy
// function reactive ifnrastcutre for robots


// observable -> click a button or speak

    /// DWIM - auto-install - auto-migrate -> auto-gpu - auto run torch shit semgent 2 anything
