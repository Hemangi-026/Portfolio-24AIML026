function Skills({ skillList }) {
  return (
    <section id="skills" className="skills">
      <h2 className="section__heading">02. skills</h2>
      <ul className="skills__list">
        {skillList.map((skill) => (
          <li key={skill} className="skills__item">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;