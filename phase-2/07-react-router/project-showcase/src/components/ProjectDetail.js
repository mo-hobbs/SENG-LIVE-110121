import React, { useEffect, useState } from "react";

// 'react-router-dom' Imports
import { useParams, useHistory, Link } from 'react-router-dom';

function ProjectDetail() {
  const [claps, setClaps] = useState(0);
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Destructure "params" object to pull out "id" / generate const
  const { id } = useParams();
  
  // Create "history" object for later use in "handleBack()"
  const history = useHistory();

  function handleBack() {
    
    // Invoke "goBack" to take User back one step in browser history
    history.goBack();
  }

  useEffect(() => {
    fetch(`http://localhost:3000/projects/${id}`)
      .then((r) => r.json())
      .then((project) => {
        setProject(project);
        setIsLoaded(true);
      });
  }, [id]);

  if (!isLoaded) return <h2>Loading...</h2>;

  const { image, name, about, link, phase } = project;

  function handleClapClick() {
    setClaps(claps + 1);
  }

  return (
    <section>
      <div className="project-detail box">
        <div className="project-image">
          <img src={image} alt={name} />
          <button className="claps" onClick={handleClapClick}>
            👏{claps}
          </button>
        </div>
        <div className="details">
          <h2>{name}</h2>
          <p>{about}</p>
          {link ? (
            <p>
              <a target="_blank" rel="noreferrer" href={link}>
                Project Homepage
              </a>
            </p>
          ) : null}
          <div className="extra">
            <span className="badge blue">Phase {phase}</span>
          </div>
          <Link onClick={handleBack}>
            Go Back
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
