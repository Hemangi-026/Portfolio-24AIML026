import Header from '../components/header';
import About from '../components/about';
import Skills from '../components/skills';

const skillList = ['HTML', 'CSS', 'Git','C++', 'Python', 'MongoDB'];

function Home() {
  return (
    <>
      <Header name="Hemangi Parmar" themeColor="#f2a65a" />
      <About />
      <Skills skillList={skillList} />
    </>
  );
}

export default Home;